import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { z } from 'zod';

const EnvSchema = z.object({
  DATABASE_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
});

type EnvType = z.infer<typeof EnvSchema>;

@Global()
@Injectable()
export class EnvironmentProvider implements OnModuleInit {
  private variables: EnvType = {};

  onModuleInit() {
    try {
      this.variables = EnvSchema.parse(process.env);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors
          .map((err) => `${err.path.join('.')} - ${err.message}`)
          .join(', ');
        throw new Error(
          `Environment variable validation failed: ${errorMessages}`,
        );
      }
    }
  }

  public get<T extends keyof EnvType>(key: T): EnvType[T] {
    return this.variables[key];
  }
}
