import { RegisteredComponentListing } from '../components/RegisteredComponentsListing/RegisteredComponentListing';
import { IframeComunicator } from '../components/iframeCommunicator/IframeCommunicator';

export default function Home() {
  return (
    <>
      <IframeComunicator />
      <main className="flex min-h-screen bg-slate-800">
        <div className="w-full h-full flex">
          <div className="w-[350px]">
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
