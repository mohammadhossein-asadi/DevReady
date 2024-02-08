"use client";

import { Component, ReactNode, ErrorInfo } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  fallbackTitle?: string;
  fallbackMessage?: string;
  fallbackDetails?: string;
  fallbackRetry?: string;
  fallbackGoHome?: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary] caught error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  handleHome = () => {
    window.location.hash = "#/home";
    this.setState({ hasError: false, error: null });
  };

  render() {
    const {
      fallbackTitle = "Something went wrong",
      fallbackMessage = "An unexpected error occurred. Please try again or go back home.",
      fallbackDetails = "Error details",
      fallbackRetry = "Try again",
      fallbackGoHome = "Go home",
    } = this.props;

    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          className="mx-auto max-w-md px-4 py-10 text-center"
        >
          <AlertCircle className="mx-auto size-12 text-destructive" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-semibold">{fallbackTitle}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {fallbackMessage}
          </p>
          {this.state.error && (
            <details className="mt-4 text-start">
              <summary className="text-xs font-medium text-muted-foreground cursor-pointer">
                {fallbackDetails}
              </summary>
              <pre className="mt-2 overflow-auto rounded bg-muted p-3 text-[11px] font-mono">
                {this.state.error.message}
                {this.state.error.stack && `\n\n${this.state.error.stack}`}
              </pre>
            </details>
          )}
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button onClick={this.handleRetry} className="min-h-10 gap-2">
              <RefreshCw className="size-4" aria-hidden="true" />
              {fallbackRetry}
            </Button>
            <Button variant="outline" onClick={this.handleHome} className="min-h-10 gap-2">
              <Home className="size-4" aria-hidden="true" />
              {fallbackGoHome}
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}