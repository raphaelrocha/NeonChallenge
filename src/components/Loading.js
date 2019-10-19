import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import colors from "../constants/colors";

export default class Loading extends Component{

  render () {
    return (
      <View style={[{ justifyContent: 'center', alignItems: 'center'},this.props.stylesContainer]}>
        <ActivityIndicator
          animating={true}
          color={colors.WHITE_1000}
          size={this.props.size ? this.props.size : 'large'}
          style={[{alignSelf: 'center',width: 50, height: 50},this.props.stylesIndicatior]} />
      </View>
    );
  }
}