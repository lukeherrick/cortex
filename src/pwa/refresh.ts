/**
 * Reload once when a new service worker takes over the page.
 *
 * The worker is built with skipWaiting and clientsClaim, so a new version
 * activates and claims this page as soon as it is downloaded. The page it
 * claims, though, is still running the markup, script and styles it loaded
 * from the old cache. Nothing reloads it.
 *
 * The practical effect is that every deploy looks like it did not happen:
 * opening the app serves the old version while the new one downloads in the
 * background, and only a second, manual refresh shows the change. That is a
 * terrible way to find out whether your own work shipped, and on a phone
 * nobody thinks to refresh twice.
 *
 * `controllerchange` also fires on the very first install, when there was no
 * previous controller and the page is already the newest thing there is.
 * Reloading then would be a pointless flash on a first visit, so the listener
 * only acts when a controller was already in place when the page started.
 */
export interface RefreshDeps {
  container: Pick<
    ServiceWorkerContainer,
    'addEventListener' | 'controller'
  > | null;
  reload: () => void;
}

export function installRefreshOnUpdate({ container, reload }: RefreshDeps): void {
  if (!container) return;

  const hadController = Boolean(container.controller);
  let done = false;

  container.addEventListener('controllerchange', () => {
    // First install: there is no stale page to replace.
    if (!hadController || done) return;
    done = true;
    reload();
  });
}
