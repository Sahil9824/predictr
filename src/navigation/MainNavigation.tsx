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
      <Stack.Navigator screenOptions={{
        transitionSpec: {
          open: {
            animation: 'spring',
            config: {
              stiffness: 1000,
              damping: 500,
              mass: 3,
              overshootClamping: true,
              restDisplacementThreshold: 0.01,
              restSpeedThreshold: 0.01,
            },
          },
          close: {
            animation: 'spring',
            config: {
              stiffness: 1000,
              damping: 500,
              mass: 3,
              overshootClamping: true,
              restDisplacementThreshold: 0.01,
              restSpeedThreshold: 0.01,
            }
          }
        }
      }
      }
      >
        <Stack.Screen name='Onboarding' component={Onboarding} options={{ headerShown: false, gestureDirection: "horizontal" }} />
        <Stack.Screen name='CreateAccount' component={CreateAccount} options={{ gestureDirection: "horizontal" }} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='ResetPassword' component={ResetPassword} />
        <Stack.Screen name='SetNewPassword' component={SetNewPassword} />
        <Stack.Screen name='SelectAvatar' component={SelectAvatar} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation;