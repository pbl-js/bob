import { Express } from 'express';
import { client } from '../../packages/db/mongo';
import {
  ComponentSchema,
  PageBlueprint,
  dataFieldSchemaArraySchema,
  pageBlueprintSchema,
} from '@types';
import { z } from 'zod';
import { PAGE_BLUEPRINT_COLLECTION } from '../db/collections';

export async function pageBlueprintController(app: Express) {
  app.get('/api/page-blueprint', async (req, res) => {
    await client.connect();
    const myDB = client.db('mongotron');
    const pageBlueprintCollection = myDB.collection(PAGE_BLUEPRINT_COLLECTION);

    const result = await pageBlueprintCollection.find({}).toArray();
    await client.close();
    res.json(result);
  });

  app.post('/api/page-blueprint', async (req, res, next) => {
    try {
      await client.connect();

      const reqBodySchema = pageBlueprintSchema;

      const blueprintFromClient = reqBodySchema.parse(req.body);

      const myDB = client.db('mongotron');
      const pageBlueprintCollection = myDB.collection(
        PAGE_BLUEPRINT_COLLECTION
      );

      //TODO: Add ComponentSchemaMongoModel type
      const existedBlueprints = (await pageBlueprintCollection
        .find({})
        .toArray()) as unknown as PageBlueprint[];

      const blueprintAlreadyExsists: boolean = existedBlueprints.some(
        (existedBlueprint) => existedBlueprint.name === blueprintFromClient.name
      );

      if (blueprintAlreadyExsists) {
        res.status(400).send('Component already exist');
        return;
      }

      const insertResult = await pageBlueprintCollection.insertOne(
        blueprintFromClient
      );

      await client.close();
      res.json(insertResult);
    } catch (err) {
      next(err);
    }
  });
}
