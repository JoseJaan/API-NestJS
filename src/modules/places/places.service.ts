import { Injectable } from '@nestjs/common';
import { Place } from './entities/place.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
  ) {}

  findAll(): Promise<Place[]> {
    return this.placeRepository.find();
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
  
  
}