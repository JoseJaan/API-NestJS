export interface Place {
  id: number;
  country: string;
  location: string;
  goal: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlaceDto {
  country: string;
  location: string;
  goal: string;
}

export interface UpdatePlaceDto {
  location?: string;
  goal?: string;
}