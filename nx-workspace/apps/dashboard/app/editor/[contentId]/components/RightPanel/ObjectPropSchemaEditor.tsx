import { Input } from '@ui/components/ui/input';
import { Label } from '@ui/components/ui/label';
import { Switch } from '@ui/components/ui/switch';
import {
  DataFieldContent,
  DataFieldContent_Object,
  DataFieldSchema,
  DataFieldSchema_Object,
} from 'libs/types/src/lib/dataField';
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
  // Parent prop schema is wrong name. It should be origin schema or smth like that
  parentPropSchema: DataFieldSchema_Object;
  editProp: ({ componentId, newProp }: { componentId: string; newProp: DataFieldContent }) => void;
  sendComponentsToApi: () => void;
  component: ComponentContent;
  detailsState: PageContentRequest;
  componentIdNestingHistory: string[];
}) {
  const content_matchSubfield = content.find((val) => val.name === schema.name);
  const content_restSubfields = content.filter((val) => val.name !== schema.name);
  console.log('TESTTT: schema: ', schema.name);
  console.log('TESTTT: content', content);
  console.log('TESTTT: content_matchSubfield', content_matchSubfield);
  const editNestedProp = (newSubfield: DataFieldContent) => {
    const history = componentIdNestingHistory;

    if (history.length === 0) {
      // editProp({
      //   componentId: component._id,
      //   newProp: {
      //     type: 'object',
      //     name: parentPropSchema.name,
      //     subfields: [...content_restSubfields, newSubfield],
      //   },
      // });
    } else {
      // --------------------------------------------------------------------------------------------------------------------------
      // CONTENT MATCH SUBFIELD HAS TO BE AN INITIAL CONTNT BECAUSE WE AARE OPERATING ON HISTORY LEVEL
      // if (!content_matchSubfield) throw new Error('content_matchSubfield not found');

      const historyAndProp: {
        historyName: string;
        matchProp?: DataFieldContent_Object;
        restProps: DataFieldContent[];
      }[] = [];

      history.forEach((fieldName, index) => {
        // If its index 0 we set content_matchSubfield as initial content
        if (index === 0) {
          const content_matchSubfield = content.find((val) => val.name === history[0]);

          if (content_matchSubfield && content_matchSubfield.type !== 'object')
            throw new Error('content_matchSubfield is not an object');

          const content_restSubfields = content.filter((val) => val.name !== history[0]);
          historyAndProp.push({
            historyName: fieldName,
            matchProp: content_matchSubfield,
            restProps: content_restSubfields,
          });

          return;
        }

        // If previous iteration has no content we just add blank object to historyAndProp
        const previousContent = historyAndProp[index - 1];
        if (!previousContent) throw new Error('previousContent not found');

        const previousContentMatchProp = previousContent.matchProp;
        if (!previousContentMatchProp) {
          historyAndProp.push({
            historyName: fieldName,
            matchProp: undefined,
            restProps: [],
          });

          return;
        }

        // const content_matchSubfield = historyAndProp[index - 1]?.matchProp
        // const content_matchSubfield = previousContentMatchProp.subfields.find((val) => val.name === fieldName);

        const currentContent_matchSubfield = previousContentMatchProp.subfields.find((val) => val.name === fieldName);
        const currentContent_restSubfields = previousContentMatchProp.subfields.filter((val) => val.name !== fieldName);

        if (currentContent_matchSubfield?.type !== 'object')
          throw new Error('currentContent_matchSubfield is not an object');

        // If there is no match content, we add blank object to historyAndProp
        if (!currentContent_matchSubfield) {
          historyAndProp.push({
            historyName: fieldName,
            matchProp: undefined,
            restProps: [],
          });

          return;
        }

        // If there is content we add matchSubfield and restSubfield to historyAndProp
        historyAndProp.push({
          historyName: fieldName,
          matchProp: currentContent_matchSubfield,
          restProps: currentContent_restSubfields,
        });
      });

      const lastHistoryAndProp = historyAndProp.at(-1);
      if (!lastHistoryAndProp) throw new Error('historyAndProp is empty');

      const initialUpdatedProp: DataFieldContent = {
        name: lastHistoryAndProp.historyName,
        type: 'object',
        subfields: [...lastHistoryAndProp.restProps, newSubfield],
      };

      const updatedProp = historyAndProp.toReversed().reduce<DataFieldContent>((acc, historyAndPropItem, index) => {
        // We skip first iteration because we already have initialUpdatedProp
        if (index === 0) return acc;
        return {
          name: historyAndPropItem.historyName,
          type: 'object',
          subfields: [...historyAndPropItem.restProps, acc],
        };
      }, initialUpdatedProp);

      editProp({
        componentId: component._id,
        newProp: updatedProp,
      });
      console.log('componentIdNestingHistory', componentIdNestingHistory);
      console.log('historyAndProp', historyAndProp);
      console.log('content_restSubfields', content_restSubfields);
      console.log('updatedProp', updatedProp);
      console.log('parentPropSchema.name', parentPropSchema.name);
    }
  };

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
                  // editProp({
                  //   componentId: component._id,
                  //   newProp: {
                  //     type: 'object',
                  //     name: parentPropSchema.name,
                  //     subfields: [
                  //       ...content_restSubfields,
                  //       {
                  //         name: schema.name,
                  //         type: 'string',
                  //         value: e.target.value,
                  //       },
                  //     ],
                  //   },
                  // })
                  editNestedProp({
                    name: schema.name,
                    type: 'string',
                    value: e.target.value,
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

        if (schema.type === 'object')
          return (
            <div
              className={cn(
                objectPropSchemaWrapperStyles,
                (componentIdNestingHistory.length + 1) % 2 === 0 ? 'bg-backgroundSecondary' : 'bg-background'
                // 'bg-background'
              )}
            >
              <Label className="mx-auto">{schema.name}</Label>
              {schema.subfields.map((schemaSubfield) => {
                const matchSubfield =
                  content_matchSubfield?.type === 'object'
                    ? content_matchSubfield?.subfields.find((val) => val.name === schemaSubfield.name)
                    : undefined;

                const subfieldsContent = matchSubfield?.type === 'object' ? matchSubfield.subfields : [];

                return (
                  <ObjectPropSchemaEditor
                    key={schemaSubfield.name}
                    schema={schemaSubfield}
                    content={subfieldsContent}
                    parentPropSchema={schema}
                    editProp={editProp}
                    sendComponentsToApi={sendComponentsToApi}
                    component={component}
                    detailsState={detailsState}
                    componentIdNestingHistory={[...componentIdNestingHistory, schema.name]}
                  />
                );
              })}
            </div>
          );
      })()}
    </div>
  );
}
