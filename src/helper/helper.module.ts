import { Module } from '@nestjs/common';
import { Helper } from './helper.provider';

@Module({
  providers: [Helper],
  exports: [Helper],
})
export class HelperModule {}
