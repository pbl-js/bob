import { redirect } from 'next/navigation';
import { getPageBlueprints } from '../../utils/api/fetchers';

export default async function Home() {
  const pageBlueprints = await getPageBlueprints();
  const firstBlueprintId = pageBlueprints?.[0]?._id;

  redirect(`/content/${firstBlueprintId}`);
}
