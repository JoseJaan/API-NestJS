import { IsString, IsUrl } from 'class-validator';

export class CreatePlaceDto {
  @IsString()
  country: string;

  @IsString()
  location: string;

  @IsString()
  goal: string;

  @IsUrl()
  flagUrl: string;
}
