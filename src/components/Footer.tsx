import React from 'react';
import { Box, Typography, Link } from '@mui/material';

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
      <Typography variant="body2" color="text.secondary">
        © 2024 Checklist de Aves de Uruguay
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