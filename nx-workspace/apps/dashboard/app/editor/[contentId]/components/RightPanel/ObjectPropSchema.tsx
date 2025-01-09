'use client';

import {
  ComponentContent,
  DataFieldContent,
  DataFieldContent_Object,
  DataFieldSchema_Object,
  PageContentRequest,
} from '@types';
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
import { objectPropSchemaWrapperStyles } from 'apps/dashboard/app/editor/[contentId]/components/RightPanel/styles';
import ObjectPropSchemaEditor from 'apps/dashboard/app/editor/[contentId]/components/RightPanel/ObjectPropSchemaEditor';

export function ObjectPropSchema({
  propSchema,
  detailsState,
  value,
  editProp,
  component,
  sendComponentsToApi,
  originObjectValue,
}: {
  propSchema: DataFieldSchema_Object;
  detailsState: PageContentRequest;
  // setDetailsState: React.Dispatch<React.SetStateAction<PageContentRequest>>;
  value: DataFieldContent[] | null;
  editProp: ({ componentId, newProp }: { componentId: string; newProp: DataFieldContent }) => void;
  sendComponentsToApi: () => void;
  component: ComponentContent;
  originObjectValue: DataFieldContent_Object | undefined;
  // details: PageContentRequest;
}) {
  const [showForm, setShowForm] = React.useState(false);

  // if (!value || value?.length === 0) return <Button>Add object</Button>;
  if (!value || (value?.length === 0 && !showForm))
    return (
      <div className={objectPropSchemaWrapperStyles}>
        <Label className="mx-auto">{propSchema.name}</Label>
        <Button onClick={() => setShowForm(true)}>Add object</Button>
      </div>
    );

  return (
    <>
      <div className={objectPropSchemaWrapperStyles}>
        <Label className="mx-auto">{propSchema.name}</Label>
        <div className={'flex flex-col gap-2 w-full'}>
          {propSchema.subfields.map((subfieldSchema) => {
            const matchContentField = value.find((val) => val.name === subfieldSchema.name);
            // if (matchContentField && matchContentField.type !== 'object')
            //   throw new Error('ObjectPropSchema: subfield is not an object');
            console.log('dupa 1 schema: ', subfieldSchema.name);
            console.log('dupa 1', matchContentField);

            return (
              <ObjectPropSchemaEditor
                key={subfieldSchema.name}
                schema={subfieldSchema}
                // Tutaj założyłem że matchContentField jest zawsze obiektem, ale to nie jest prawda
                content={matchContentField}
                parentPropSchema={propSchema}
                editProp={editProp}
                sendComponentsToApi={sendComponentsToApi}
                component={component}
                detailsState={detailsState}
                componentIdNestingHistory={[propSchema.name]}
                originObjectValue={originObjectValue}
              />
            );

            // return (
            //   <ObjectPropSchemaDisplay key={subfieldSchema.name} schema={subfieldSchema} content={matchContentField} />
            // );
          })}
          <Button onClick={() => setShowForm(false)}>Clear object</Button>

          {/* <Popover>
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
        </Popover> */}
        </div>
      </div>
    </>
  );
}
