import React from 'react';
import {SafeAreaView, StatusBar, ViewStyle} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Timetable} from './src/screens/Timetable';

const containerStyle: ViewStyle = {
  flex: 1,
};

const App = () => {
  return (
    <GestureHandlerRootView style={containerStyle}>
      <SafeAreaView style={containerStyle}>
        <StatusBar barStyle={'light-content'} />
        {/* <StudentDetails /> */}
        <Timetable />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
