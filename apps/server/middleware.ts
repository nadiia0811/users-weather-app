import { Low } from "lowdb";
import { User } from "../client/types/user";
import type { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";

export const validateUserBody = (schema: any) => {
  return (req: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
    try {
      schema.parse(req.body);
      done();
    } catch (error) {
      reply.code(400).send({ error: "Invalid user data" });
    }
  };
};

export const dubbingCheck = (db: Low<{ users: User[] }>) => {
  return async (req: FastifyRequest<{ Body: User }>, reply: FastifyReply) => {
    const { id } = req.body;
    await db.read();

    const exists = db.data?.users.some((u) => u.id === id);
    if (exists) {
      return reply.code(409).send({ error: "User already saved" });
    }
  };
};

/* export const validateUserBody = (schema) => (req, reply, done) => {
  try {
    schema.parse(req.body);
    done();
  } catch (err) {
    reply.code(400).send({ error: "Invalid user data" });
  }
};
 */