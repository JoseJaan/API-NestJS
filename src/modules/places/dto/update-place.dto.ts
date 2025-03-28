import { IsOptional, IsString } from 'class-validator';

export class UpdatePlaceDto {
  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  goal?: string;
}
