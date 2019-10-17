import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Platform, Text } from 'react-native';
import images from "../../assets/images";

export default class Toolbar extends Component{

    constructor(props) {
        super(props);

    }

    render(){

        let {title} = this.props;

        if(title){
            title = title.toUpperCase();
        }

        return (
            <View style={styles.container}>

                <TouchableOpacity
                    onPress={()=>this.props.navigation.goBack()}
                    style={styles.backContainer}>

                    <Image
                        style={styles.backIcon}
                        source={images.chevronLeft}
                    />

                </TouchableOpacity>

                <View style={styles.titleContainer}>

                    <Text style={styles.title}>
                        {title}
                    </Text>

                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginTop:Platform.select({'ios':20}),
        height: 56,
        width: `100%`,
    },
    backContainer:{
        alignItems:'center',
        justifyContent:'center',
        height: '100%',
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
        marginRight: 30,
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});