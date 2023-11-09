import Link from 'next/link';
import { RegisteredComponentListing } from '../../../components/RegisteredComponentsListing/RegisteredComponentListing';
import { IframeComunicator } from '../../../components/iframeCommunicator/IframeCommunicator';
import { PAGE_CONTENT } from '../../../utils/api/tags';
import { PageProps } from '../../../utils/types/types';
import { getPageContentDetails } from '../../../utils/api/fetchers';
import { redirect } from 'next/navigation';
import { CONTENT_PAGE } from '../../../utils/routes';
import { Logger } from '../../../components/Logger/Logger';

export default async function Home({ params: { contentId } }: PageProps<{ contentId?: string }>) {
  if (!contentId) redirect(CONTENT_PAGE);
  console.log(contentId);
  const details = await getPageContentDetails(contentId);

  if (!details) return null;

  return (
    <>
      <IframeComunicator />
      <main className="flex min-h-screen bg-slate-800">
        <div className="w-full h-full flex text-sm font-medium">
          <div className="w-[350px] p-3 text-slate-200">
            <Link
              href={PAGE_CONTENT}
              className="flex items-center justify-center w-10 h-10 bg-slate-700 rounded-md mb-3 text-slate-400"
            >
              {'<'}
            </Link>
            <h3 className="mb-3 text-slate-200">Registered components</h3>
            <RegisteredComponentListing pageContentId={contentId} />
            <h3 className="mb-3 text-slate-200">page content details</h3>
            <p>Name: {details?.name}</p>
            <p>
              {details.components.map((component) => (
                <span key={component.id}>Component name</span>
              ))}
            </p>
          </div>

          <iframe
            className="block w-full h-[80vh] border-none"
            src="http://localhost:4444"
            title="Iframe dashboard"
            id="cms-editor-iframe"
          />

          <div className="w-[200px]"></div>
        </div>
      </main>
    </>
  );
}
