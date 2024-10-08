const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Este es el archivo con las rutas de autenticación

const app = express();
app.use(cors());
app.use(express.json());

// Usar las rutas de autenticación
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
