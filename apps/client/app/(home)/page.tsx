"use client";

import { useState, useEffect } from "react";
import { fetchRandomUsers, saveUser } from "@/lib/users";
import { getWeather } from "@/lib/weather";
import UserCard from "@/components/UserCard";
import UsersLayout from "@/components/UsersLayout";
import { User, RandomUserAPI } from "@/types/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const message = "Failed to save the user";
  const router = useRouter();

  const onSaved = () => {
    router.push("/saved");
  };

  const handleSave = async (user: User) => {
    try {
      await saveUser(user);
      toast.success("User was saved successfully!");
    } catch (error) {
      console.error(`${message}:`, error);
      toast.error(message);
    }
  };

  const refreshWeather = async () => {
    if (users.length === 0) return;

    try {
      const updated = await Promise.all(
        users.map(async (user) => {
          const weather = await getWeather(user.latitude, user.longitude);
          return { ...user, weather };
        })
      );
      setUsers(updated);
      toast.info("Weather updated");
    } catch (err) {
      toast.error(`Error refreshing weather: ${err}`);
    }
  };

  const loadUsers = async (append = false) => {
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

      setUsers((prev) => (append ? [...prev, ...enriched] : enriched));
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

  useEffect(() => {
    if (users.length > 0) {
      const interval = setInterval(refreshWeather,  5 * 60 * 1000 ); 
      return () => clearInterval(interval);
    }
  }, [users]);

  return (
    <UsersLayout
      title="Random Users"
      showLoadMore
      onLoadMore={() => loadUsers(true)}
      loading={loading}
      onSaved={onSaved}
    >
      {users.map((user) => (
        <UserCard key={user.id} user={user} onSave={() => handleSave(user)} />
      ))}
    </UsersLayout>
  );
};

export default HomePage;
