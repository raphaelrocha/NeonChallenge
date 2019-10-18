import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Toolbar from "../toolbar/Toolbar";
import colors from "../../constants/colors";

export default class Contacts extends Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getContacts();
    }

    getContacts = async () => {

    };

    backPress = () => {
        const {goBack} = this.props.navigation;
        goBack();
    };

    render(){
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