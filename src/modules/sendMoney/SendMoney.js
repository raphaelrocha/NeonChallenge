import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import Toolbar, {LIGHT} from "../../components/Toolbar";
import colors from "../../constants/colors";
import images from "../../assets/images";
import SessionManager from "../../__mocks__/SessionManager";
import Loading from "../../components/Loading";
import SendMoneyItem from "./components/SendMoneyItem";

export default class SendMoney extends Component{

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let sessionManager = new SessionManager();
        sessionManager.loadContacts()
            .then(contacts=>{
                console.log(contacts);
                this.setState({contacts})
            })
            .catch(error=>{
                console.log('erro do load data',error);
            })
    }

    listEmptyComponent = () => {
        console.log('lsita vazia');
        return (
            <View style={styles.emptyListContainer}>
                <Text> loading...</Text>
                <Loading/>
            </View>
        );
    };

    renderItem = (item,index) => {
        return (
            <SendMoneyItem
                item={item}
                lastItem={false}
            />
        );
    };

    render(){

        let {contacts} = this.state;

        return (
            <View style={styles.container}>

                <Image
                    style={styles.background}
                    source={images.bgGrad}
                />

                <Toolbar
                    navigation={this.props.navigation}
                    title='ENVIAR DINHEIRO'
                    barStyle={LIGHT}
                />

                <FlatList
                    style={styles.list}
                    bounces={ false }
                    ListEmptyComponent={this.listEmptyComponent.bind(this)}
                    showsVerticalScrollIndicator={ false }
                    keyExtractor={ (item, index) => index.toString() }
                    data={ contacts }
                    renderItem={ ({ item, index }) => this.renderItem(item,index) } />

            </View>);
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
    list:{
        height: '100%',
        width: '100%',
    },
    emptyListContainer:{
        height: '100%',
        width: '100%',
        backgroundColor: 'red'
    }
});