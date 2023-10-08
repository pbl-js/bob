import { RegisteredComponentListing } from '../components/RegisteredComponentsListing/RegisteredComponentListing';
import { IframeComunicator } from '../components/iframeCommunicator/IframeCommunicator';
import clsx from 'clsx';
import { PageBlueprintsListing } from '../components/PageBlueprintsListing/PageBlueprintsListing';
import Link from 'next/link';
import { CONTENT_PAGE } from '../utils/routes';

export default async function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-slate-800">
      <h1 className="my-4">Homepage</h1>
      <Link
        className="flex w-auto p-4 bg-slate-600 rounded-sm"
        href={CONTENT_PAGE}
      >
        Go to editor
      </Link>
    </main>
  );
}
