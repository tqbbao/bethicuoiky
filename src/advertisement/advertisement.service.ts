import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Advertisement } from 'src/entity/advertisement.entity';
import { In, Repository } from 'typeorm';
import { CreateAdvertisement } from './dto/create-advertisement.dto';
import { PaginationOptions } from 'src/constants/pagination-options';
import { UpdateAdvertisement } from './dto/update-advertisement.dto';
import { CustomException } from 'src/exception/customException';

@Injectable()
export class AdvertisementService {
  constructor(
    @InjectRepository(Advertisement)
    private readonly advertisementRepository: Repository<Advertisement>,
  ) {}

  // Find All Advertisements
  async findAll() {
    return await this.advertisementRepository.find();
  }

  // Find All Advertisements With Pagination
  async findAllWithPagination(pagination: PaginationOptions){
    const limit = Number(pagination.limit) || 10;
    const page = Number(pagination.page) || 1;
    const skip = (page - 1) * limit;

    return await this.advertisementRepository.find({
      skip: skip,
      take: limit,
      order: { [pagination.sort]: pagination.sort_by }
    })
  }

  // Find Advertisement By ID
  async findById(id: number) {
    return await this.advertisementRepository.findOne({
      where: {
        advertisementId: id,
      },
    });
  }

  // Create Advertisement
  async createAdvertisement(data: CreateAdvertisement) {
    try {
      const advertisement = await this.advertisementRepository.create(data);
      return await this.advertisementRepository.save(advertisement);
    } catch (error) {
      console.log(error);
      throw new CustomException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Update Advertisement
  async updateAdvertisement(id: number, data: UpdateAdvertisement) {
    let advertisement = await this.findById(id);
    if (!advertisement) {
      throw new NotFoundException('Advertisement not found');
    }
    try {
      advertisement = { ...advertisement, ...data };
      return await this.advertisementRepository.save(advertisement);
    } catch (error) {
      console.log(error);
      throw new CustomException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Delete Advertisement
  async deleteAdvertisement(id: number){
    const advertisement = await this.findById(id);
    if (!advertisement) {
      throw new NotFoundException(`Advertisement with ID ${id} not found`);
    }
    
    try {
      return await this.advertisementRepository.remove(advertisement);
    } catch (error) {
      console.log(error);
      throw new CustomException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
