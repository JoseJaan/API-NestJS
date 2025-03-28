import { Controller, Get, Post, Patch, Delete, Param, Body, ConflictException, NotFoundException } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
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

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    return this.placesService.update(id, updatePlaceDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    await this.placesService.delete(id);
    return { message: 'Place deleted successfully' };
  }
}
