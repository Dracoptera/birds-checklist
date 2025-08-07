import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import uruguay from '../assets/index/uruguay.png';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        textAlign: 'center',
      }}
    >
             <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
         © 2025 Checklist de Aves de Uruguay 
         <img 
           src={uruguay} 
           alt="Uruguay" 
           style={{ 
             width: '20px', 
             height: '20px',
             objectFit: 'contain',
             verticalAlign: 'middle'
           }}
         />
       </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Desarrollado por{' '}
        <Link
          href="https://github.com/Dracoptera"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Alexa Brito
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer; 