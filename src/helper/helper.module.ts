import { Module } from '@nestjs/common';
import { Helper } from './helper.provider';
import { HelperGenrics } from './helper.generic';

@Module({
  providers: [Helper, HelperGenrics],
  exports: [Helper, HelperGenrics],
})
export class HelperModule {}
