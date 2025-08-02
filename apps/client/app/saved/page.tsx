"use client";

import { useState, useEffect } from "react";
import { fetchSavedUsers, deleteUser } from "@/lib/users";
import UserCard from "@/components/UserCard";
import Button from "@/components/Button";
import { User } from "@/types/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SavedUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const message = "Failed to remove user";
  const router = useRouter();

  const loadSaved = async () => {
    const data = await fetchSavedUsers();
    setUsers(data as User[]);
  };

  const onBtnClick = () => {
    router.push("/");
  };

  const removeUser = async (id: string) => {
    try {
      await deleteUser(id);
      loadSaved();
      toast.success("User removed successfully");
    } catch (error) {
      console.error(`${message}:`, error);
      toast.error(message);
    }
  };

  useEffect(() => {
    loadSaved();
  }, []);

  return (
    <section className="flex flex-col p-6 items-center">
      <h1 className="text-2xl font-bold mb-4">Saved Users</h1>
      <div className="flex flex-wrap gap-4">
        {users.map((u) => (
          <UserCard
            key={u.id}
            user={u}
            isSaved
            onDelete={() => removeUser(u.id!)}
          />
        ))}
      </div>
      <div className="mt-4">
        <Button className="load-btn" onClick={onBtnClick}>
          Back
        </Button>
      </div>
    </section>
  );
};

export default SavedUsersPage;
