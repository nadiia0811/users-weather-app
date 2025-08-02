"use client";

import { useState, useEffect } from "react";
import { fetchRandomUsers, saveUser } from "@/lib/users";
import { getWeather } from "@/lib/weather";
import UserCard from "@/components/UserCard";
import Button from "@/components/Button";
import { User, RandomUserAPI } from "@/types/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const message = "Failed to save user";
  const router = useRouter();

  const onBtnClick = () => {
    router.push("/saved");
  };

  const handleSave = async (user: User) => {
    try {
      await saveUser(user);
      toast.success("User saved successfully!");
    } catch (error) {
      console.error(`${message}:`, error);
      toast.error(message);
    }
  };

  const loadUsers = async () => {
    setLoading(true);

    try {
      const randomUsers = await fetchRandomUsers();

      const enriched = await Promise.all(
        randomUsers.map(async (rawUser: RandomUserAPI) => {
          const weather = await getWeather(
            parseFloat(rawUser.location.coordinates.latitude),
            parseFloat(rawUser.location.coordinates.longitude)
          );

          return {
            id: rawUser.login.uuid,
            name: `${rawUser.name.first} ${rawUser.name.last}`,
            gender: rawUser.gender,
            email: rawUser.email,
            location: `${rawUser.location.city}, ${rawUser.location.country}`,
            picture: rawUser.picture.large,
            latitude: parseFloat(rawUser.location.coordinates.latitude),
            longitude: parseFloat(rawUser.location.coordinates.longitude),
            weather,
          } as User;
        })
      );

      setUsers((prev) => [...prev, ...enriched]);
    } catch (err) {
      console.error("Error loading users:", err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <section className="flex flex-col p-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Random Users</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {users.map((user) => (
            <UserCard
              key={user.email}
              user={user}
              onSave={() => handleSave(user)}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 flex gap-10 justify-center">
        <Button onClick={loadUsers} disabled={loading} className="load-btn">
          {loading ? "Loading..." : "Load More"}
        </Button>
        <Button onClick={onBtnClick} className="load-btn">
          Saved Users
        </Button>
      </div>
    </section>
  );
};

export default HomePage;
