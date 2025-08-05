import Fastify from "fastify";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { registerUserRoutes } from "../controllers/user.controller.js";
import { User } from "../types.js";
import path,{ dirname }  from "path";
import { fileURLToPath } from "url";
import cors from "@fastify/cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const start = async () => {
  try {
    const fastify = Fastify({ logger: true });

    await fastify.register(cors, {
      origin: process.env.CLIENT_URL || "*", 
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    });

    const adapter = new JSONFile<{ users: User[] }>(path.resolve(__dirname, "../data/db.json"));
    const db = new Low<{ users: User[] }>(adapter, { users: [] });

    await db.read();
    db.data ||= { users: [] };

    registerUserRoutes(fastify, db);

    await fastify.listen({ port: 3001, host: "0.0.0.0" });
    fastify.log.info(`Server running at http://localhost:3001`);
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();
