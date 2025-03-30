import React from 'react';
import { Place } from '../types/place';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

interface PlaceCardProps {
  place: Place;
  onEdit: (place: Place) => void;
  onDelete: (id: number) => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, onEdit, onDelete }) => {
  // Formatar a data para exibição no formato MM/YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <div className="place-card" style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        </div>
        <div>
          <button 
            onClick={() => onEdit(place)} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '8px' }}
          >
            <EditIcon style={{ color: '#666' }} />
          </button>
          <button 
            onClick={() => onDelete(place.id)} 
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <CloseIcon style={{ color: '#666' }} />
          </button>
        </div>
      </div>
      
      <div style={{ 
        borderBottom: '1px solid #eee', 
        paddingBottom: '10px', 
        marginBottom: '10px',
        textTransform: 'uppercase',
        color: '#4CAF50',
        fontWeight: 'bold'
      }}>
        {place.country}
      </div>
      
      <div>
        <p style={{ margin: '5px 0' }}><strong>Local:</strong> {place.location}</p>
        <p style={{ margin: '5px 0' }}><strong>Meta:</strong> {formatDate(place.createdAt)}</p>
      </div>
    </div>
  );
};

export default PlaceCard;