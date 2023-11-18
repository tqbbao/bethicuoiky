import { Module } from '@nestjs/common';
import { AdvertisementController } from './advertisement.controller';
import { AdvertisementService } from './advertisement.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  //imports: [TypeOrmModule.forFeature([AdvertisementModule])],
  controllers: [AdvertisementController],
  providers: [AdvertisementService]
})
export class AdvertisementModule {}