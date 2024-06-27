import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import styles from './Characters.module.css'

import useDependency from '../../hooks/useDependency';
import Button from '../../components/library/Button/Button';
import useStore from './useStore';
import CharactersList from './CharactersList/CharactersList';

function Characters() {
  const { userStore } = useDependency();
  const store = useStore();

  const [favoritesShown, setFavoritesShown] = useState(false);

  function handleShowFavoritesButtonClicked() {
    setFavoritesShown(!favoritesShown);
  }

  useEffect(() => {
    store.loadCharacters();
  }, [store])

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h3>
          Hello, {userStore.user?.userName}!
        </h3>
        <Button
          secondary
          onClick={() => userStore.logout()}
          >
          Logout
        </Button>
      </header>
      <main className={styles.main}>
        <aside className={styles.mainHeader}>
          <h2>Characters</h2>
          <Button
            secondary={!favoritesShown}
            onClick={handleShowFavoritesButtonClicked}
          >
            {favoritesShown
              ? 'Show all'
              : 'Show favorites only'
            }
          </Button>
        </aside>
        {store.characters && (
          <CharactersList characters={store.characters} favoritesShown={favoritesShown} />
        )}
      </main>
    </div>
  )
};

export default observer(Characters);
