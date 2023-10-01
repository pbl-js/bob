export default function Home() {
  return (
    <main className="flex min-h-screen bg-slate-800">
      <div className="w-full h-full flex">
        <div className="w-[350px]"></div>
        <iframe
          className="block w-full h-[80vh] border-none"
          src="http://localhost:4444"
          title="Iframe dashboard"
          id="cms-editor-iframe"
        />
        <div className="w-[200px]"></div>
      </div>
    </main>
  );
}
