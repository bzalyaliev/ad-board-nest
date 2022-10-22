import { Module } from '@nestjs/common';
import { AdModule } from './ad.module';
import { AdService } from './ad.service';
import { AdController } from './ad.controller';

@Module({
  imports: [AdModule],
  providers: [AdService],
  controllers: [AdController]
})
export class UserHttpModule {}
