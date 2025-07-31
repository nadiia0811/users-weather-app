"use client";

import { User } from "@/types/user";
import Image from "next/image";

interface Props {
  user: User;
  onSave?: () => void;
  onDelete?: () => void;
  isSaved?: boolean;
}

export const UserCard = ({ user, onSave, onDelete, isSaved }: Props) => {
  return (
    <div className="card">
      <Image
        width={96}
        height={96}
        src={user.picture}
        alt={user.name}
        className="rounded-full"
      />
      <h2 className="mt-2 text-lg font-bold">{user.name}</h2>
      <p className="text-sm mb-2">
        {user.gender} • {user.location}
      </p>
      <p className="text-sm">{user.email}</p>

      {user.weather && (
        <div className="mt-2 text-center">
          <p className="font-semibold">{user.weather.temp}°C</p>
          <p className="text-xs">
            min {user.weather.min}° • max {user.weather.max}°
          </p>
        </div>
      )}

      <div className="mt-3 flex gap-2">
        {!isSaved && onSave && (
          <button
            type="button"
            onClick={onSave}
            className="save-btn"
            aria-label={`Save user ${user.name}`}
          >
            Save
          </button>
        )}
        {isSaved && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="delete-btn"
            aria-label={`Delete user ${user.name}`}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
