import React, {Component} from 'react';
import {FlatList, Image, StyleSheet, View, Text, RefreshControl, ScrollView} from 'react-native';
import colors from "../../../constants/colors";

export default class ChartItem extends Component {

    constructor(props) {
        super(props);

    }

    render(){
        let {item,index,lastItem} = this.props;

        let height;
        if(index*10 <= 140){
            height = {height: 140 - index*10};
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
                    <View style={[styles.bar,height]}>

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
        width:80,
    },
    barContainer:{
        flex: 1,
        height: 50,
        alignItems: 'center',
    },
    bar:{
        position: 'absolute',
        bottom: 0,
        backgroundColor: colors.WHITE_1000,
        width: 6,
        height: 50,
        borderTopRightRadius: 3,
        borderTopLeftRadius: 3
    },
    avatarContainer:{
        marginLeft: 10,
        marginRight: 10,
        alignSelf: 'center',
        height: 42,
        width: 42,
        borderRadius: 42/2,
        borderWidth:3,
        borderColor:colors.WHITE_1000,
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
        backgroundColor: colors.WHITE_1000,
        position: 'absolute',
        top:0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 10,

    },
    value:{
        fontWeight: 'bold',
        color: colors.GREY_900,
        textAlign: 'center',
        width:'100%',
        fontSize:10,
        borderRadius:5,
    }
});