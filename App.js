import React from 'react';
import {View, StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Profile from "./src/modules/profile/Profile";
import Contacts from "./src/modules/contacts/Contacts";
import colors from "./src/constants/colors";

console.disableYellowBox = true;

const MainNavigator = createStackNavigator({
  Profile: {screen: Profile},
  Contacts: {screen: Contacts},
},{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

const AppContent = createAppContainer(MainNavigator);

export default App = () =>
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor={colors.BLUE_900}/>
      <AppContent />
    </View>;
