import express from 'express';
import rescatistaRoutes from './routes/rescatistaRoutes';
import vetRoutes from './routes/vetRoutes';
import animalRoutes from './routes/animalRoutes';
import refugioRoutes from './routes/refugioRoutes';
import userRoutes from './routes/userRoutes';
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

app.use('/', rescatistaRoutes);
app.use('/', vetRoutes);
app.use('/', rescatistaRoutes);
app.use('/', animalRoutes);
app.use('/', animalRoutes);
app.use('/', animalRoutes);
app.use('/', animalRoutes);
app.use('/', animalRoutes);
app.use('/', animalRoutes);
app.use('/', refugioRoutes);
app.use('/', refugioRoutes);
app.use('/', animalRoutes);
app.use('/', userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
