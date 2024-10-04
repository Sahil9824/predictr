import 'react-native-gesture-handler';
import App from './app';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastProvider } from 'react-native-toast-notifications'
import { Images } from './assets/images';
import { Image, Text, View } from 'react-native';
import { Colors, fonts } from './constant';


const Setup = () => {

  return (
    <Provider store={store}>
      {/*<PersistGate persistor={persistor}>*/}
      <ToastProvider
        placement='top'
        renderToast={(toast) => (
          <View style={{ flexDirection: "row", height: 40, width: 180, backgroundColor: Colors.textBlack, borderRadius: 12, justifyContent: "center", alignItems: "center", marginVertical: 10 }}>
            <Image source={Images.greenTick} style={{ width: 20, height: 20, marginRight: 6 }} />
            <Text style={{ fontFamily: fonts.f400, fontSize: 15, lineHeight: 21, color: Colors.white }} >{toast.message}</Text>
          </View>
        )
        }
      >
        <App />
      </ToastProvider>
      {/*</PersistGate>*/}
    </Provider>
  )
}

export default Setup;