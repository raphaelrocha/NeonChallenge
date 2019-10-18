import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import LoadData from "../../__mock__/LoadData";

export default class Profile extends Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let loadData = new LoadData();
        loadData.start()
            .then(result=>{
                console.log('resultado do load data',result);
            })
            .catch(error=>{
                console.log('erro do load data',error);
            })
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
});

