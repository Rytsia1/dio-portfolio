"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * First sentence of the 404 page, naming the address that failed.
 *
 * The not-found page is prerendered once for every unmatched URL, so the
 * real path is only known in the browser. The server snapshot is a
 * generic sentence, which keeps hydration consistent.
 */
export function MissingPath() {
  const path = useSyncExternalStore(
    subscribe,
    () => window.location.pathname,
    () => null,
  );

  if (!path) return <>Nothing lives at this address.</>;

  return (
    <>
      Nothing lives at <code className="type-data break-all text-base text-fg">{path}</code>.
    </>
  );
}
