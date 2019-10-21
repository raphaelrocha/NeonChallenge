import React, {Component} from 'react';
import {Image, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from "../../../constants/colors";
import images from "../../../assets/images";
import TextInputMask from "react-native-masked-text/lib/text-input-mask";
import {replaceAll} from "../../../helpers/tools";
import SendMoneyController from "../controller/SendMoneyController";

export default class SendMoneyModal extends Component{

    constructor(props) {
        super(props);
        this.state = {
            text:'R$0,00',
            value:0,
            disabled:true};
    }

    render () {
        let {data,onPressClose,onPressSend} = this.props;

        let {text,value,disabled} = this.state;

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
                            onPress={onPressClose.bind(this)}>

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

                        <TextInputMask
                            keyboardType={ 'number-pad' }
                            multiline={false}
                            maxLength={13}
                            numberOfLines={1}
                            placeholder={'R$0,00'}
                            style={styles.inputValue}
                            type={'money'}
                            value={text}
                            onChangeText={ (text) => {
                                text = replaceAll(text,'R$','');
                                text = replaceAll(text,'.','');
                                text = replaceAll(text,',','.');
                                let value = parseFloat(text);
                                let disabled = false;
                                if(value===0){
                                    disabled = true;
                                }
                                this.setState({ text,value,disabled });
                            }}
                        />

                        <TouchableOpacity
                            disabled={disabled}
                            onPress={()=> {
                                SendMoneyController.getInstance().setTo(data);
                                SendMoneyController.getInstance().setValueInvoice(value);
                                onPressSend()
                            }}
                            style={[styles.sendButton,disabled?styles.disabledSendButton:undefined]}>

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
        backgroundColor: colors.BLUE_700,
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
        tintColor: colors.WHITE_1000,
        resizeMode: 'contain',
    },
    avatarContainer:{
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
    name:{
        marginTop: 5,
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
        fontSize: 24,
        color: colors.CYAN_500,
        backgroundColor: colors.WHITE_1000
    },
    sendButton:{
        backgroundColor: colors.GREEN_400,
        width: '100%',
        alignItems: 'center',
        marginTop: 15,
        padding: 8,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.ALPHA_GREY_15
    },
    sendButtonText:{
        fontWeight: 'bold',
        color: colors.WHITE_1000,
        fontSize: 20,
    },
    disabledSendButton:{
        backgroundColor: colors.GREY_400,
    }
});