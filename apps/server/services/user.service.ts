import { User } from "../../client/types/user";
import { Low } from "lowdb";

export const userService = {
  async getSavedUsers(db: Low<{ users: User[] }>): Promise<User[]> {
    await db.read();
    db.data = db.data || { users: [] };
    return db.data.users;
  },

  async saveUser(db: Low<{ users: User[] }>, user: User): Promise<User> {
    await db.read();
    db.data = db.data || { users: [] };

    const exists = db.data.users.some((u) => u.id === user.id);
    if (exists) throw new Error("User already exists");

    db.data.users.push(user);
    await db.write();
    return user;
  },

  async deleteUser(db: Low<{ users: User[] }>, id: string) {
    await db.read();
    db.data = db.data || { users: [] };
    const before = db.data.users.length;
    db.data.users = db.data.users.filter((u) => u.id !== id);
    await db.write();
    return { deleted: before - db.data.users.length };
  },
};

