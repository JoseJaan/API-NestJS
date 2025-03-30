import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
  ) {}

  async findAll(): Promise<Place[]> {
    const places = await this.placeRepository.find();
    
    return places.sort((a, b) => {
      const [monthA, yearA] = a.goal.split('/');
      const [monthB, yearB] = b.goal.split('/');
      
      const dateA = new Date(parseInt(yearA), parseInt(monthA) - 1);
      const dateB = new Date(parseInt(yearB), parseInt(monthB) - 1);
      
      return dateA.getTime() - dateB.getTime();
    });
  }

  findById(id: number): Promise<Place | null> {
    return this.placeRepository.findOne({ where: { id } });
  }

  async findByCountryAndLocation(country: string, location: string): Promise<Place | null> {
    return this.placeRepository.findOne({ where: { country, location } });
  }

  async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const newPlace = this.placeRepository.create(createPlaceDto);

    const now = new Date();
    now.setHours(now.getHours() - 3);

    newPlace.createdAt = now;
    newPlace.updatedAt = now;

    return this.placeRepository.save(newPlace);
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    const place = await this.findById(id);
    if (!place) {
      throw new NotFoundException('Place not found.');
    }

    if (updatePlaceDto.location && updatePlaceDto.location !== place.location) {
      const exists = await this.findByCountryAndLocation(place.country, updatePlaceDto.location);
      if (exists) {
        throw new ConflictException('Another place with this location already exists in the specified country.');
      }
      place.location = updatePlaceDto.location;
    }

    if (updatePlaceDto.goal) {
      place.goal = updatePlaceDto.goal;
    }

    place.updatedAt = new Date();

    return this.placeRepository.save(place);
  }

  async delete(id: number): Promise<void> {
    const place = await this.findById(id);
    if (!place) {
      throw new NotFoundException('Place not found.');
    }
    
    await this.placeRepository.remove(place);
  }
}
