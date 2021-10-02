// Service Worker Helper
window.swNeedUpdate = null;

const SWHelper = {
  async getWaitingWorker() {
    const registrations = (await navigator?.serviceWorker?.getRegistrations()) || [];
    const registrationWithWaiting = registrations.find(reg => reg.waiting);
    return registrationWithWaiting?.waiting;
  },

  async skipWaiting() {
    return (await SWHelper.getWaitingWorker())?.postMessage({ type: 'SKIP_WAITING_WHEN_SOLO' });
  },

  async prepareCachesForUpdate() {
    return (await SWHelper.getWaitingWorker())?.postMessage({ type: 'PREPARE_CACHES_FOR_UPDATE' });
  },
};

export default SWHelper;
