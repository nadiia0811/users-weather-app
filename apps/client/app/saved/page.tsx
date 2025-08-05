"use client";

import { useState, useEffect } from "react";
import { fetchSavedUsers, deleteUser } from "@/lib/users";
import UserCard from "@/components/UserCard";
import { User } from "@/types/user";
import UsersLayout from "@/components/UsersLayout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SavedUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const message = "Failed to remove the user";
  const router = useRouter();

  const loadSaved = async () => {
    const data = await fetchSavedUsers();
    setUsers(data as User[]);
  };

  const handleBackClick = () => {
    router.push("/");
  };

  const removeUser = async (id: string) => {
    try {
      await deleteUser(id);
      loadSaved();
      toast.success("User was removed successfully");
    } catch (error) {
      console.error(`${message}:`, error);
      toast.error(message);
    }
  };

  useEffect(() => {
    loadSaved();
  }, []);

  return (
    <UsersLayout title="Saved Users" onBack={handleBackClick}>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          isSaved
          onDelete={() => removeUser(user.id!)}
        />
      ))}
    </UsersLayout>
  );
};

export default SavedUsersPage;
