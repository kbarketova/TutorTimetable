import React from 'react';
import {SafeAreaView, StatusBar, ViewStyle} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Timetable} from './src/screens/Timetable';
import {StudentDetails} from './src/screens/StudentDetails';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {Colors} from './src/constants';

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

const header = ({navigation}): React.ReactNode => {
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
  const Drawer = createDrawerNavigator();
  return (
    <GestureHandlerRootView style={containerStyle}>
      <SafeAreaView style={containerStyle}>
        <StatusBar barStyle={'light-content'} />
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="App"
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
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
