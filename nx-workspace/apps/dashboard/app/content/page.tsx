import { RegisteredComponentListing } from '../../components/RegisteredComponentsListing/RegisteredComponentListing';
import { IframeComunicator } from '../../components/iframeCommunicator/IframeCommunicator';
import clsx from 'clsx';
import { PageBlueprintsListing } from '../../components/PageBlueprintsListing/PageBlueprintsListing';

export default async function Home() {
  return (
    <main className="flex min-h-screen bg-slate-800">
      <div className="w-full h-full flex p-5 gap-10">
        <div className="w-[350px]">
          <h3 className="mb-3">Pages</h3>
          <PageBlueprintsListing />
        </div>

        <div className="w-full ">
          <h3 className="mb-3">Pages</h3>
          PageBlueprintsListing
        </div>
      </div>
    </main>
  );
}
