import React from 'react';
import {View, StatusBar, Image, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Profile from "./src/modules/profile/Profile";
import SendMoney from "./src/modules/sendMoney/SendMoney";
import colors from "./src/constants/colors";
import TransferHistory from "./src/modules/transferHistory/TransferHistory";
import images from "./src/assets/images";

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

const styles = StyleSheet.create({
    rootView:{
        flex:1,
    },
    background:{
        tintColor: colors.BLUE_GREY_900,
        height: '100%',
        width: '100%',
        position: 'absolute',
        top:0,
        left:0,
        zIndex:0,
    },
});

export default App = () =>
    <View style={styles.rootView}>
        <Image
            style={styles.background}
            source={images.bgGrad}
        />
      <StatusBar barStyle="light-content" backgroundColor={colors.BLUE_GREY_900}/>
      <AppContent />
    </View>;