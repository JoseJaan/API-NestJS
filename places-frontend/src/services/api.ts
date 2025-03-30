import axios from 'axios';
import { Place, CreatePlaceDto, UpdatePlaceDto } from '../types/place';

const api = axios.create({
  baseURL: '/api',
});

export const PlacesService = {
  getAll: async (): Promise<Place[]> => {
    const response = await api.get<Place[]>('http://localhost:3000/api/places');
    return response.data;
  },
  
  create: async (place: CreatePlaceDto): Promise<Place> => {
    const response = await api.post<Place>('http://localhost:3000/api/places', place);
    return response.data;
  },
  
  update: async (id: number, place: UpdatePlaceDto): Promise<Place> => {
    const response = await api.patch<Place>(`http://localhost:3000/api/places/${id}`, place);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await api.delete(`http://localhost:3000/api/places/${id}`);
  }
};