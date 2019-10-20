import React, {Component} from 'react';
import {Image, StyleSheet, View, Modal, TouchableOpacity, Text} from 'react-native';
import colors from "../constants/colors";
import Loading from "./Loading";

export default class LoadingModal extends Component{

    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {

        return(
            <Modal
                transparent={true}
                visible={this.props.visible}>

                <View style={styles.container}>

                    <View style={styles.content}>

                        <Loading/>

                        <Text style={styles.message}>
                            Aguarde...
                        </Text>

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
        width: '80%',
        alignItems: 'center',
    },
    message:{
        color: colors.WHITE_1000,
        fontWeight: 'bold',
        fontSize: 20,
    }
});