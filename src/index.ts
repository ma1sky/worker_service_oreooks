import express from 'express';
import { PORT } from './config/worker.config.js';

const app = express();
app.use(express.json());

const userRoutes = require("./routes/user.routes");

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});