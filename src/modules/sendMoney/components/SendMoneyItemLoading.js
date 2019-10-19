import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import colors from "../../../constants/colors";

export default class SendMoneyItemLoading extends Component{

    constructor(props) {
        super(props);

    }

    render(){
        return (
            <View style={styles.container}>
                <View
                    style={styles.avatar}
                />
                <View style={styles.content}>
                    <View style={styles.name}/>
                    <View style={styles.phone}/>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        margin: 5,
        backgroundColor: colors.ALPHA_GREY_46,
    },
    avatar:{
        borderRadius: 35,
        height: 70,
        width: 70,
        backgroundColor: colors.ALPHA_GREY_46
    },
    content:{
        flex: 1,
        margin: 5,
        width: '100%',
    },
    name:{
        marginTop: 5,
        width: '100%',
        height: 20,
        backgroundColor: colors.ALPHA_GREY_46
    },
    phone:{
        marginTop: 10,
        width: '70%%',
        height: 20,
        backgroundColor: colors.ALPHA_GREY_46
    }
});