import { Low } from "lowdb"; 
import { userService } from "../services/user.service.js";
import { z } from "zod";
import { User } from "../types.js";
import type { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { dubbingCheck, validateUserBody } from "../middleware.js";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  gender: z.string(),
  email: z.string(),
  location: z.string(),
  picture: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  weather: z.object({
    temp: z.number(),
    min: z.number(),
    max: z.number(),
    icon: z.number(),
  }),
});

export const registerUserRoutes = (
  fastify: FastifyInstance,
  db: Low<{ users: User[] }>
) => {
  fastify.get("/users", async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const users = await userService.getSavedUsers(db);
      reply.send(users);
    } catch (err: unknown) {
      if (err instanceof Error) {
        reply.code(400).send({ error: err.message });
      } else {
        reply.code(400).send({ error: "Failed to get users" });
      }
    }
  });

  fastify.post(
    "/users",
    {
      preHandler: [dubbingCheck(db), validateUserBody(userSchema)],
    },
    async (req, reply) => {
      try {
        const result = await userService.saveUser(db, req.body as User);
        reply.code(201).send(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          reply.code(400).send({ error: err.message });
        } else {
          reply.code(500).send({ error: "Failed to save the user" });
        }
      }
    }
  );

  fastify.delete(
    "/users/:id",
    async (
      req: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply
    ) => {
      try {
        const result = await userService.deleteUser(db, req.params.id);
        reply.send(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          reply.code(400).send({ error: err.message });
        } else {
          reply.code(400).send({ error: "Failed to delete user" });
        }
      }
    }
  );
};





