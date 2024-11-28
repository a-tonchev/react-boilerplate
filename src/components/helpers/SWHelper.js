// Service Worker Helper
window.swNeedUpdate = null;
window.swStartingTime = Date.now();

const SWHelper = {
  async getWaitingWorker() {
    const registrations = (await navigator?.serviceWorker?.getRegistrations()) || [];
    const registrationWithWaiting = registrations.find(reg => reg.waiting);
    return registrationWithWaiting?.waiting;
  },

  async skipWaiting() {
    return (await SWHelper.getWaitingWorker())?.postMessage({ type: 'SKIP_WAITING' });
  },

  async skipWaitingWhenSolo() {
    return (await SWHelper.getWaitingWorker())?.postMessage({ type: 'SKIP_WAITING_WHEN_SOLO' });
  },

  async prepareCachesForUpdate() {
    return (await SWHelper.getWaitingWorker())?.postMessage({ type: 'PREPARE_CACHES_FOR_UPDATE' });
  },

  async callNewServiceWorkerEvent() {
    window.swNeedUpdate = true;
    return (await SWHelper.getActiveWorker())?.postMessage({ type: 'OPEN_MESSAGE_DIALOG_ALL_CLIENTS' });
  },

  async getActiveWorker() {
    const [serviceWorkerRegistration] = (await navigator?.serviceWorker?.getRegistrations()) || [];
    return serviceWorkerRegistration?.active;
  },

  async reloadClients() {
    return (await SWHelper.getActiveWorker())?.postMessage({ type: 'RELOAD_CLIENTS' });
  },

  isNewAvailable() {
    return window.swNeedUpdate;
  },

  async forceRefreshSW() {
    return (await SWHelper.getActiveWorker())?.postMessage({ type: 'FORCE_REFRESH_SW' });
  },
};

export default SWHelper;
