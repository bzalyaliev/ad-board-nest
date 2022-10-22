import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { Ad } from './entities/ad.entity';
import AdNotFoundException from './exception/adNotFound.exception';

@Injectable()
export class AdService {
  constructor(
    @InjectRepository(Ad)
    private adsRepository: Repository<Ad>,
  ) { }

  getAllAds() {
    return this.adsRepository.find();
  }

  async getAdsById(id: number) {
    const ad = await this.adsRepository.findOne({ where: { id } });
    if (ad) {
      return ad;
    }
    throw new AdNotFoundException(id);
  }

  async createAd(Ad: CreateAdDto) {
    const newAd = this.adsRepository.create(Ad);
    await this.adsRepository.save(newAd);
    return newAd;
  }

  async updateAd(id: number, post: UpdateAdDto) {
    await this.adsRepository.update(id, post);
    const updatedPost = await this.adsRepository.findOne({ where: { id } });
    if (updatedPost) {
      return updatedPost
    }
    throw new HttpException('Ad not found', HttpStatus.NOT_FOUND);
  }

  async deleteAd(id: number) {
    const deleteResponse = await this.adsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
















  create(createAdDto: CreateAdDto) {
    return 'This action adds a new ad';
  }





  update(id: number, updateAdDto: UpdateAdDto) {
    return `This action updates a #${id} ad`;
  }




}
