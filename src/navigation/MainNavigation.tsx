import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from '../screen/onboarding/Onboarding';
import CreateAccount from '../screen/onboarding/CreateAccount';
import Login from '../screen/onboarding/Login';
import ResetPassword from '../screen/onboarding/ResetPassword';
import SetNewPassword from '../screen/onboarding/SetNewPassword';
import SelectAvatar from '../screen/onboarding/SelectAvatar';

export type RootStackParamList = {
  Onboarding: undefined,
  CreateAccount: undefined,
  Login: undefined;
  ResetPassword: undefined;
  SetNewPassword: undefined;
  SelectAvatar: undefined;
}

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Onboarding' component={Onboarding} options={{ headerShown: false }} />
        <Stack.Screen name='CreateAccount' component={CreateAccount} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='ResetPassword' component={ResetPassword} />
        <Stack.Screen name='SetNewPassword' component={SetNewPassword} />
        <Stack.Screen name='SelectAvatar' component={SelectAvatar} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation;