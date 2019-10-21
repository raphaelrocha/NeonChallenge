import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import colors from "../../../constants/colors";
import _ from "lodash";

export default class ChartItem extends Component {

    constructor(props) {
        super(props);

    }

    calculateHeigthBar = (value) => {

        let height = 30;

        if(_.inRange(value , 0 , 100.00)){
            height = 30;
        }
        else if(_.inRange(value , 100 , 200)){
            height = 40;
        }
        else if(_.inRange(value , 200 , 300)){
            height = 50;
        }
        else if(_.inRange(value , 300 , 400)){
            height = 55;
        }
        else if(_.inRange(value , 400 , 500)){
            height = 60;
        }
        else if(_.inRange(value , 500 , 600)){
            height = 65;
        }
        else if(_.inRange(value , 600 , 700)){
            height = 70;
        }
        else if(_.inRange(value , 700 , 800)){
            height = 75;
        }
        else if(_.inRange(value , 800 , 900)){
            height = 80;
        }
        else if(_.inRange(value , 900 , 1000)){
            height = 90;
        }
        else if(_.inRange(value , 1000 , 10000)){
            height = 100;
        }
        else{
            height = 140;
        }

        return {height};
    };

    render(){
        let {item,index,lastItem} = this.props;

        let value = parseFloat(item.transferValue).toFixed(2);

        let height = this.calculateHeigthBar(value);

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
                                {value}
                            </Text>

                        </View>

                    </View>

                </View>

                <View style={styles.avatarContainer}>

                    <Image
                        style={styles.avatar}
                        source={{uri:item.picture.large}}
                    />

                    <View
                        style={styles.avatarFrame}/>

                </View>

            </View>
        );
    }
}

const frameWh = 45;
const avatarWh = frameWh - 5;

const styles = StyleSheet.create({
    container:{
        margin: 2,
        width:70,
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
        alignSelf: 'center',
        height: frameWh,
        width: frameWh,
        borderRadius: frameWh/2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.ALPHA_GREY_46,
    },
    avatar:{
        height: avatarWh,
        width: avatarWh,
        borderRadius: avatarWh/2+5,
        resizeMode: 'contain',
    },
    avatarFrame:{
        position: 'absolute',
        height: frameWh,
        width: frameWh,
        borderRadius: frameWh/2,
        borderWidth:3,
        borderColor:colors.WHITE_1000,
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