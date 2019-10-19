import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import colors from "../../../constants/colors";

export default class SendMoneyItem extends Component{

    constructor(props) {
        super(props);

    }

    render(){

        let {item,lastItem} = this.props;

        let styleLastItem;

        if(lastItem){
            styleLastItem = {borderBottomWidth:0}
        }

        return (
            <TouchableOpacity style={[styles.container,styleLastItem]}>

                <View style={styles.avatarContainer}>

                    <Image
                        style={styles.avatar}
                        source={{uri:item.picture.large}}
                    />

                </View>

                <View style={styles.content}>

                    <Text style={styles.name}>
                        {this.props.item.name.first} {this.props.item.name.last}
                    </Text>

                    <Text style={styles.phone}>
                        {this.props.item.cell}
                    </Text>

                </View>

            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        paddingTop: 16,
        paddingBottom: 16,
        flexDirection: 'row',
        borderBottomWidth:2,
        borderColor: colors.LIGHT_BLUE_400,
    },
    avatarContainer:{
        alignSelf: 'center',
        height: 70,
        width: 70,
        borderRadius: 35,
        borderWidth:3,
        borderColor:colors.LIGHT_BLUE_300,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.ALPHA_GREY_46,
    },
    avatar:{
        borderRadius: 64/2,
        height: 64,
        width: 64,
        resizeMode: 'contain',
    },
    content:{
        justifyContent: 'center',
        flex: 1,
        marginTop: 5,
        marginLeft: 10,
        marginBottom: 5,
        marginRight: 5,
        width: '100%',
    },
    name:{
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.LIGHT_BLUE_200,
    },
    phone:{
        marginTop: 5,
        color: colors.LIGHT_BLUE_200,
    }
});