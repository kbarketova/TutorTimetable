import React from 'react';
import {SafeAreaView, StatusBar, ViewStyle} from 'react-native';

import {
  createDrawerNavigator,
  DrawerHeaderProps,
} from '@react-navigation/drawer';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Timetable} from './src/screens/Timetable';
import {StudentDetails} from './src/screens/StudentDetails';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {Colors} from './src/constants';
import {Login} from './src/screens/Login';
import {RootStackParamList} from './src/types';

const containerStyle: ViewStyle = {
  flex: 1,
};

const headerStyle: ViewStyle = {
  backgroundColor: 'white',
  paddingLeft: 10,
  paddingVertical: 5,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
};

const header = ({navigation}: DrawerHeaderProps): React.ReactNode => {
  return (
    <Icon
      name="menu"
      size={25}
      style={headerStyle}
      onPress={navigation.toggleDrawer}
    />
  );
};

const App = () => {
  const Drawer = createDrawerNavigator<RootStackParamList>();
  return (
    <GestureHandlerRootView style={containerStyle}>
      <SafeAreaView style={containerStyle}>
        <StatusBar barStyle={'light-content'} />
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Login"
            screenOptions={{
              header,
              drawerActiveBackgroundColor: Colors.sky,
              drawerActiveTintColor: 'white',
              drawerLabelStyle: {fontSize: 16},
            }}>
            <Drawer.Screen
              name="Timetable"
              component={Timetable}
              options={{title: 'Расписание'}}
            />
            <Drawer.Screen
              name="StudentDetails"
              component={StudentDetails}
              options={{title: 'Добавить ученика'}}
            />
            <Drawer.Screen
              name="Login"
              component={Login}
              options={{
                title: 'Выйти',
                headerShown: false,
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
