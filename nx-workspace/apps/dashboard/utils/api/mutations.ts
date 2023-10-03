import { ComponentSchema } from '@types';

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
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed update registered components');
  }

  return res.json();
}
