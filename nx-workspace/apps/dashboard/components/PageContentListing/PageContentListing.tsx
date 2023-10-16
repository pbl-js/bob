import React from 'react';
import { getPageContent } from '../../utils/api/fetchers';
import clsx from 'clsx';
import { PageContentItem } from './PageContentItem.c';

type PageContentListingProps = {
  blueprintId: string;
};

export const PageContentListing = async ({
  blueprintId,
}: PageContentListingProps) => {
  const pageContentList = await getPageContent(blueprintId);

  return (
    <div className="w-full grid grid-cols-1 gap-2">
      {pageContentList?.map((pageContent) => (
        <PageContentItem key={pageContent._id} pageContentItem={pageContent} />
      ))}
    </div>
  );
};
