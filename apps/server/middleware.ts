import { Low } from "lowdb";
import { User } from "@shared/types/user";
import { z } from "zod";
import type {
  FastifyRequest,
  FastifyReply,
  HookHandlerDoneFunction,
  preHandlerHookHandler,
} from "fastify"; 

export const validateUserBody = (schema: z.ZodType): preHandlerHookHandler => { //work
  return (
    req: FastifyRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction
  ) => {
    try {
      schema.parse(req.body);
      done();
    } catch (error) {
      reply.code(400).send({ error: "Invalid user data" });
      return;
    }
  };
};

export const dubbingCheck = ( 
  db: Low<{ users: User[] }>
): preHandlerHookHandler => {
  return async (req, reply) => {
    const { id } = req.body as User;
    await db.read();

    const exists = db.data?.users.some((u) => u.id === id);
    if (exists) {
      return reply.code(409).send({ error: "User already saved" });
    }
  };
}; 

