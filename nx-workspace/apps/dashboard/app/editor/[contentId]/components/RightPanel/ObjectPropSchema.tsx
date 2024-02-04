'use client';

import { ComponentContent, DataFieldContent, DataFieldSchema_Object, PageContentRequest } from '@types';
import { Button } from '@ui/components/ui/button';
import { Input } from '@ui/components/ui/input';
import { Label } from '@ui/components/ui/label';
import { Popover, PopoverTrigger, PopoverContent } from '@ui/components/ui/popover';
import { Switch } from '@ui/components/ui/switch';
import clsx from 'clsx';
import React from 'react';
import { updateComponents } from './utils';
import { updateComponentsFromPageContent } from 'apps/dashboard/utils/api/mutations';
import ObjectPropSchemaDisplay from './ObjectPropSchemaDisplay';
import ObjectPropSchemaEditor from './ObjectPropSchemaEditor';

export function ObjectPropSchema({
  propSchema,
  detailsState,
  setDetailsState,
  details,
  value,
  editProp,
  component,
  sendComponentsToApi,
}: {
  propSchema: DataFieldSchema_Object;
  detailsState: PageContentRequest;
  setDetailsState: React.Dispatch<React.SetStateAction<PageContentRequest>>;
  value: DataFieldContent[] | null;
  editProp: ({ componentId, newProp }: { componentId: string; newProp: DataFieldContent }) => void;
  sendComponentsToApi: () => void;
  component: ComponentContent;
  details: PageContentRequest;
}) {
  console.log('value: ', value);

  if (!value || value?.length === 0) return <Button>Add object</Button>;

  return (
    <>
      <Label>{propSchema.name}</Label>
      <div className="flex flex-col gap-2 w-full border p-3 rounded-md">
        {propSchema.subfields.map((subfieldSchema) => {
          const matchContentField = value.find((val) => val.name === subfieldSchema.name);

          return (
            <ObjectPropSchemaDisplay key={subfieldSchema.name} schema={subfieldSchema} content={matchContentField} />
          );
        })}
        {/* {value.map((val) => (
          <ObjectPropSchemaDisplay key={val.name} schema={propSchema} content={val} />
        ))} */}
        <Popover>
          <PopoverTrigger>
            <Button className="w-full">Edit object</Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="flex flex-col gap-2">
            {propSchema.subfields.map((schema_subfield) => {
              const content_matchSubfield = value.find((val) => val.name === schema_subfield.name);
              const content_restSubfields = value.filter((val) => val.name !== schema_subfield.name);

              return (
                <ObjectPropSchemaEditor
                  key={schema_subfield.name}
                  schema={schema_subfield}
                  content={value}
                  parentPropSchema={propSchema}
                  editProp={editProp}
                  sendComponentsToApi={sendComponentsToApi}
                  component={component}
                  detailsState={detailsState}
                />
              );
            })}
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
