import express from 'express';
import routes from "./routes/worker.route.js";

import { PORT } from './config/worker.config.js';

const app = express();

app.use(express.json());

app.use('api/', routes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});