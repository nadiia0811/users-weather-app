"use client";

import { User } from "@/types/user";
import Image from "next/image";
import { getWeatherInfo } from "@/lib/weatherMap";
import Button from "@/components/Button";

interface Props {
  user: User;
  onSave?: () => void;
  onDelete?: () => void;
  isSaved?: boolean;
}

const UserCard = ({ user, onSave, onDelete, isSaved }: Props) => {
  const weatherInfo =
    user.weather?.icon !== undefined ? getWeatherInfo(user.weather.icon) : null;

  return (
    <div className="card">
      <Image
        width={96}
        height={96}
        src={user.picture}
        alt={`Profile picture of ${user.name}`}
        className="rounded-full"
        unoptimized
      />
      <h2 className="mt-2 text-lg font-bold">{user.name}</h2>
      <p className="text-sm mb-2">
        {user.gender} • {user.location}
      </p>
      <p className="text-sm break-all">{user.email}</p>

      {user.weather && (
        <div className="mt-2 text-center">
          <div className="flex items-center gap-2 justify-center">
            {weatherInfo && (
              <>
                <Image
                  src={weatherInfo.imgUrl}
                  alt={weatherInfo.label}
                  width={32}
                  height={32}
                />
                <span className="text-sm">{weatherInfo.label}</span>
                <p className="font-semibold">{user.weather.temp}°C</p>
              </>
            )}
          </div>
          <p className="text-xs">
            min {user.weather.min}° • max {user.weather.max}°
          </p>
        </div>
      )}

      <div className="gap-2 mt-auto">
        {!isSaved && onSave && (
          <Button
            onClick={onSave}
            className="save-btn"
            aria-label={`Save user ${user.name}`}
          >
            Save
          </Button>
        )}
        {isSaved && onDelete && (
          <Button
            onClick={onDelete}
            className="delete-btn"
            aria-label={`Delete user ${user.name}`}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
