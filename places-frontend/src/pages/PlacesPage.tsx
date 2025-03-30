import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Container, Grid, Snackbar, Alert } from '@mui/material';
import { PlacesService } from '../services/api';
import PlaceCard from '../components/PlaceCard';
import PlaceForm from '../components/PlaceForm';
import ConfirmDialog from '../components/ConfirmDialog';
import { Place, CreatePlaceDto, UpdatePlaceDto } from '../types/place';

const PlacesPage: React.FC = () => {
  const countries = [
    "BRASIL",
    "BOLÍVIA",
    "ESTADOS UNIDOS",
    "EMIRADOS ÁRABES UNIDOS",
    "FRANÇA",
    "MÉXICO",
    "ITÁLIA"
  ];

  // Mapeamento de países para URLs de bandeiras
  const flagUrls = {
    "BRASIL": "https://flagcdn.com/br.svg",
    "BOLÍVIA": "https://flagcdn.com/bo.svg",
    "ESTADOS UNIDOS": "https://flagcdn.com/us.svg",
    "EMIRADOS ÁRABES UNIDOS": "https://flagcdn.com/ae.svg",
    "FRANÇA": "https://flagcdn.com/fr.svg",
    "MÉXICO": "https://flagcdn.com/mx.svg",
    "ITÁLIA": "https://flagcdn.com/it.svg"
  };

  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form fields
  const [selectedCountry, setSelectedCountry] = useState('');
  const [location, setLocation] = useState('');
  const [goal, setGoal] = useState('');
  
  // Modals state
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [placeToDelete, setPlaceToDelete] = useState<number | null>(null);
  
  // Notification state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  // Fetch all places
  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const data = await PlacesService.getAll();
      setPlaces(data);
      setError('');
    } catch (err) {
      setError('Erro ao carregar lugares');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  // Add new place
  const handleAddPlace = async () => {
    if (!selectedCountry || !location || !goal) {
      showSnackbar('Preencha todos os campos', 'error');
      return;
    }

    try {
      const newPlace: CreatePlaceDto = {
        country: selectedCountry,
        location: location,
        goal: goal,
        flagUrl: flagUrls[selectedCountry as keyof typeof flagUrls] || ''
      };
      
      const createdPlace = await PlacesService.create(newPlace);
      setPlaces([...places, createdPlace]);
      showSnackbar('Lugar adicionado com sucesso', 'success');
      
      // Reset form fields
      setSelectedCountry('');
      setLocation('');
      setGoal('');
    } catch (err: any) {
      showSnackbar(err.response?.data?.message || 'Erro ao adicionar lugar', 'error');
    }
  };

  // Update place
  const handleEditPlace = async (placeData: UpdatePlaceDto) => {
    if (!selectedPlace) return;
    
    try {
      const updatedPlace = await PlacesService.update(selectedPlace.id, placeData);
      setPlaces(prev => 
        prev.map(place => place.id === selectedPlace.id ? updatedPlace : place)
      );
      showSnackbar('Lugar atualizado com sucesso', 'success');
      setOpenEditForm(false);
      setSelectedPlace(null);
    } catch (err: any) {
      showSnackbar(err.response?.data?.message || 'Erro ao atualizar lugar', 'error');
    }
  };

  // Delete place
  const handleDeletePlace = async () => {
    if (placeToDelete === null) return;
    
    try {
      await PlacesService.delete(placeToDelete);
      setPlaces(prev => prev.filter(place => place.id !== placeToDelete));
      showSnackbar('Lugar excluído com sucesso', 'success');
    } catch (err: any) {
      showSnackbar(err.response?.data?.message || 'Erro ao excluir lugar', 'error');
    } finally {
      setOpenConfirmDelete(false);
      setPlaceToDelete(null);
    }
  };

  // Show notification
  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ 
        bgcolor: 'black', 
        color: 'white', 
        p: 2, 
        display: 'flex', 
        alignItems: 'center' 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="img" src="/earth-icon.png" alt="Logo" sx={{ width: 40, height: 40, mr: 1 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Lugares</Box>
            <Box sx={{ fontSize: '0.7rem' }}>gerenciamento de viagens</Box>
          </Box>
        </Box>
      </Box>

      {/* Form Area */}
      <Box sx={{ 
        bgcolor: '#4CAF50', 
        p: 3,
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 200px' }}>
          <Box sx={{ color: 'white', mb: 1 }}>País</Box>
          <TextField
            select
            fullWidth
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            sx={{ 
              backgroundColor: 'white', 
              borderRadius: 1,
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
            }}
            SelectProps={{
              displayEmpty: true,
              renderValue: (value) => value ? <>{value}</> : 'Selecione...'
            }}
          >
            <MenuItem disabled value="">Selecione...</MenuItem>
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', flex: '2 1 300px' }}>
          <Box sx={{ color: 'white', mb: 1 }}>Local</Box>
          <TextField
            fullWidth
            placeholder="Digite o local que deseja conhecer"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{ 
              backgroundColor: 'white', 
              borderRadius: 1,
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 200px' }}>
          <Box sx={{ color: 'white', mb: 1 }}>Meta</Box>
          <TextField
            fullWidth
            placeholder="mês/ano"
            value={goal}
            onChange={(e) => {
              const input = e.target.value;
              const processed = input.replace(/[^\d/]/g, '');
              
              if (processed.length <= 7) {
                if (processed.length === 2 && !processed.includes('/') && input.length > e.target.value.length) {
                  setGoal(`${processed}/`);
                } 
                else if ((processed.match(/\//g) || []).length <= 1) {
                  const parts = processed.split('/');
                  
                  if (parts.length === 1 && parts[0].length <= 2) {
                    setGoal(processed);
                  } else if (parts.length === 2) {
                    const [month, year] = parts;
                    
                    if (month.length <= 2 && (month === '' || (parseInt(month) >= 1 && parseInt(month) <= 12) || month.length < 2)) {
                      if (year.length <= 4) {
                        setGoal(processed);
                      }
                    }
                  }
                }
              }
            }}
            inputProps={{
              maxLength: 7,
              placeholder: "MM/AAAA"
            }}
            onBlur={() => {
              const parts = goal.split('/');
              if (parts.length === 2) {
                const [month, year] = parts;
                if (month.length === 1) {
                  setGoal(`0${month}/${year}`);
                }
              }
            }}
            sx={{ 
              backgroundColor: 'white', 
              borderRadius: 1,
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', mt: 3.5 }}>
          <Button 
            variant="contained" 
            onClick={handleAddPlace}
            sx={{ 
              bgcolor: '#005500', 
              color: 'white',
              px: 4,
              '&:hover': {
                bgcolor: '#003300'
              }
            }}
          >
            Adicionar
          </Button>
        </Box>
      </Box>

      {/* Content Area */}
      <Container sx={{ py: 4, flex: 1, bgcolor: '#f5f5f5' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {places.map(place => (
            <div key={place.id}>
              <PlaceCard
                place={place}
                onEdit={(place) => {
                  setSelectedPlace(place);
                  setOpenEditForm(true);
                }}
                onDelete={(id) => {
                  setPlaceToDelete(id);
                  setOpenConfirmDelete(true);
                }}
              />
            </div>
          ))}
      </div>
      </Container>

      {/* Edit Form Dialog */}
      {selectedPlace && (
        <PlaceForm
          open={openEditForm}
          onClose={() => {
            setOpenEditForm(false);
            setSelectedPlace(null);
          }}
          onSubmit={handleEditPlace}
          place={selectedPlace}
          isEdit
        />
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={openConfirmDelete}
        onClose={() => {
          setOpenConfirmDelete(false);
          setPlaceToDelete(null);
        }}
        onConfirm={handleDeletePlace}
      />

      {/* Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PlacesPage;