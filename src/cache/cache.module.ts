import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    NestCacheModule.register({
      ttl: 900000000,
    }),
  ],
  exports: [NestCacheModule],
})
export class CacheModule {}
