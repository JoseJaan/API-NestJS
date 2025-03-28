import { Controller, Get, Post, Body, ConflictException } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { Place } from './entities/place.entity';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  async create(@Body() createPlaceDto: CreatePlaceDto): Promise<Place> {
    const exists = await this.placesService.findByCountryAndLocation(
      createPlaceDto.country,
      createPlaceDto.location,
    );
    
    if (exists) {
      throw new ConflictException('This place already exists in the specified country.');
    }
    
    return this.placesService.create(createPlaceDto);
  }

  @Get()
  findAll() {
    return this.placesService.findAll();
  }

  
}
