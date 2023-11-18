import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AdvertisementService } from './advertisement.service';
import { PaginationOptions } from 'src/constants/pagination-options';
import { CreateAdvertisement } from './dto/create-advertisement.dto';
import { UpdateAdvertisement } from './dto/update-advertisement.dto';

@Controller('advertisement')
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  // Find All Advertisements (GET)
  @HttpCode(200)
  @Get()
  async findAll() {
    const advertisements = await this.advertisementService.findAll();
    if (!advertisements) {
      throw new NotFoundException('Advertisements not found');
    }
    return { message: 'success', data: advertisements };
  }

  // Find All Advertisements With Pagination (GET)
  @HttpCode(200)
  @Get()
  async findAllWithPagination(@Query() pagination: PaginationOptions) {
    const advertisements =
      await this.advertisementService.findAllWithPagination(pagination);
    if (!advertisements) {
      throw new NotFoundException('Advertisements not found');
    }
    return { message: 'success', data: advertisements };
  }

  // Find Advertisement By ID (GET)
  @HttpCode(200)
  @Get('/:id')
  async findById(@Param('id') id: number) {
    const advertisement = await this.advertisementService.findById(id);
    if (!advertisement) {
      throw new NotFoundException('Advertisement not found');
    }
    return { message: 'success', data: advertisement };
  }

  // Create Advertisement (POST)
  @HttpCode(201)
  @Post()
  async createAdvertisement(@Body() data: CreateAdvertisement) {
    const advertisement =
      await this.advertisementService.createAdvertisement(data);
    return { message: 'success', data: advertisement };
  }

  // Update Advertisement (PATCH)
  @HttpCode(200)
  @Patch('/:id')
  async updateAdvertisement(
    @Param('id') id: number,
    @Body() data: UpdateAdvertisement,
  ) {
    const advertisement = await this.advertisementService.updateAdvertisement(
      id,
      data,
    );
    return { message: 'success', data: advertisement };
  }

  // Delete Advertisement (DELETE)
  @HttpCode(200)
  @Delete(':id')
  async deleteAdvertisement(@Param('id') id: number) {
    await this.advertisementService.deleteAdvertisement(id);
    return { message: 'success' };
  }
}
