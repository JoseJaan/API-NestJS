import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import { CreatePlaceDto, UpdatePlaceDto, Place } from '../types/place';

interface PlaceFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (place: CreatePlaceDto | UpdatePlaceDto) => void;
  place?: Place;
  isEdit?: boolean;
}

const PlaceForm: React.FC<PlaceFormProps> = ({ 
  open, onClose, onSubmit, place, isEdit = false 
}) => {
  const countries = [
    "BRASIL",
    "BOLÍVIA",
    "ESTADOS UNIDOS",
    "EMIRADOS ÁRABES UNIDOS",
    "FRANÇA",
    "MÉXICO",
    "ITÁLIA"
  ];

  const [formData, setFormData] = useState<CreatePlaceDto | UpdatePlaceDto>(
    place ? {
      country: place.country,
      location: place.location,
      goal: place.goal
    } : {
      country: '',
      location: '',
      goal: ''
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent>
        
        <TextField
          fullWidth
          label="Local"
          name="location"
          value={formData.location || ''}
          onChange={handleChange}
          margin="normal"
        />
        
        <TextField
          fullWidth
          label="Meta (mês/ano)"
          name="goal"
          value={formData.goal || ''}
          onChange={handleChange}
          margin="normal"
          placeholder="MM/AAAA"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
        >
          {isEdit ? 'Atualizar' : 'Adicionar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlaceForm;