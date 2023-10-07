import Link from 'next/link';
import { RegisteredComponentListing } from '../../components/RegisteredComponentsListing/RegisteredComponentListing';
import { IframeComunicator } from '../../components/iframeCommunicator/IframeCommunicator';

export default function Home() {
  return (
    <>
      <IframeComunicator />
      <main className="flex min-h-screen bg-slate-800">
        <div className="w-full h-full flex">
          <div className="w-[350px] p-3">
            <Link href="/" className="w-10 h-10 bg-slate-700 rounded-md mb-3">
              {'<'}
            </Link>
            <h3 className="mb-3">Registered components</h3>
            <RegisteredComponentListing />
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
