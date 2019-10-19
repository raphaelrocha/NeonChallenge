import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import colors from "../../constants/colors";
import images from "../../assets/images";
import Toolbar, {LIGHT} from "../../components/Toolbar";

export default class TransferHistory extends Component{

    constructor(props) {
        super(props);

    }

    render () {
        return (
            <View style={styles.container}>

                <Image
                    style={styles.background}
                    source={images.bgGrad}
                />

                <Toolbar
                    navigation={this.props.navigation}
                    title='HISTORICO DE ENVIOS'
                    barStyle={LIGHT}
                />

            </View>
        );
    }

}
const styles = StyleSheet.create({
    container:{
        height: '100%',
        flexDirection: 'column',
    },
    background:{
        tintColor: colors.BLUE_900,
        height: '100%',
        width: '100%',
        position: 'absolute',
        top:0,
        left:0,
        zIndex:0,
    },
});
