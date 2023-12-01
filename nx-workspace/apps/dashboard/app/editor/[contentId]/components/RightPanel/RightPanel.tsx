'use client';
import React, { useEffect, useState } from 'react';
import { useEditorContext } from '../../editorContext';
import {
  ComponentContent,
  ComponentSchemaResponse,
  DataFieldContent,
  PageContentModel,
  PageContentRequest,
} from '@types';
import clsx from 'clsx';
import { postMessage_pageContentData } from '../../../../../components/iframeCommunicator/postMessage/pageContentData';

type Props = {
  details: PageContentRequest;
  componentsSchema: ComponentSchemaResponse[];
};

export function RightPanel({ details, componentsSchema }: Props) {
  const { state } = useEditorContext();
  const [detailsState, setDetailsState] = useState(details);
  const components = detailsState.components;

  React.useEffect(() => {
    postMessage_pageContentData(detailsState);
  }, [detailsState]);

  const onChange = ({ componentId, newProp }: { componentId: string; newProp: DataFieldContent }) =>
    setDetailsState((prev) => {
      const restComponents = prev.components.filter((item) => item._id !== componentId);
      const matchComponent = prev.components.find((item) => item._id === componentId);

      if (!matchComponent) return prev;

      // TODO: This prop replacement is based on propName, there should be propID property
      const restProps = matchComponent.props.filter((item) => item.name !== newProp.name);

      return {
        ...prev,
        components: [...restComponents, { ...matchComponent, props: [...restProps, newProp] }],
      };
    });

  const matchComponent = components.find(({ _id }) => _id === state.selectedBobComponentId);
  const matchComponentSchema = componentsSchema.find(({ _id }) => matchComponent?.componentBlueprintId === _id);

  if (!matchComponent || !matchComponentSchema) return <div>Something went wrong</div>;

  return (
    <div>
      <div className="flex flex-col gap-4">
        {matchComponentSchema.propsSchema.map((propSchema) => {
          const matchComponentMatchProp = matchComponent.props.find(
            (matchComponentProp) => matchComponentProp.name === propSchema.name
          );
          if (!matchComponentMatchProp) return null;

          if (propSchema.type === 'string' && matchComponentMatchProp.type === 'string')
            return (
              <div className="flex flex-col gap-1">
                <label>{matchComponentMatchProp.name}</label>
                <input
                  className={clsx('rounded-md bg-slate-700 p-3 border border-slate-600', 'hover:border-slate-500')}
                  type="text"
                  value={matchComponentMatchProp.value}
                  onChange={(e) =>
                    onChange({
                      componentId: matchComponent._id,
                      newProp: {
                        type: 'string',
                        name: matchComponentMatchProp.name,
                        value: e.target.value,
                      },
                    })
                  }
                />
              </div>
            );

          if (propSchema.type === 'number' && matchComponentMatchProp.type === 'number')
            return (
              <div className="flex flex-col gap-1">
                <label>{matchComponentMatchProp.name}</label>
                <input
                  className={clsx('rounded-md bg-slate-700 p-3 border border-slate-600', 'hover:border-slate-500')}
                  type="text"
                  value={matchComponentMatchProp.value}
                />
              </div>
            );
        })}
      </div>
    </div>
  );
}
