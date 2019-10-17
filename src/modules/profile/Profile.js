import React, {Component} from 'react';
import {Text, View} from "react-native";

export default class Profile extends Component{

    static navigationOptions = {
        title: 'Perfil',
    };

    constructor(props) {
        super(props);

    }

    render(){
        return (
            <View>
                <Text>
                    Tela de perfil
                </Text>
            </View>);
    }

}

