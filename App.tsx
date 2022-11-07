import React from 'react';
import {SafeAreaView, StatusBar, ViewStyle} from 'react-native';
import {StudentDetails} from './src/screens/StudentDetails';

const containerStyle: ViewStyle = {
  flex: 1,
};

const App = () => {
  return (
    <SafeAreaView style={containerStyle}>
      <StatusBar barStyle={'light-content'} />
      <StudentDetails />
    </SafeAreaView>
  );
};

export default App;
