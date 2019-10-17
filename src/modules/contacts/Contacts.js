import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Toolbar from "../toolbar/Toolbar";
import colors from "../../constants/colors";

export default class Contacts extends Component{

    constructor(props) {
        super(props);

    }

    backPress = () => {
        const {goBack} = this.props.navigation;
        goBack();
    };

    render(){
        console.warn(this.props.navigation);
        return (
            <View>
                <Toolbar
                    navigation={this.props.navigation}
                    title='Contatos'
                    backgroundColor={colors.BLUE_200}
                />
                <TouchableOpacity
                    onPress={this.backPress.bind(this)}
                >
                    <Text>
                        Tela de contatos
                    </Text>
                </TouchableOpacity>

            </View>);
    }
}