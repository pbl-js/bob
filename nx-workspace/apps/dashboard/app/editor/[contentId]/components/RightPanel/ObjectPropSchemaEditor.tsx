import { Input } from '@ui/components/ui/input';
import { Label } from '@ui/components/ui/label';
import { Switch } from '@ui/components/ui/switch';
import { DataFieldContent, DataFieldSchema, DataFieldSchema_Object } from 'libs/types/src/lib/dataField';
import React from 'react';
import { updateComponents } from './utils';
import { updateComponentsFromPageContent } from 'apps/dashboard/utils/api/mutations';
import { ComponentContent, PageContentRequest } from '@types';

export default function ObjectPropSchemaEditor({
  schema,
  content,
  parentPropSchema,
  editProp,
  sendComponentsToApi,
  component,
  detailsState,
}: {
  schema: DataFieldSchema;
  content: DataFieldContent[];
  // TODO: Try to get rid of below props
  parentPropSchema: DataFieldSchema_Object;
  editProp: ({ componentId, newProp }: { componentId: string; newProp: DataFieldContent }) => void;
  sendComponentsToApi: () => void;
  component: ComponentContent;
  detailsState: PageContentRequest;
  componentIdNestingHistory?: string[];
}) {
  const content_matchSubfield = content.find((val) => val.name === schema.name);
  const content_restSubfields = content.filter((val) => val.name !== schema.name);

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5" key={schema.name}>
      {(() => {
        if (schema.type === 'string') {
          return (
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor={schema.name}>{schema.name}</Label>
              <Input
                id={schema.name}
                value={content_matchSubfield?.type === 'string' ? content_matchSubfield.value : ''}
                onBlur={sendComponentsToApi}
                onChange={(e) =>
                  editProp({
                    componentId: component._id,
                    newProp: {
                      type: 'object',
                      name: parentPropSchema.name,
                      subfields: [
                        ...content_restSubfields,
                        {
                          name: schema.name,
                          type: 'string',
                          value: e.target.value,
                        },
                      ],
                    },
                  })
                }
                type="text"
                placeholder={schema.name}
              />
            </div>
          );
        }

        if (schema.type === 'number')
          return (
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor={schema.name}>{schema.name}</Label>
              <Input
                id={schema.name}
                type="text"
                value={content_matchSubfield?.type === 'number' ? content_matchSubfield.value : ''}
                onBlur={sendComponentsToApi}
                onChange={(e) =>
                  editProp({
                    componentId: component._id,
                    newProp: {
                      type: 'object',
                      name: parentPropSchema.name,
                      subfields: [
                        ...content_restSubfields,
                        {
                          name: schema.name,
                          type: 'number',
                          value: Number(e.target.value),
                        },
                      ],
                    },
                  })
                }
              />
            </div>
          );

        if (schema.type === 'boolean')
          return (
            <div className="flex justify-between w-full max-w-sm gap-1.5">
              <Label htmlFor={schema.name}>{schema.name}</Label>
              <Switch
                checked={content_matchSubfield?.type === 'boolean' ? content_matchSubfield.value : false}
                onCheckedChange={async (e) => {
                  const newProp: DataFieldContent = {
                    type: 'object',
                    name: parentPropSchema.name,
                    subfields: [...content_restSubfields, { name: schema.name, type: 'boolean', value: e }],
                  };

                  // editProp({
                  //   componentId: component._id,
                  //   newProp: newProp,
                  // });

                  const updatedComponents = updateComponents({
                    componentId: component._id,
                    newProp,
                    components: detailsState.components,
                  });

                  // Note: We can't use detailsState.components because setState is "async"
                  await updateComponentsFromPageContent({
                    pageContentId: detailsState._id,
                    components: updatedComponents,
                  });
                }}
              />
            </div>
          );

        if (schema.type === 'object')
          return (
            <div className="flex justify-between w-full max-w-sm gap-1.5">
              <Label htmlFor={schema.name}>{schema.name}</Label>
              {/* {propSchema.subfields.map((subfieldSchema) => {
                const matchContentField = value.find((val) => val.name === subfieldSchema.name);

                return (
                  <ObjectPropSchemaEditor
                    key={subfieldSchema.name}
                    schema={subfieldSchema}
                    content={value}
                    parentPropSchema={propSchema}
                    editProp={editProp}
                    sendComponentsToApi={sendComponentsToApi}
                    component={component}
                    detailsState={detailsState}
                  />
                );

                // return (
                //   <ObjectPropSchemaDisplay key={subfieldSchema.name} schema={subfieldSchema} content={matchContentField} />
                // );
              })} */}
            </div>
          );
      })()}
    </div>
  );
}
