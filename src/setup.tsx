import 'react-native-gesture-handler';
import App from './app';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastProvider } from 'react-native-toast-notifications'


const Setup = () => {
  return (
    <Provider store={store}>
      {/*<PersistGate persistor={persistor}>*/}
      <ToastProvider >
        <App />
      </ToastProvider>
      {/*</PersistGate>*/}
    </Provider>
  )
}

export default Setup;