'use server';

import { ComponentSchema } from '@types';
import { revalidateTag } from 'next/cache';
import { REGISTERED_COMPONENTS } from './tags';

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
