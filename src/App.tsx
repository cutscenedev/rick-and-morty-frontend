import { useLayoutEffect } from 'react';

import DependencyContainer from './DependencyContainer'
import { DependencyContextProvider } from './view/contexts/dependecyContext';
import Router from './view/router/Router';
import AppInitGuard from './view/components/AppInitGuard';

import './App.css';

function App() {
  const dependencyContainer = new DependencyContainer()

  useLayoutEffect(() => {
    dependencyContainer.appStore.initApp();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DependencyContextProvider value={dependencyContainer}>
      <AppInitGuard>
        <Router />
      </AppInitGuard>
    </DependencyContextProvider>
  );
}

export default App;
