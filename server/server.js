import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import socioRoutes from './routes/socio.routes.js';
import payRoutes from './routes/pay.routes.js';
import classRoutes from './routes/class.routes.js';

const app = express();
const uri = process.env.MONGO_URI || 'mongodb://root:root@localhost:27017/gimnasio?authSource=admin';
const PORT = process.env.PORT || 5050;


mongoose
  .connect(uri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/socios', socioRoutes);
app.use('/api/payments', payRoutes);
app.use('/api/classes', classRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});