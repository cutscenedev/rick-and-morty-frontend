import { useLocalObservable } from "mobx-react"

import CharactersStore from "./CharactersStore";
import useDependency from "../../hooks/useDependency";

const useStore = (): CharactersStore => {
  const { charactersProvider } = useDependency();

  const store = useLocalObservable(() => new CharactersStore(charactersProvider));

  return store;
}

export default useStore;
