import React, { useState, useEffect } from 'react';
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
  // Mapeamento dos países para as URLs de suas bandeiras
  const countriesWithFlags: Record<string, string> = {
    "BRASIL": "https://static.todamateria.com.br/upload/ba/nd/bandeira-do-brasil-og.jpg?class=ogImageWide",
    "BOLÍVIA": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_Bolivia_%28state%29.svg/800px-Flag_of_Bolivia_%28state%29.svg.png",
    "ESTADOS UNIDOS": "https://static.todamateria.com.br/upload/ba/nd/bandeira_americana_bb.jpg",
    "EMIRADOS ÁRABES UNIDOS": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg",
    "FRANÇA": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg",
    "MÉXICO": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/800px-Flag_of_Mexico.svg.png",
    "ITÁLIA": "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg"
  };

  // Lista de países
  const countries = Object.keys(countriesWithFlags);

  const [formData, setFormData] = useState<CreatePlaceDto | UpdatePlaceDto>(
    place ? {
      country: place.country,
      location: place.location,
      goal: place.goal,
      flagUrl: place.flagUrl
    } : {
      country: '',
      location: '',
      goal: '',
      flagUrl: ''
    }
  );

  // Atualiza a URL da bandeira quando o país é selecionado ou alterado
  useEffect(() => {
    if (formData.country && countriesWithFlags[formData.country]) {
      setFormData(prev => ({
        ...prev,
        flagUrl: countriesWithFlags[formData.country]
      }));
    }
  }, [formData.country]);

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