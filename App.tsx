import React, {useEffect} from 'react';
import Route from './src/Navigation/Route';
import {QueryClient, QueryClientProvider} from 'react-query';
import {
  checkApplicationPermission,
  notificationListner,
  requestUserPermission,
} from './src/apis/pushNotification/notification';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {ToastProvider} from 'react-native-toast-notifications';

const queryClient = new QueryClient();
const App = () => {
  useEffect(() => {
    requestUserPermission();
    notificationListner();
    checkApplicationPermission();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <Route />
          </ToastProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
