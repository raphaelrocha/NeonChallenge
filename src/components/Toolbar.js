import React, {Component} from 'react';
import {Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import images from "../assets/images";
import colors from "../constants/colors";

export const DARK = 'dark-contect';
export const LIGHT = 'light-contect';

export default class Toolbar extends Component{

    constructor(props) {
        super(props);
    }

    render(){

        let {title,backgroundColor,barStyle} = this.props;

        if(!barStyle){
            barStyle = DARK;
        }

        let iconColor;
        let titleColor;

        if(barStyle === LIGHT){
            iconColor = {tintColor:colors.WHITE_1000}
            titleColor = {color:colors.WHITE_1000}
        }

        if(title){
            title = title.toUpperCase();
        }

        return (
            <View style={[styles.container,{backgroundColor}]}>

                <TouchableOpacity
                    onPress={()=>this.props.navigation.goBack()}
                    style={styles.backContainer}>

                    <Image
                        style={[styles.backIcon,iconColor]}
                        source={images.chevronLeft}
                    />

                </TouchableOpacity>

                <View style={styles.titleContainer}>

                    <Text style={[styles.title,titleColor]}>
                        {title}
                    </Text>

                </View>

            </View>
        );
    }

}



const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.WHITE_1000,
        flexDirection:'row',
        marginTop:Platform.select({'ios':20}),
        height: 56,
        width: `100%`,
    },
    backContainer:{
        alignItems:'center',
        justifyContent:'center',
        height: '100%',
        width:50,
    },
    backIcon:{
        height:30,
        width: 30,
        resizeMode: 'contain',
    },
    titleContainer:{
        flex: 1,
        height: '100%',
        alignItems:'center',
        justifyContent:'center',
        marginRight: 50,
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});