import express from 'express';
import { client, run } from './packages/db/mongo';
import * as path from 'path';
import { ComponentSchema } from '@types';
import bodyParser from 'body-parser';
import cors from 'cors';

async function main() {
  const app = express();
  app.use(cors());

  await run().catch(console.dir);
  app.use(bodyParser.json());
  app.use('/assets', express.static(path.join(__dirname, 'assets')));

  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to express!' });
  });

  app.get('/api/register-component', async (req, res) => {
    await client.connect();
    const myDB = client.db('mongotron');
    const modelSchemaCollection = myDB.collection('component-schema');

    const result = await modelSchemaCollection.find({}).toArray();
    console.log(result);
    res.json(result);
  });

  app.post('/api/register-component', async (req, res) => {
    await client.connect();

    // TODO: Validate components to register
    const componentsFromClient = req.body as ComponentSchema[];

    const myDB = client.db('mongotron');
    const modelSchemaCollection = myDB.collection('component-schema');
    //TODO: Add ComponentSchemaMongoModel type
    const result = (await modelSchemaCollection
      .find({})
      .toArray()) as unknown as ComponentSchema[];

    // TODO: Logic for getUnique and getOnlyChanged can be shared between express and
    // dashboard
    const componentsToUpdate = componentsFromClient.filter(
      (componentFromClient) =>
        !result.some(
          (resultItem) => resultItem.name === componentFromClient.name
        )
    );

    if (componentsToUpdate.length === 0) {
      res.status(400).send('Error inserting component');
      return;
    }

    const insertResult = await modelSchemaCollection.insertMany(
      componentsToUpdate,
      {
        ordered: true,
      }
    );

    res.send('Component registered');
  });

  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
}

main();
