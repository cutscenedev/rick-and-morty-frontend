import React, { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);

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
    loadCharacters()
  }, [])

  return (
    <div className="App">
      test
    </div>
  );
}

export default App;
