import "dotenv/config";
import Fastify from "fastify";
import { logger } from "./utils/logger";
import { config } from "./config/env";
import { registerRoutes } from "./routes";

async function bootstrap() {
  const app = Fastify({
    logger: {
      level: config.LOG_LEVEL || "info",
      transport:
        config.NODE_ENV === "development"
          ? { target: "pino-pretty", options: { colorize: true } }
          : undefined,
    },
  });

  await registerRoutes(app);

  try {
    await app.listen({ port: config.PORT, host: "0.0.0.0" });
    logger.info(`🚀 Agent service running on http://localhost:${config.PORT}`);
  } catch (err) {
    logger.error(err as any);
    process.exit(1);
  }
}

bootstrap();
