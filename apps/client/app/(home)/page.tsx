"use client";

import { useState, useEffect } from "react";
import { fetchRandomUsers, saveUser } from "@/lib/users";
import { getWeather } from "@/lib/weather";
import UserCard from "@/components/UserCard";
import { User, RandomUserAPI } from "@/types/user";
import { toast } from "sonner";

const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSave = async (user: User) => {
    try {
      await saveUser(user);
      toast.success("User saved successfully!");
    } catch (error) {
      console.error("Failed to save user:", error);
      toast.error("Failed to save user");
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
    <section className="p-6 flex flex-col justify-center items-center">
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
      <div className="mt-4">
        <button 
          onClick={loadUsers} 
          disabled={loading} 
          className="load-btn"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </section>
  );
};

export default HomePage;
