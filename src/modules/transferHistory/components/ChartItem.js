import React, {Component} from 'react';
import {FlatList, Image, StyleSheet, View, Text, RefreshControl, ScrollView} from 'react-native';

export default class ChartItem extends Component {

    constructor(props) {
        super(props);

    }

    render(){
        let {item} = this.props;

        return (
            <View style={styles.container}>

                <Text>
                    {item.name.first}
                </Text>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'red',
        margin: 2,
        width: 80,
    }
});