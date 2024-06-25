import { useLayoutEffect } from 'react';


import './App.css';

import DependencyContainer from './DependencyContainer'
import { DependencyContextProvider } from './view/contexts/dependecyContext';
import Router from './view/router/Router';
import AppInitGuard from './view/components/AppInitGuard';

function App() {
  const dependencyContainer = new DependencyContainer()

  useLayoutEffect(() => {
    dependencyContainer.appStore.initApp();
  }, []);

  return (
    <div id="app">
      <DependencyContextProvider value={dependencyContainer}>
        <AppInitGuard>
          <Router />
        </AppInitGuard>
      </DependencyContextProvider>
    </div>
  );
}

export default App;
