'use server';

import { ComponentSchema } from '@types';
import { revalidateTag } from 'next/cache';
import { PAGE_CONTENT, REGISTERED_COMPONENTS } from './tags';

export async function postRegisteredComponents(
  components: ComponentSchema[]
): Promise<ComponentSchema[] | undefined> {
  const res = await fetch('http://localhost:8000/api/register-component', {
    method: 'POST',
    body: JSON.stringify(components),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  revalidateTag(REGISTERED_COMPONENTS);

  if (!res.ok) {
    throw new Error('Failed update registered components');
  }

  return res.json();
}

export async function deletePageContent(id: string): Promise<ComponentSchema[] | undefined> {
  console.log('deletePageContent is called');

  const url = new URL('http://localhost:8000/api/page-content');
  url.search = new URLSearchParams({
    id,
  }).toString();

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  revalidateTag(PAGE_CONTENT);

  if (!res.ok) {
    throw new Error('Failed delete page content');
  }

  return res.json();
}

type AddComponentToPageContentArgs = {
  componentBlueprintId: string;
  pageContentId: string;
  parentId: string;
};

export async function addComponentToPageContent({
  componentBlueprintId,
  pageContentId,
  parentId,
}: AddComponentToPageContentArgs) {
  return null;
}
