import express from 'express';
import userRoutes from './routes/userRoutes';
import vetRoutes from './routes/vetRoutes'
import connectDB from './config/mongo';

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, TypeScript!');
});

app.use('/', userRoutes);
app.use('/', vetRoutes);
app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
