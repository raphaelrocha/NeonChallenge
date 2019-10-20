import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
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

        if(lastItem){
            styleLastItem = {borderBottomWidth:0}
        }

        if(!onPress){
            disabled = true;
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

                </View>

                <View style={styles.content}>

                    <Text style={styles.name}>
                        {this.props.item.name.first} {this.props.item.name.last}
                    </Text>

                    <Text style={styles.phone}>
                        {this.props.item.cell}
                    </Text>

                    {item.transferValue
                        ?
                        <TextMask
                            style={styles.value}
                            value={item.transferValue}
                            type={'money'}/>
                        :
                        null
                    }

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
        resizeMode: 'contain',
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