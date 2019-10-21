import React, {Component} from 'react';
import {FlatList, Image, StyleSheet, View, Text, RefreshControl, ScrollView} from 'react-native';
import colors from "../../../constants/colors";
import ChartItem from "./ChartItem";

export default class TransferChart extends Component{

    constructor(props) {
        super(props);

    }

    listEmptyComponent = () => {
        return null;
    };

    renderItem = (item, index) => {
        let {data} = this.props;
        return (
            <ChartItem
                index={index}
                lastItem={index === data.length-1}
                item={item}/>
        );
    };

    render(){

        let {data} = this.props;

        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.list}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={ (item, index) => index.toString() }
                    data={data}
                    ListEmptyComponent={this.listEmptyComponent.bind(this)}
                    renderItem={ ({ item, index }) => this.renderItem(item,index) }
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.APLHA_WHITE_157,
        height: 200,
    },
    list:{
        flex: 1,
    },
});