import React, { useEffect } from 'react';

import './App.css';

function App() {
  useEffect(() => {
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: "{ hello }" }),
    })
      .then(r => r.json())
      .then(data => console.log("data returned:", data))
  }, []);

  return (
    <div className="App">
      test
    </div>
  );
}

export default App;
