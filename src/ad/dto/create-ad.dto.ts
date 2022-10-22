import { IsNotEmpty, IsString } from "class-validator";

export class CreateAdDto {
  @IsString()
  @IsNotEmpty()
  name: string;
 
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  contact: string;
 
  @IsString()
  @IsNotEmpty()
  picture: string;

  @IsString()
  @IsNotEmpty()
  isActive: boolean;
}

export default CreateAdDto;

