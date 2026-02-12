import { atom as jotaiAtom } from 'jotai';
import { atomFamily, atomWithReducer } from 'jotai/utils';

import GlobalStore from '@/components/state/GlobalStore';

async function resolveValue(value) {
  if (typeof value === 'function') {
    return value({
      get: GlobalStore.get,
      set: GlobalStore.set,
    });
  }

  return value;
}

const resolveValueSync = value => {
  if (typeof value === 'function') {
    return value({
      get: GlobalStore.get,
      set: GlobalStore.set,
    });
  }

  return value;
};

export const GlobalState = {
  translationsHashStore: {
    promise: null,
    loaded: false,
  },
};

export const allValuesSetResolver = (requiredCount = 3) => {
  let resolve;
  const valueSet = new Set();

  const promise = new Promise(res => {
    resolve = res;
  });

  return {
    setValue: val => {
      valueSet.add(val);
      if (valueSet.size >= requiredCount) {
        resolve(Array.from(valueSet));
      }
    },
    get promise() {
      return promise;
    },
  };
};

const GlobalStateHelper = {
  nativeElements: {
    atom: jotaiAtom,
  },
  valueAlreadySet: false,
  gsr: null,

  setupAtomSync: (key, defaultValue, store, subscribe, reducer, onFinish) => {
    const resolvedValue = resolveValueSync(defaultValue);

    let jotaiVersion;
    if (store[key].jotai) {
      GlobalStore.set(store[key].jotai, resolvedValue);
      jotaiVersion = store[key].jotai;
    } else {
      jotaiVersion = reducer ? atomWithReducer(resolvedValue, reducer) : jotaiAtom(resolvedValue);
    }

    let unsubscribe;
    if (subscribe) {
      unsubscribe = GlobalStore.sub(jotaiVersion, subscribe);
    }

    const set = newValue => {
      GlobalStore.set(jotaiVersion, newValue);
    };

    const get = () => GlobalStore.get(jotaiVersion);

    store[key] = {
      jotai: jotaiVersion,
      set,
      get,
      loaded: true,
      unsubscribe,
      promise: store[key]?.promise,
    };

    onFinish && onFinish(key);

    return store[key];
  },

  setupAtom: async (key, defaultValue, store, subscribe, reducer, onFinish, dependencies) => {
    if (dependencies?.length) {
      await Promise.all(dependencies.map(dep => dep.promise));
    }
    const resolvedValue = await resolveValue(defaultValue);

    return GlobalStateHelper.setupAtomSync(key, resolvedValue, store, subscribe, reducer, onFinish);
  },

  atom: (
    {
      key,
      default: defaultValue,
      type = 'sync',
      store,
      dependencies,
      subscribe,
      reducer,
      onFinish,
    },
  ) => {
    if (store[key]) {
      console.warn('Atom already exists with this key:', key);
    }
    store[key] = {
      promise: null,
    };
    if (type === 'async' || dependencies?.length) {
      store[key] = {
        jotai: jotaiAtom(null),
        set: newValue => {
          GlobalStore.set(store[key].jotai, newValue);
        },
        get: () => GlobalStore.get(store[key].jotai),
      };
      store[key].promise = GlobalStateHelper.setupAtom(
        key,
        defaultValue,
        store,
        subscribe,
        reducer,
        onFinish,
        dependencies,
      );
      return store[key].promise;
    }
    store[key] = GlobalStateHelper.setupAtomSync(key, defaultValue, store, subscribe, reducer);
    onFinish && onFinish(key);
    return store[key];
  },

  atomFamily: ({
    key,
    factory,
    areEqual,
    store,
  }) => {
    const jotaiVersion = atomFamily(factory, areEqual);
    store[key] = {
      jotai: jotaiVersion,
    };
    return store[key];
  },

  computedAtom: ({
    key,
    factory,
    store,
    dependencies,
  }) => {
    if (dependencies?.length) {
      return Promise.all(dependencies.map(dep => dep.promise)).then(() => {
        const jotaiVersion = jotaiAtom(factory);
        store[key] = {
          jotai: jotaiVersion,
          get: () => GlobalStore.get(jotaiVersion),
        };
      });
    }
    const jotaiVersion = jotaiAtom(factory);
    store[key] = {
      jotai: jotaiVersion,
      get: () => GlobalStore.get(jotaiVersion),
    };
    return store[key];
  },
};

GlobalStateHelper.gsr = allValuesSetResolver(3);

export default GlobalStateHelper;
