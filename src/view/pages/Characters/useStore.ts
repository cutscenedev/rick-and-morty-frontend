import { useLocalObservable } from "mobx-react-lite"

import CharactersStore from "./CharactersStore";
import useDependency from "../../hooks/useDependency";

const useStore = (): CharactersStore => {
  const { charactersProvider, userStore } = useDependency();

  const store = useLocalObservable(() => new CharactersStore(charactersProvider, userStore));

  return store;
}

export default useStore;
