import React, { useEffect, useState } from 'react';

import './App.css';

interface Character {
  name: string
}

interface User {
  userName: string
  userSettings: {
    favoriteCharacters: string[]
  }
}

function App() {
  const [characters, setCharacters] = useState<null | Character[]>(null);
  const [user, serUser] = useState<null | User>(null);

  const userName = `userName-27`;
  const newFavoriteCharacters = new Array(5).fill(1).map((c, i) => `${i}`)

  async function updateFavoriteCharacters() {
    const response = await fetch('http://localhost:4000/graphql/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        query: `mutation UpdateFavoriteCharacters($userName: String!, $newFavoriteCharacters: [String!]!) {
          updateFavoriteCharacters(userName: $userName, newFavoriteCharacters: $newFavoriteCharacters) {
            userName
            userSettings {
              favoriteCharacters
            }
          }
        }`,
        variables: { userName, newFavoriteCharacters }
      }),
    }).then(r => r.json());

    serUser(response.data.updateFavoriteCharacters);
  }

  async function login() {
    const response = await fetch('http://localhost:4000/graphql/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        query: `mutation Login($userName: String!) {
          login(userName: $userName) {
            userName
            userSettings {
              favoriteCharacters
            }
          }
        }`,
        variables: { userName }
      }),
    }).then(r => r.json());

    serUser(response.data.login);
  }

  async function loadCharacters() {
    const response = await fetch('http://localhost:4000/graphql/ramproxy', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        query: `{
          characters(page: 1) {
            results {
              image
              name
              species
              gender
              status
              origin {
                name
                dimension
              }
              episode {
                name
                air_date
              }
            }
          }
        }`,
      }),
    }).then(r => r.json());

    setCharacters(response.data.characters.results)
  }

  useEffect(() => {
    (async () => {
      await login();
      await loadCharacters();
      await updateFavoriteCharacters();
    })()
  }, [])

  return (
    <div className="App">
      CHARACTERS: {characters !== null && characters.map(c => c.name)}
      <br />
      USER: {user?.userName}
      <br />
      chars: {user?.userSettings.favoriteCharacters.map(c => c)}
    </div>
  );
}

export default App;
