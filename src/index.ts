import express from 'express';
import routes from "./routes/worker.route";

import { PORT } from './config/worker.config';

const app = express();

app.use(express.json());

app.use('api/', routes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});