import {
  ComponentSchema,
  PageBlueprint,
  PageBlueprint_GetRequest,
  PageContent_GetRequest,
} from '@types';
import { PAGE_BLUEPRINT, PAGE_CONTENT, REGISTERED_COMPONENTS } from './tags';

export async function getRegisteredComponents(): Promise<
  ComponentSchema[] | undefined
> {
  const res = await fetch('http://localhost:8000/api/register-component', {
    next: { tags: [REGISTERED_COMPONENTS] },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch registered components');
  }

  return res.json();
}

// TODO: This function should return {value,error}
export async function getPageBlueprints(): Promise<
  PageBlueprint_GetRequest | undefined
> {
  const res = await fetch('http://localhost:8000/api/page-blueprint', {
    next: { tags: [PAGE_BLUEPRINT] },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch page-blueprints');
  }

  return res.json();
}

export async function getPageContent(
  blueprintId: string
): Promise<PageContent_GetRequest | undefined> {
  try {
    const url = new URL('http://localhost:8000/api/page-content');
    url.search = new URLSearchParams({
      blueprintId,
    }).toString();

    const res = await fetch(url.toString(), {
      // next: { tags: [PAGE_CONTENT] },
      cache: 'no-cache',
    });

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch page-content');
    }

    return res.json();
  } catch (err) {
    console.log('DUPA', err);
  }
}
