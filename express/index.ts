import 'dotenv/config';
import express from 'express';
import { run } from './src/packages/db/mongo';

function main() {
  const app = express();
  const port = process.env.PORT;

  run().catch(console.dir);

  app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
  });

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

main();
