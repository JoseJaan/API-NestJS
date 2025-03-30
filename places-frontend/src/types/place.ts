export interface Place {
  id: number;
  country: string;
  location: string;
  goal: string;
  createdAt: string;
  updatedAt: string;
  flagUrl: string;
}

export interface CreatePlaceDto {
  country: string;
  location: string;
  goal: string;
  flagUrl: string;
}

export interface UpdatePlaceDto {
  location?: string;
  goal?: string;
  flagUrl: string;
  country: string;
}