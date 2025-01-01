import { Input } from '@ui/components/ui/input';
import { Label } from '@ui/components/ui/label';
import { Switch } from '@ui/components/ui/switch';
import { DataFieldContent, DataFieldSchema, DataFieldSchema_Object } from 'libs/types/src/lib/dataField';
import React from 'react';
import { updateComponents } from './utils';
import { updateComponentsFromPageContent } from 'apps/dashboard/utils/api/mutations';
import { ComponentContent, PageContentRequest } from '@types';
import { ObjectPropSchema } from 'apps/dashboard/app/editor/[contentId]/components/RightPanel/ObjectPropSchema';
import { objectPropSchemaWrapperStyles } from 'apps/dashboard/app/editor/[contentId]/components/RightPanel/styles';
import { cn } from '@ui/utils';

export default function ObjectPropSchemaEditor({
  schema,
  content,
  parentPropSchema,
  editProp,
  sendComponentsToApi,
  component,
  detailsState,
  componentIdNestingHistory,
}: {
  schema: DataFieldSchema;
  content: DataFieldContent[];
  // TODO: Try to get rid of below props
  parentPropSchema: DataFieldSchema_Object;
  editProp: ({ componentId, newProp }: { componentId: string; newProp: DataFieldContent }) => void;
  sendComponentsToApi: () => void;
  component: ComponentContent;
  detailsState: PageContentRequest;
  componentIdNestingHistory: string[];
}) {
  const content_matchSubfield = content.find((val) => val.name === schema.name);
  const content_restSubfields = content.filter((val) => val.name !== schema.name);

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5" key={schema.name}>
      {(() => {
        if (schema.type === 'string') {
          return (
            <div className="px-3 grid w-full max-w-sm items-center gap-1.5">
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
            <div className="px-3 grid w-full max-w-sm items-center gap-1.5">
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
            <div className="px-3 flex justify-between w-full max-w-sm gap-1.5">
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

        // if (schema.type === 'object')
        //   return (
        //     <ObjectPropSchema
        //       component={component}
        //       editProp={editProp}
        //       sendComponentsToApi={sendComponentsToApi}
        //       value={content}
        //       detailsState={detailsState}
        //       propSchema={parentPropSchema}
        //       componentIdNestingHistory={[component._id]}
        //     />
        //   );
        if (schema.type === 'object')
          return (
            <div className={cn(objectPropSchemaWrapperStyles, 'bg-background')}>
              <Label className="mx-auto">{schema.name}</Label>
              {schema.subfields.map((schemaSubfield) => (
                <ObjectPropSchemaEditor
                  key={schemaSubfield.name}
                  schema={schemaSubfield}
                  content={content}
                  parentPropSchema={schema}
                  editProp={editProp}
                  sendComponentsToApi={sendComponentsToApi}
                  component={component}
                  detailsState={detailsState}
                  componentIdNestingHistory={componentIdNestingHistory}
                />
              ))}
            </div>
          );
      })()}
    </div>
  );
}
