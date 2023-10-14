import { Express } from 'express';
import { client } from '../db/mongo';
import {
  ComponentSchema,
  PageBlueprint,
  dataFieldSchemaArraySchema,
  pageBlueprintSchema,
} from '@types';
import { z } from 'zod';
import {
  PAGE_BLUEPRINT_COLLECTION,
  PAGE_CONTENT_COLLECTION,
} from '../db/collections';
import { ObjectId } from 'mongodb';

export async function pageContentController(app: Express) {
  app.get('/api/page-content', async (req, res) => {
    await client.connect();
    const myDB = client.db('mongotron');
    const pageContentCollection = myDB.collection(PAGE_CONTENT_COLLECTION);

    const result = await pageContentCollection.find({}).toArray();
    await client.close();
    res.json(result);
  });

  app.post('/api/page-content', async (req, res, next) => {
    try {
      const reqBodySchema = z.object({
        // TODO: Do something to coerced below type to ObjectId
        '@blueprintId': z.string().refine((val) => ObjectId.isValid(val)),
        name: z.string(),
      });

      const blueprintFromClient = reqBodySchema.parse(req.body);

      await client.connect();
      const myDB = client.db('mongotron');

      const pageBlueprintCollection = myDB.collection(
        PAGE_BLUEPRINT_COLLECTION
      );

      const matchPageBlueprintQuery = {
        _id: new ObjectId(blueprintFromClient['@blueprintId']),
      };
      const matchPageBlueprint =
        ((await pageBlueprintCollection.findOne(
          matchPageBlueprintQuery
        )) as unknown as PageBlueprint) || null;

      if (!matchPageBlueprint) {
        res
          .status(400)
          .send('There is no page content with provided blueprintId');
        return;
      }

      const pageContentCollection = myDB.collection(PAGE_CONTENT_COLLECTION);

      const insertResult = await pageContentCollection.insertOne({
        '@blueprintId': blueprintFromClient['@blueprintId'],
        name: blueprintFromClient['@blueprintId'],
        fields: [],
        components: [],
      });

      await client.close();
      res.json(insertResult);
    } catch (err) {
      next(err);
    }
  });
}
