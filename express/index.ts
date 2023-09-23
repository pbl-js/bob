import 'dotenv/config';
import express from 'express';
import { client, run } from './src/packages/db/mongo';

async function main() {
  const app = express();
  const port = process.env.PORT;

  await run().catch(console.dir);

  app.get('/', async (req, res) => {
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

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

main();
