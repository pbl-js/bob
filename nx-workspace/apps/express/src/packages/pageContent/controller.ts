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
    const getData = async () => {
      const querySchema = z.object({
        blueprintId: z
          .string()
          .refine((val) => ObjectId.isValid(val))
          .optional(),
      });
      const query = querySchema.parse(req.query);

      const myDB = client.db('mongotron');
      const pageContentCollection = myDB.collection(PAGE_CONTENT_COLLECTION);

      const mongoQuery = query.blueprintId
        ? {
            '@blueprintId': new ObjectId(query.blueprintId),
          }
        : {};
      const result = await pageContentCollection.find(mongoQuery).toArray();
      return result;
    };

    try {
      const data = await getData();
      await res.json(data);
    } catch (err) {
      console.log(err);
    }
  });

  app.delete('/api/page-content', async (req, res) => {
    try {
      const myDB = client.db('mongotron');
      const pageContentCollection = myDB.collection(PAGE_CONTENT_COLLECTION);

      const querySchema = z.object({
        id: z.string().refine((val) => ObjectId.isValid(val)),
      });
      const query = querySchema.parse(req.query);

      const result = await pageContentCollection.findOneAndDelete({
        _id: new ObjectId(query.id),
      });

      await res.json(result);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  app.post('/api/page-content', async (req, res, next) => {
    try {
      // Validate query
      const reqBodySchema = z.object({
        // TODO: Do something to coerced below type to ObjectId
        '@blueprintId': z.string().refine((val) => ObjectId.isValid(val)),
        name: z.string(),
      });

      const blueprintFromClient = reqBodySchema.parse(req.body);

      // Check if blueprint with provided ID exists
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

      // TODO: Check if page-content with provided name is already exists
      // Add page-content
      const pageContentCollection = myDB.collection(PAGE_CONTENT_COLLECTION);
      console.log(blueprintFromClient);
      const insertResult = await pageContentCollection.insertOne({
        '@blueprintId': new ObjectId(blueprintFromClient['@blueprintId']),
        name: blueprintFromClient.name,
        fields: [],
        components: [],
      });

      res.json(insertResult);
    } catch (err) {
      next(err);
    }
  });
}
