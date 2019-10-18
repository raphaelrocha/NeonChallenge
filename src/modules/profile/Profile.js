import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import GetProfile from "./commands/GetProfile";

export default class Profile extends Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getProfile();
    }

    getProfile = async () => {
        try {
            let command = new GetProfile();
            let result = await command.execute();
            console.log('NA TELA',result);
        }catch (e) {
            console.warn('NA TELA',e);
        }
    };

    goToContacts = () => {
        const {navigate} = this.props.navigation;
        navigate('Contacts', {name: 'Jane'})
    };

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={this.goToContacts.bind(this)}
                >
                    <Text>
                        Tela de perfil
                    </Text>
                </TouchableOpacity>

            </View>);
    }

}

const styles = StyleSheet.create({
    container:{
        marginTop:20,
    }
})

