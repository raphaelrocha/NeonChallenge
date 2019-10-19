import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export default class SendMoneyItem extends Component{

    constructor(props) {
        super(props);

    }

    render(){
        return (
            <View>
                <Text>
                    {this.props.item.name.first}
                </Text>
            </View>
        );
    }

}