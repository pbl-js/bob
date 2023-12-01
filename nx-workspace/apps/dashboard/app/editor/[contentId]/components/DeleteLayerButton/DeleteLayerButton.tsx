'use client';

import { deleteComponentFromPageContent } from '../../../../../utils/api/mutations';

type DeleteLayerButtonProps = {
  pageContentId: string;
  componentId: string;
};

export function DeleteLayerButton({ componentId, pageContentId }: DeleteLayerButtonProps) {
  return (
    <button
      onClick={() => deleteComponentFromPageContent({ componentId, pageContentId })}
      className="flex hover:bg-slate-600 px-2 h-full rounded-md"
    >
      X
    </button>
  );
}
