import React from 'react';
import { getPageContent } from '../../utils/api/fetchers';
import clsx from 'clsx';

type PageContentListingProps = {
  blueprintId: string;
};

export const PageContentListing = async ({
  blueprintId,
}: PageContentListingProps) => {
  const pageContentList = await getPageContent(blueprintId);
  console.log(blueprintId);
  console.log(pageContentList);

  return (
    <div className="w-full grid grid-cols-1 gap-2">
      {pageContentList?.map((pageContent) => (
        <div
          className={clsx(
            'bg-slate-700 rounded-md p-2 h-[60px]',
            'text-xs break-words text-slate-300 cursor-pointer'
          )}
          key={pageContent._id}
        >
          {pageContent.name}
        </div>
      ))}
    </div>
  );
};
