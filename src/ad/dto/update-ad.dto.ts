import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateAdDto } from './create-ad.dto';

export class UpdateAdDto extends PartialType(CreateAdDto) {
  @IsNumber()
  @IsOptional()
  id: number;
 
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;
 
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  contact: string;
 
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  picture: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  isActive: boolean;
}
