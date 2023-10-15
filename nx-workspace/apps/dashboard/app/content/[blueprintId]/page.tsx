import clsx from 'clsx';
import { getPageBlueprints } from '../../../utils/api/fetchers';
import { PageContentListing } from '../../../components/PageContentListing/PageContentListing';

type HomeProps = {
  params: { blueprintId: string };
  searchParams: unknown;
};

export default async function Home({ params }: HomeProps) {
  const pageBlueprints = await getPageBlueprints();
  const matchedPageBlueprint = pageBlueprints?.find(
    (el) => el._id === params.blueprintId
  );
  console.log('params', params);
  if (!matchedPageBlueprint) return <div>Invalid blueprint id</div>;

  return (
    <main className="flex min-h-screen bg-slate-800">
      <div className="w-full flex flex-col">
        <h3 className="mb-3">Content</h3>
        <PageContentListing blueprintId={matchedPageBlueprint._id} />
      </div>
    </main>
  );
}
