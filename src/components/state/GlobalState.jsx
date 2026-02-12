import { useAtomValue } from 'jotai';

export const useStoreValue = element => useAtomValue(element.jotai);

export const useStoreFamilyValue = (element, params) => useAtomValue(element.jotai(params));

// TODO: in the future just: useAtom(element.jotai)
export const useStoreState = element => [useAtomValue(element.jotai), element.set];

export const useSetStoreValue = element => element.set;

export default {};
