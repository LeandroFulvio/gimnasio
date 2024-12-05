import express from "express";
import cors from "cors";
import socioRoutes from './routes/socio.routes.js';
import payRoutes from './routes/pay.routes.js';
import classRoutes from './routes/class.routes.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const uri = process.env.ATLAS_URI || "";

const PORT = process.env.PORT || 5050;
const app = express();

mongoose
  .connect(uri)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((error) => console.error('Error al conectar a MongoDB Atlas:', error));

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/socios', socioRoutes);
app.use('/api/payments', payRoutes);
app.use('/api/classes', classRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});