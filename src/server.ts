import { env } from "./env.ts";
import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { fastifyCors } from "@fastify/cors";

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.register(fastifyCors, {
  origin: "http://localhost:5173",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get("/health", () => {
  return { status: "ok" };
});

app.listen({ port: env.PORT }).then(() => {
  console.log(`PORT: ${env.PORT}`);
});
