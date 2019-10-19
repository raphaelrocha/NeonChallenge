import React, {Component} from 'react';
import {Image, StyleSheet, View, Modal, TouchableOpacity, Text, TextInput} from 'react-native';
import colors from "../../../constants/colors";
import images from "../../../assets/images";

export default class SendMoneyModal extends Component{

    constructor(props) {
        super(props);
    }

    render () {

        let {data} = this.props;

        if(!data){
            return null;
        }

        return(
            <Modal
                transparent={true}
                visible={this.props.visible}>
                <View style={styles.container}>

                    <View style={styles.content}>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={this.props.onPressClose.bind(this)}>

                            <Image
                                style={styles.closeIcon}
                                source={images.close}
                            />

                        </TouchableOpacity>

                        <View style={styles.avatarContainer}>

                            <Image
                                style={styles.avatar}
                                source={{uri:data.picture.large}}
                            />

                        </View>

                        <Text style={styles.name}>
                            {data.name.first} {data.name.last}
                        </Text>

                        <Text style={styles.phone}>
                            {data.cell}
                        </Text>

                        <Text style={styles.valueLabel}>
                            Valor para enviar:
                        </Text>

                        <TextInput
                            value={'R$ 0,00'}
                            style={styles.inputValue}
                        />

                        <TouchableOpacity
                            style={styles.sendButton}>

                            <Text style={styles.sendButtonText}>
                                ENVIAR
                            </Text>

                        </TouchableOpacity>

                    </View>

                </View>
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.ALPHA_GREY_150,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content:{
        padding: 20,
        borderRadius: 20,
        backgroundColor: colors.LIGHT_BLUE_800,
        width: '80%',
        alignItems: 'center',
    },
    closeButton:{
        position: 'absolute',
        right:0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 50,
        width: 50,
    },
    closeIcon:{
        height: 30,
        width: 30,
        tintColor: colors.GREY_300,
        resizeMode: 'contain',
    },
    avatarContainer:{
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
    name:{
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.WHITE_1000,
    },
    phone:{
        fontSize: 18,
        marginTop: 5,
        color: colors.WHITE_1000,
    },
    valueLabel:{
        fontSize: 16,
        marginTop: 20,
        color: colors.WHITE_1000,
    },
    inputValue:{
        padding: 8,
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 10,
        width: '100%',
        fontWeight: 'bold',
        fontSize: 30,
        color: colors.GREEN_300,
        backgroundColor: colors.WHITE_1000
    },
    sendButton:{
        backgroundColor: colors.CYAN_500,
        width: '100%',
        alignItems: 'center',
        marginTop: 15,
        padding: 8,
        borderRadius: 15,

    },
    sendButtonText:{
        fontWeight: 'bold',
        color: colors.WHITE_1000,
        fontSize: 20,

    }
});