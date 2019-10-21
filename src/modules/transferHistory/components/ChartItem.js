import React, {Component} from 'react';
import {FlatList, Image, StyleSheet, View, Text, RefreshControl, ScrollView} from 'react-native';
import colors from "../../../constants/colors";

export default class ChartItem extends Component {

    constructor(props) {
        super(props);

    }

    render(){
        let {item,index,lastItem} = this.props;

        let alt;
        if(index*10 <= 159){
            alt = {height: 150 - index*10};
        }

        let marginLeft;

        if(index === 0) {
            marginLeft = {marginLeft: 16};
        }

        let marginRight;

        if(lastItem){
            marginRight = {marginRight: 16};
        }

        return (
            <View style={[styles.container,marginLeft,marginRight]}>

                <View
                    style={styles.barContainer}>
                    <View style={[styles.bar,alt]}>

                        <View style={styles.valueContainer}>

                            <Text
                                numberOfLines={1}
                                ellipsizeMode={'tail'}
                                style={styles.value}>
                                {item.transferValue}
                            </Text>

                        </View>

                    </View>

                </View>

                <View style={styles.avatarContainer}>

                    <Image
                        style={styles.avatar}
                        source={{uri:item.picture.large}}
                    />

                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        margin: 2,
    },
    barContainer:{
        flex: 1,
        height: 50,
        alignItems: 'center',
    },
    bar:{
        position: 'absolute',
        bottom: 0,
        backgroundColor: colors.BLUE_700,
        width: 6,
        height: 50,
        borderTopRightRadius: 3,
        borderTopLeftRadius: 3
    },
    avatarContainer:{
        marginLeft: 10,
        marginRight: 10,
        alignSelf: 'flex-end',
        height: 42,
        width: 42,
        borderRadius: 42/2,
        borderWidth:3,
        borderColor:colors.BLUE_700,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.ALPHA_GREY_46,
    },
    avatar:{
        borderRadius: 38/2,
        height: 38,
        width: 38,
        resizeMode:'contain'
    },
    valueContainer:{
        alignSelf: 'center',
        backgroundColor: colors.BLUE_700,
        position: 'absolute',
        top:0,
        width: 62,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        borderRadius: 10,

    },
    value:{
        color: colors.WHITE_1000,
        textAlign: 'center',
        width:'100%',
        fontSize:10,
        borderRadius:5,
    }
});