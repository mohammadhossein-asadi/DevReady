import { useEffect } from "react";

export function useVotesRealtime(onEvent: () => void) {
  useEffect(() => {
    let es: EventSource | null = null;
    let cancelled = false;
    function connect() {
      if (cancelled) return;
      es = new EventSource("/api/votes/stream");
      es.onmessage = () => onEvent();
      es.onerror = () => {
        es?.close();
        setTimeout(connect, 5000);
      };
    }
    connect();
    return () => { cancelled = true; es?.close(); };
  }, [onEvent]);
}