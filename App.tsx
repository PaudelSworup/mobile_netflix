import React, {useEffect} from 'react';
import Route from './src/Navigation/Route';
import {QueryClient, QueryClientProvider} from 'react-query';
import {
  notificationListner,
  requestUserPermission,
} from './src/apis/pushNotification/notification';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';

const queryClient = new QueryClient();
const App = () => {
  useEffect(() => {
    requestUserPermission();
    notificationListner();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Route />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
