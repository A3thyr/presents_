// пока что это про hof для стора, ибо нужно будет имплементировать реквест отдельных коллекций различными реквестами

import { useCollectionToggleStore } from "./use-collection-toggle.store";

export function useCollectionToggle() {
  const { collection, setCollection } = useCollectionToggleStore();
  return { collection, setCollection };
}
