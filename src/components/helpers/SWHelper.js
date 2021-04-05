// Service Worker Helper
window.swNeedUpdate = null;

const SWHelper = {
  async getWaitingWorker() {
    const registrations = await navigator?.serviceWorker?.getRegistrations() || [];
    const registrationWithWaiting = registrations.find(reg => reg.waiting);
    return registrationWithWaiting?.waiting;
  },

  async skipWaiting() {
    return (await SWHelper.getWaitingWorker())?.postMessage({ type: 'SKIP_WAITING_WHEN_SOLO' });
  },

  async prepareCachesForUpdate() {
    const newSw = localStorage.getItem('swInstalling');
    if (newSw) {
      localStorage.removeItem('swInstalling');
      return (await SWHelper.getWaitingWorker())?.postMessage({ type: 'PREPARE_CACHES_FOR_UPDATE' });
    }
  },

  callInstallingEvent() {
    localStorage.setItem('swInstalling', 'true');
  },

  callNewServiceWorkerEvent() {
    window.swNeedUpdate = true;
  },
};

export default SWHelper;
