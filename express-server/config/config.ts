import { ObjectSchema, object, string, number, boolean } from "joi";
import { config } from "dotenv";

export default function () {
  if (process.env.NODE_ENV !== "production") {
    config();
  }

  const envVarsSchema: ObjectSchema = object({
    NODE_ENV: string()
      .allow("development", "production", "test", "provision")
      .default("development"),
    SERVER_PORT: number().default(4040),
    MONGOOSE_DEBUG: boolean().when("NODE_ENV", {
      is: string().equal("development"),
      then: boolean().default(true),
      otherwise: boolean().default(false),
    }),
    JWT_SECRET: string()
      .required()
      .default("secret")
      .description("JWT Secret required to sign"),
    MONGO_HOST: string().required().description("Mongo DB host url"),
    MONGO_PORT: number().default(27017),
  })
    .unknown()
    .required();

  const { error, value: envVars } = envVarsSchema.validate(process.env);
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  const envConfig = {
    env: envVars.NODE_ENV,
    port: envVars.SERVER_PORT,
    mongooseDebug: envVars.MONGOOSE_DEBUG,
    jwtSecret: envVars.JWT_SECRET,
    mongo: {
      host: envVars.MONGO_HOST,
      port: envVars.MONGO_PORT,
    },
  };

  return envConfig;
}