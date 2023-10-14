import { redirect } from 'next/navigation';
import { getPageBlueprints } from '../../utils/api/fetchers';

export default async function Home() {
  const pageBlueprints = await getPageBlueprints();
  const firstBlueprintName = pageBlueprints?.[0].name;

  redirect(`/content/${firstBlueprintName}`);
}
