import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from "../constants/colors";
import TextMask from "react-native-masked-text/lib/text-mask";

export default class ContactItem extends Component{

    constructor(props) {
        super(props);

    }

    render(){

        let {item,lastItem,onPress} = this.props;

        let styleLastItem;

        let disabled = false;

        let value;

        if(lastItem){
            styleLastItem = {borderBottomWidth:0}
        }

        if(!onPress){
            disabled = true;
        }

        if(item.transferValue){
            value = parseFloat(item.transferValue).toFixed(2);
        }

        return (
            <TouchableOpacity
                disabled={disabled}
                style={[styles.container,styleLastItem]}
                onPress={()=> {
                    if(onPress){
                        onPress(item);
                    }
                }}>

                <View style={styles.avatarContainer}>

                    <Image
                        style={styles.avatar}
                        source={{uri:item.picture.large}}
                    />

                    <View
                        style={styles.avatarFrame}/>

                </View>

                <View style={styles.content}>

                    <Text style={styles.name}>
                        {this.props.item.name.first} {this.props.item.name.last}
                    </Text>

                    <Text style={styles.phone}>
                        {this.props.item.cell}
                    </Text>

                    {value
                        ?
                        <TextMask
                            style={styles.value}
                            value={value}
                            type={'money'}/>
                        :
                        null
                    }

                </View>

            </TouchableOpacity>
        );
    }

}

const frameWh = 70;
const avatarWh = frameWh - 3;

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
        height: frameWh,
        width: frameWh,
        borderRadius: frameWh/2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.ALPHA_GREY_46,
    },
    avatar:{
        height: avatarWh,
        width: avatarWh,
        borderRadius: avatarWh/2,
        resizeMode: 'contain',
    },
    avatarFrame:{
        position: 'absolute',
        height: frameWh,
        width: frameWh,
        borderRadius: frameWh/2,
        borderWidth:3,
        borderColor:colors.WHITE_1000,
    },
    content:{
        justifyContent: 'center',
        flex: 1,
        marginLeft: 10,
        marginRight: 5,
        width: '100%',
    },
    name:{
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.WHITE_1000,
    },
    phone:{
        marginTop: 5,
        color: colors.WHITE_1000,
    },
    value:{
        marginTop: 2,
        color: colors.WHITE_1000,
    }
});