import { Global, Module } from '@nestjs/common';
import { EnvironmentProvider } from 'src/providers/environment-provider';

@Global()
@Module({
  providers: [EnvironmentProvider],
  exports: [EnvironmentProvider],
})
export class SetupModule {}
