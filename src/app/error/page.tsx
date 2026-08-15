export default function ServerErrorPage() {
  return (
    <div className="min-h-screen bg-base flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 rounded-full bg-status-critical/10 border-2 border-status-critical/30 flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-status-critical" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Server Error</h1>
        <p className="text-base-muted text-lg mb-8">
          An unexpected error occurred on the server. The NOC team has been notified.
        </p>
        <div className="space-y-4">
          <a
            href="/dashboard"
            className="block px-6 py-3 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors font-medium"
          >
            Back to Dashboard
          </a>
          <p className="text-sm text-base-muted">
            If the problem persists, please contact the NOC team at{' '}
            <a href="tel:+18006299284" className="text-brand-blue hover:underline">
              1-800-NOC-WATCH
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
