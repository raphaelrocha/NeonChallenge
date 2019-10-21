import React, {Component} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from "../constants/colors";

export default class AlertModal extends Component{

    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        let {message,onPressConfirm,onPressCancel,cancelButtonText,confirmButtonText,type} = this.props;

        if(!confirmButtonText){
            confirmButtonText = 'OK';
        }

        let bgColor = {backgroundColor: colors.BLUE_700};

        if(type){
            if(type === 'alert'){
                bgColor = {backgroundColor: colors.BLUE_700};
            } else if (type === 'warning'){
                bgColor = {backgroundColor: colors.AMBER_700};
            } else if (type === 'error'){
                bgColor = {backgroundColor: colors.RED_700};
            }
        }

        return(
            <Modal
                transparent={true}
                visible={this.props.visible}>

                <View style={styles.container}>

                    <View style={[styles.content,bgColor]}>

                        <Text style={styles.message}>
                            {message}
                        </Text>

                        <View style={styles.buttons}>

                            {cancelButtonText
                                ?
                                <TouchableOpacity
                                    onPress={()=> onPressCancel()}
                                    style={styles.cancelButton}>

                                    <Text style={styles.cancelButtonText}>
                                        {cancelButtonText.toUpperCase()}
                                    </Text>

                                </TouchableOpacity>
                                :
                                null
                            }

                            <TouchableOpacity
                                onPress={()=> onPressConfirm()}
                                style={styles.confirmButton}>

                                <Text style={styles.confirmButtonText}>
                                    {confirmButtonText.toUpperCase()}
                                </Text>

                            </TouchableOpacity>

                        </View>

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
    buttons:{
        flexDirection:'row',
        width: '100%',
    },
    confirmButton:{
        marginLeft: 2,
        backgroundColor: colors.GREEN_400,
        flex: 1,
        alignItems: 'center',
        marginTop: 15,
        padding: 7,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.ALPHA_GREY_15
    },
    confirmButtonText:{
        fontWeight: 'bold',
        color: colors.WHITE_1000,
        fontSize: 16,
    },
    cancelButton:{
        marginRight: 2,
        backgroundColor: colors.GREY_400,
        flex: 1,
        alignItems: 'center',
        marginTop: 15,
        padding: 7,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.ALPHA_GREY_15
    },
    cancelButtonText:{
        fontWeight: 'bold',
        color: colors.WHITE_1000,
        fontSize: 16,
    },
    message:{
        color: colors.WHITE_1000,
        fontWeight: 'bold',
        fontSize: 20,
    }
});