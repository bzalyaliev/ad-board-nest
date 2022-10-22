import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseFilters } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import Role from 'src/users/role.enum';
import RoleGuard from 'src/users/role.guard';
import { ExceptionsLoggerFilter } from 'src/utils/exceptionsLogger.filter';
import FindOneParams from 'src/utils/findOneParams';
import { AdService } from './ad.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';

@Controller('ad')
export class AdController {
  constructor(private readonly adService: AdService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async сreateAd(@Body() createAdDto: CreateAdDto) {
    return this.adService.createAd(createAdDto);
  }

  @Get()
  getAllAds() {
    return this.adService.getAllAds();
  }

  @Get(':id')
  @UseFilters(ExceptionsLoggerFilter)
  getAdsById(@Param() { id }: FindOneParams) {
    return this.adService.getAdsById(Number(id));
  }

  @Patch(':id')
  updateAd(@Param('id') id: string, @Body() updateAdDto: UpdateAdDto) {
    return this.adService.updateAd(+id, updateAdDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(Role.Admin))
  deleteAd(@Param('id') id: string) {
    return this.adService.deleteAd(+id);
  }
}
