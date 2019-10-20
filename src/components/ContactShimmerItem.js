import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from "../constants/colors";

export default class ContactShimmerItem extends Component{

    constructor(props) {
        super(props);
    }

    render(){

        let {lastItem,value} = this.props;

        let styleLastItem;

        if(lastItem){
            styleLastItem = {borderBottomWidth:0}
        }
        return (
            <View style={[styles.container,styleLastItem]}>

                <View style={styles.avatarContainer}>

                    <View style={styles.avatar}/>

                </View>


                <View style={styles.content}>

                    <View style={styles.name}/>

                    <View style={styles.phone}/>

                    {value
                        ?
                        <View style={styles.value}/>
                        :
                        null
                    }

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 16,
        paddingBottom: 16,
        flexDirection: 'row',
        borderBottomWidth:2,
        borderColor: colors.WHITE_1000,
    },
    avatarContainer:{
        alignSelf: 'center',
        height: 70,
        width: 70,
        borderRadius: 35,
        borderWidth:3,
        borderColor:colors.WHITE_1000,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.ALPHA_GREY_46,
    },
    avatar:{
        borderRadius: 64/2,
        height: 64,
        width: 64,
        backgroundColor: colors.ALPHA_GREY_46
    },
    content:{
        justifyContent: 'center',
        flex: 1,
        marginLeft: 10,
        marginRight: 5,
        width: '100%',
    },
    name:{
        borderRadius: 5,
        width: '70%',
        height: 20,
        backgroundColor: colors.ALPHA_GREY_46
    },
    phone:{
        borderRadius: 5,
        marginTop: 5,
        width: '45%',
        height: 20,
        backgroundColor: colors.ALPHA_GREY_46
    },
    value:{
        borderRadius: 5,
        marginTop: 5,
        width: '30%',
        height: 20,
        backgroundColor: colors.ALPHA_GREY_46
    }
});