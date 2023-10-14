import clsx from 'clsx';
import { getPageBlueprints } from '../../../utils/api/fetchers';

export default async function Home() {
  const pageBlueprints = await getPageBlueprints();

  return (
    <main className="flex min-h-screen bg-slate-800">
      <div className="flex flex-col">
        <h3 className="mb-3">Content</h3>
        <div className="grid grid-cols-1 gap-2">siema</div>
      </div>
    </main>
  );
}
