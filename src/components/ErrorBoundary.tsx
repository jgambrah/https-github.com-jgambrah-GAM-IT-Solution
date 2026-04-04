import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorDetails = null;
      try {
        if (this.state.error?.message) {
          errorDetails = JSON.parse(this.state.error.message);
        }
      } catch {
        // Not a JSON error
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 p-8 border border-gray-100 text-center">
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-500 font-medium mb-8">
              {errorDetails ? 'A database permission error occurred.' : 'An unexpected error occurred while rendering this page.'}
            </p>

            {errorDetails && (
              <div className="bg-gray-50 rounded-2xl p-4 mb-8 text-left overflow-hidden">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Error Context</p>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-600"><span className="text-gray-400">Op:</span> {errorDetails.operationType}</p>
                  <p className="text-xs font-bold text-gray-600"><span className="text-gray-400">Path:</span> {errorDetails.path}</p>
                  <p className="text-xs font-bold text-gray-600 truncate"><span className="text-gray-400">User:</span> {errorDetails.authInfo?.email || 'Anonymous'}</p>
                </div>
              </div>
            )}

            <button
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
