import { useState } from 'react';
import { observer } from 'mobx-react';

import styles from './CharactersList.module.css'

import Character from './Character/Character';
import { Character as ICharacter } from '../../../../providers/characters/CharactersProvider';
import useDependency from '../../../hooks/useDependency';

interface Props {
  className?: string
  characters: ICharacter[]
  favoritesShown: boolean
}

function CharacterList({ characters, className, favoritesShown }: Props) {
  const { userStore } = useDependency();
  const [expandedCharacter, setExpandedCharacter] = useState<null | string>(null);

  function handleExpandCharacterClick(characterName: string) {
    if (characterName === expandedCharacter) {
      setExpandedCharacter(null);
    } else {
      setExpandedCharacter(characterName);
    }
  }

  const favoriteCharacters = userStore.user!.userSettings.favoriteCharacters;
  const charactersList = favoritesShown
    ? characters.filter(c => favoriteCharacters.includes(c.name))
    : characters;

  if (characters === null) return <>Characters loading...'</>;
  if (charactersList.length === 0) return <>No characters :(</>

  return (
    <>
      {charactersList.map(character => {
        const characterIsFavorite = favoriteCharacters.includes(character.name);

        async function handleFavoriteButtonClick() {
          const oldFavoriteCharacters = [...favoriteCharacters];
          if (characterIsFavorite) {
            await userStore.setNewFavoriteCharacters(oldFavoriteCharacters.filter(c => c !== character.name))
          } else {
            await userStore.setNewFavoriteCharacters([...oldFavoriteCharacters, character.name])
          }
        }

        return (
          <Character key={character.name} className={[styles.root, className].join(' ')}>
            <Character.Favorite
                className={styles.favoriteButton}
                size={32}
                selected={characterIsFavorite}
                onClick={handleFavoriteButtonClick}
              />
            <div className={styles.card}>
              <Character.Image
                src={character.image}
                className={styles.image}
                size={120}
              />
              <div className={styles.attributes}>
                <Character.Attribute name="Name">{character.name}</Character.Attribute>
                <Character.Attribute name="Species">{character.species}</Character.Attribute>
                <Character.Attribute name="Gender">{character.gender}</Character.Attribute>
                <Character.Attribute name="Origin">{character.origin.name}</Character.Attribute>
                <Character.Attribute name="Dimension">{character.origin.dimension}</Character.Attribute>
                <Character.Attribute name="Status">{character.status}</Character.Attribute>
              </div>
            </div>

            {expandedCharacter === character.name && (
              <Character.LatestEpisodes episodes={character.episode} />
            )}

            <Character.Button
              className={styles.expandButton}
              onClick={() => handleExpandCharacterClick(character.name)}
              secondary={expandedCharacter === character.name}
            >
              {expandedCharacter === character.name ? 'Less' : 'More'}
            </Character.Button>
          </Character>
      )})}
    </>
  )
}

export default observer(CharacterList);
