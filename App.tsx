import React from 'react';
import Route from './src/Navigation/Route';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Route />
    </QueryClientProvider>
  );
};

export default App;
