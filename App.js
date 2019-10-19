import React from 'react';
import {View, StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Profile from "./src/modules/profile/Profile";
import SendMoney from "./src/modules/sendMoney/SendMoney";
import colors from "./src/constants/colors";
import TransferHistory from "./src/modules/transferHistory/TransferHistory";

console.disableYellowBox = true;

const MainNavigator = createStackNavigator({
    Profile: {screen: Profile},
    SendMoney: {screen: SendMoney},
    TransferHistory: {screen: TransferHistory}
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
