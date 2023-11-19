import Link from 'next/link';
import { RegisteredComponentListing } from '../../../components/RegisteredComponentsListing/RegisteredComponentListing';
import { IframeComunicator } from '../../../components/iframeCommunicator/IframeCommunicator';
import { PAGE_CONTENT } from '../../../utils/api/tags';
import { PageProps } from '../../../utils/types/types';
import { getPageContentDetails } from '../../../utils/api/fetchers';
import { redirect } from 'next/navigation';
import { CONTENT_PAGE } from '../../../utils/routes';
import { Logger } from '../../../components/Logger/Logger';
import { RectLayer } from '../../../components/RectLayer/RectLayer';

export default async function Home({ params: { contentId } }: PageProps<{ contentId?: string }>) {
  if (!contentId) redirect(CONTENT_PAGE);

  const details = await getPageContentDetails(contentId);
  console.log('DETAILS: ', details);

  if (!details) return null;

  return (
    <>
      <IframeComunicator contentId={contentId} />
      <main className="flex min-h-screen w-full bg-slate-800">
        <div className="grid p-3 pb-0 gap-3 grid-cols-editor w-full min-h-screen text-sm font-medium">
          <div className="text-slate-200">
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

          <div className="flex flex-col gap-3">
            <Link
              href={PAGE_CONTENT}
              className="flex items-center justify-center w-10 h-10 bg-slate-700 rounded-md text-slate-400"
            >
              {'<'}
            </Link>
            <div className="flex relative h-full">
              <RectLayer />
              <iframe
                className="block w-full border-none"
                src="http://localhost:4444"
                title="Iframe dashboard"
                id="cms-editor-iframe"
              />
            </div>
          </div>

          <div className="bg-blue">ds</div>
        </div>
      </main>
    </>
  );
}
