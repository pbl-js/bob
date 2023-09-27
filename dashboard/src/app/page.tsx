import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-24 bg-slate-800">
      <iframe
        className="block w-full h-[80vh] border-none"
        src="http://localhost:4444"
        title="Iframe dashboard"
        id="cms-editor-iframe"
      />
    </main>
  );
}
