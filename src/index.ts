import express from 'express';
import router from './routes/index.js';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${String(port)}`);
});
