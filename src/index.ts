import express from 'express';
import userRoutes from './routes/userRoutes';
import vetRoutes from './routes/vetRoutes'
import animalRoutes from './routes/animalRoutes'
import connectDB from './config/mongo';
//importar cors

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.use('/', userRoutes);
app.use('/', vetRoutes);
app.use('/', userRoutes);
app.use('/', animalRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
