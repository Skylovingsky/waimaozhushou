import "dotenv/config";
import Fastify from "fastify";
import { logger } from "./utils/logger";
import { config } from "./config/env";
import { registerRoutes } from "./routes";

async function bootstrap() {
  const app = Fastify({ logger });

  await registerRoutes(app);

  try {
    await app.listen({ port: config.PORT, host: "0.0.0.0" });
    logger.info(`🚀 Agent service running on http://localhost:${config.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

bootstrap();
