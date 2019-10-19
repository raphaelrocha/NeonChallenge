import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Toolbar, {LIGHT} from "../toolbar/Toolbar";
import colors from "../../constants/colors";
import images from "../../assets/images";

export default class SendMoney extends Component{

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
            <View style={styles.container}>

                <Image
                    style={styles.background}
                    source={images.bgGrad}
                />

                <Toolbar
                    navigation={this.props.navigation}
                    title='ENVIAR DINHEIRO'
                    barStyle={LIGHT}
                />

            </View>);
    }
}

const styles = StyleSheet.create({
    container:{
        height: '100%',
        flexDirection: 'column',
    },
    background:{
        tintColor: colors.BLUE_900,
        height: '100%',
        width: '100%',
        position: 'absolute',
        top:0,
        left:0,
        zIndex:0,
    },
});