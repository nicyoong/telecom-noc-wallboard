export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-base flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 rounded-full bg-brand-blue/10 border-2 border-brand-blue/30 flex items-center justify-center mx-auto mb-6">
          <span className="text-6xl font-bold text-brand-blue">404</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-base-muted text-lg mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/dashboard"
            className="px-6 py-3 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors font-medium"
          >
            Back to Dashboard
          </a>
          <a
            href="/topology"
            className="px-6 py-3 bg-base-surface border border-base-border text-white rounded-lg hover:bg-base-surface-light transition-colors"
          >
            View Topology
          </a>
        </div>
      </div>
    </div>
  );
}
