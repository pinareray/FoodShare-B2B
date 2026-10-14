"use client";

import { HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr";
import { useEffect, useRef, useState } from "react";

export type ConnectionStatus = "connecting" | "connected" | "reconnecting" | "disconnected";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HubEventHandlers = Record<string, (...args: any[]) => void>;

const START_RETRY_DELAY_MS = 5_000;

/**
 * Connects to a SignalR hub and subscribes to the given server events.
 * Event names are read once per connection; handler implementations may change between renders.
 */
export function useSignalR(hubUrl: string, handlers: HubEventHandlers): ConnectionStatus {
  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const handlersRef = useRef(handlers);

  useEffect(() => {
    handlersRef.current = handlers;
  });

  useEffect(() => {
    let disposed = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const connection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Warning)
      .build();

    for (const eventName of Object.keys(handlersRef.current)) {
      connection.on(eventName, (...args: unknown[]) => handlersRef.current[eventName]?.(...args));
    }

    const start = async () => {
      try {
        await connection.start();
        if (!disposed) setStatus("connected");
      } catch {
        if (disposed) return;
        setStatus("disconnected");
        // withAutomaticReconnect only covers dropped connections, not a failed initial start.
        retryTimer = setTimeout(start, START_RETRY_DELAY_MS);
      }
    };

    connection.onreconnecting(() => setStatus("reconnecting"));
    connection.onreconnected(() => setStatus("connected"));
    connection.onclose(() => {
      if (disposed) return;
      setStatus("disconnected");
      retryTimer = setTimeout(start, START_RETRY_DELAY_MS);
    });

    start();

    return () => {
      disposed = true;
      clearTimeout(retryTimer);
      if (connection.state !== HubConnectionState.Disconnected) {
        connection.stop().catch(() => undefined);
      }
    };
  }, [hubUrl]);

  return status;
}
