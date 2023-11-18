import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdvertisementModule } from './advertisement/advertisement.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advertisement } from './entity/advertisement.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin123',
      database: 'advertisement',
      entities: [Advertisement],
      synchronize: true,
    }),
    AdvertisementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
