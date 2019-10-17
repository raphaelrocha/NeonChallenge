import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from "react-native";

export default class Profile extends Component{

    constructor(props) {
        super(props);
    }

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

