/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import { client, run } from './packages/db/mongo';
import * as path from 'path';

async function main() {
  const app = express();

  await run().catch(console.dir);
  app.use('/assets', express.static(path.join(__dirname, 'assets')));

  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to express!' });
  });

  app.get('/register-component', async (req, res) => {
    await client.connect();
    const myDB = client.db('mongotron');
    const modelSchemaCollection = myDB.collection('model-schema');
    const doc = {
      name: 'page',
      description: 'Example something',
      fields: [
        {
          name: 'test string field',
          type: 'string',
          defaultValue: 'somekingofdefaultvalue',
        },
        {
          name: 'test object field',
          type: 'object',
          defaultValue: null,
          fields: [
            {
              name: 'test string field',
              type: 'string',
              defaultValue: 'somekingofdefaultvalue',
            },
          ],
        },
      ],
    };
    const result = await modelSchemaCollection.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    res.send('Express + TypeScript Server');
  });

  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
}

main();
