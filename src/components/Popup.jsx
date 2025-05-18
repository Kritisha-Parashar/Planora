import React from 'react';
import {
  Box,
  Modal,
  Typography,
  Button,
  Fade,
  Backdrop
} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '1000px',
  height: '90%',
  bgcolor: 'rgba(18, 18, 18, 0.7)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 4,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  color: '#fff',
  overflowY: 'auto',
  p: { xs: 2, sm: 4 },
};

const PopupComponent = ({ open, handleClose, card }) => {
  if (!card) return null;

  const encodedLocation = encodeURIComponent(card.title);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  const googleFlightsUrl = `https://www.google.com/travel/flights?q=flights+to+${encodedLocation}`;
  const hotelSearchUrl = `https://www.google.com/search?q=hotels+in+${encodedLocation}`;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 400 }}
    >
      <Fade in={open}>
        <Box sx={style}>
          {/* Main Content */}
          <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            gap={4}
            height="calc(100% - 120px)"
          >
            <Box flex={1}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {card.title}
              </Typography>
              <Typography variant="h6" sx={{ color: '#ccc', mb: 2 }}>
                {card.desc}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#ddd' }}
              >
                {card.description}
              </Typography>
            </Box>

            <Box
              sx={{
                width: { xs: '100%', md: '40%' },
                height: { xs: '300px', md: 'auto' },
                borderRadius: 2,
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <img
                src={card.img}
                alt={card.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box
            position="absolute"
            bottom={24}
            right={24}
            display="flex"
            gap={2}
            flexWrap="wrap"
          >
            <Button
              onClick={() => window.open(googleMapsUrl, '_blank')}
              variant="outlined"
              startIcon={<PlaceIcon />}
              sx={buttonStyle}
            >
              Show on Google Maps
            </Button>

            <Button
              onClick={() => window.open(googleFlightsUrl, '_blank')}
              variant="outlined"
              startIcon={<FlightIcon />}
              sx={buttonStyle}
            >
              Show Flights
            </Button>

            <Button
              onClick={() => window.open(hotelSearchUrl, '_blank')}
              variant="outlined"
              startIcon={<HotelIcon />}
              sx={buttonStyle}
            >
              Show Hotels
            </Button>

            <Button
              onClick={handleClose}
              variant="contained"
              startIcon={<CloseIcon />}
              sx={{
                ...buttonStyle,
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.25)',
                },
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

// Shared button styling
const buttonStyle = {
  borderColor: 'rgba(255, 255, 255, 0.5)',
  color: '#fff',
  fontWeight: 'bold',
  textTransform: 'none',
  borderRadius: 2,
  px: 3,
  py: 1,
  transition: 'all 0.3s ease',
  '&:hover': {
    bgcolor: 'rgba(255, 255, 255, 0.1)',
    borderColor: '#fff',
    transform: 'scale(1.05)',
  },
};

export default PopupComponent;
