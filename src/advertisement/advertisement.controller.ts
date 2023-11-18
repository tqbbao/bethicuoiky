import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AdvertisementService } from './advertisement.service';
import { PaginationOptions } from 'src/constants/pagination-options';
import { CreateAdvertisement } from './dto/create-advertisement.dto';
import { UpdateAdvertisement } from './dto/update-advertisement.dto';
import { CustomException } from 'src/exception/customException';

@Controller('advertisement')
@UseInterceptors(ClassSerializerInterceptor)
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  // Find All Advertisements (GET)
  @HttpCode(200)
  @Get()
  async findAll() {
    const advertisements = await this.advertisementService.findAll();
    if (!advertisements) {
      throw new CustomException('Advertisements not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'success', data: advertisements };
  }

  // Find All Advertisements With Pagination (GET)
  @HttpCode(200)
  @Get('/pagination')
  async findAllWithPagination(@Query() pagination: PaginationOptions) {
    const advertisements =
      await this.advertisementService.findAllWithPagination(pagination);
    if (!advertisements) {
      throw new CustomException('Advertisements not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'success', data: advertisements };
  }

  // Find Advertisement By ID (GET)
  @HttpCode(200)
  @Get('/:id')
  async findById(@Param('id') id: number) {
    const advertisement = await this.advertisementService.findById(id);
    if (!advertisement) {
      throw new CustomException('Advertisement not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'success', data: advertisement };
  }

  // Create Advertisement (POST)
  @HttpCode(201)
  @Post()
  async createAdvertisement(@Body() data: CreateAdvertisement) {
    try {
      const advertisement =
      await this.advertisementService.createAdvertisement(data);
      return { message: 'success', data: advertisement };
    } catch (error) {
      throw error;
    }
  }

  // Update Advertisement (PATCH)
  @HttpCode(200)
  @Put('/:id')
  async updateAdvertisement(
    @Param('id') id: number,
    @Body() data: UpdateAdvertisement,
  ) {
    try {
      const advertisement = await this.advertisementService.updateAdvertisement(
        id,
        data,
      );
      return { message: 'success', data: advertisement };
    } catch (error) {
      throw error;
    }
  }

  // Delete Advertisement (DELETE)
  @HttpCode(200)
  @Delete(':id')
  async deleteAdvertisement(@Param('id') id: number) {
    try {
      await this.advertisementService.deleteAdvertisement(id);
      return { message: 'success' };
    } catch (error) {
      throw error;
    }
  }
}
