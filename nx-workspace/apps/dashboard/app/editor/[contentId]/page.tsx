import Link from 'next/link';
import { RegisteredComponentListing } from '../../../components/RegisteredComponentsListing/RegisteredComponentListing';
import { IframeComunicator } from '../../../components/iframeCommunicator/IframeCommunicator';
import { PAGE_CONTENT } from '../../../utils/api/tags';
import { PageProps } from '../../../utils/types/types';
import { getPageContentDetails, getRegisteredComponents } from '../../../utils/api/fetchers';
import { redirect } from 'next/navigation';
import { CONTENT_PAGE } from '../../../utils/routes';
import { Logger } from '../../../components/Logger/Logger';
import { RectLayer } from '../../../components/RectLayer/RectLayer';
import { EditorContextProvider } from './editorContext';
import { RightPanel } from './components/RightPanel/RightPanel';
import { DeleteLayerButton } from './components/DeleteLayerButton/DeleteLayerButton';
import { DndContext } from '@dnd-kit/core';
import DraggableContext from './DraggableContext';
import { DraggingOverlay } from '../../../components/DraggingOverlay/DraggingOverlay';

export default async function Home({ params: { contentId } }: PageProps<{ contentId?: string }>) {
  if (!contentId) redirect(CONTENT_PAGE);

  const details = await getPageContentDetails(contentId);
  const registeredComponents = await getRegisteredComponents();
  console.log('DETAILS: ', details);

  if (!details) return null;
  if (!registeredComponents) return null;

  return (
    <EditorContextProvider>
      <IframeComunicator contentId={contentId} />
      <main className="flex min-h-screen w-full bg-slate-800">
        <div className="grid p-3 pb-0 gap-3 grid-cols-editor w-full min-h-screen text-sm font-medium">
          <DraggableContext>
            <DraggingOverlay />
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
              <p className="mt-6">Name: {details?.name}</p>

              <div className="mt-2 flex flex-col gap-1">
                {details.components.map((component) => (
                  <div className="p-2 bg-slate-700 rounded-md flex justify-between" key={component._id}>
                    {component.name}
                    <DeleteLayerButton componentId={component._id} pageContentId={details._id} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href={PAGE_CONTENT}
                className="flex items-center justify-center w-10 h-10 bg-slate-700 rounded-md text-slate-400"
              >
                {'<'}
              </Link>
              <div className="flex relative h-full">
                <RectLayer pageContent={details} registeredComponents={registeredComponents} />
                <iframe
                  className="block w-full border-none"
                  src="http://localhost:4444"
                  title="Iframe dashboard"
                  id="cms-editor-iframe"
                />
              </div>
            </div>
          </DraggableContext>

          <div className="bg-blue">
            <Link
              href={PAGE_CONTENT}
              className="flex items-center justify-center w-10 h-10 bg-slate-700 rounded-md mb-3 text-slate-400"
            >
              {'<'}
            </Link>
            <RightPanel details={details} componentsSchema={registeredComponents} />
          </div>
        </div>
      </main>
    </EditorContextProvider>
  );
}
