import React, {Component} from 'react';
import {Image, StyleSheet, View, FlatList} from 'react-native';
import Toolbar, {LIGHT} from "../../components/Toolbar";
import colors from "../../constants/colors";
import images from "../../assets/images";
import SessionManager from "../../__mocks__/SessionManager";
import Loading from "../../components/Loading";
import SendMoneyItem from "./components/SendMoneyItem";
import SendMoneyItemLoading from "./components/SendMoneyItemLoading";
import {sleep} from "../../helpers/tools";
import SendMoneyModal from "./components/SendMoneyModal";

export default class SendMoney extends Component{

    constructor(props) {
        super(props);

        /*
        Itens temporários para mostrar o elementos na lista enquanto carrega a lista.
         */
        let contacts = [];

        for(let i = 0; i<10; i++){
            contacts.push(i);
        }

        this.state = {
            loading:true,
            contacts,
            showModal:false,
        };
    }

    componentDidMount() {
        this.loadContent();

    }

    loadContent = async () => {
        try{
            let sessionManager = new SessionManager();
            let contacts = await sessionManager.loadContacts();
            if(contacts){
                console.log(contacts);
                this.setState({contacts,loading:false})
            }
        }catch (e) {
            console.log('erro do load data',e);
        }
    };

    sendMoney = (data,value) => {
        this.setState({showModal:false});
        console.warn('para mandar',data,value);
    };

    renderItem = (item,index) => {

        let {contacts} = this.state;

        if(this.state.loading){
            return <SendMoneyItemLoading
                lastItem={index === contacts.length-1}
            />
        }


        return (
            <SendMoneyItem
                onPress={(modalData)=>{this.setState({showModal:true,modalData})}}
                item={item}
                lastItem={index === contacts.length-1}
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
                    showsVerticalScrollIndicator={ false }
                    keyExtractor={ (item, index) => index.toString() }
                    data={ contacts }
                    renderItem={ ({ item, index }) => this.renderItem(item,index) } />

                <SendMoneyModal
                    data={this.state.modalData}
                    visible={this.state.showModal}
                    onPressClose={()=>this.setState({showModal:false})}
                    onPressSend={(data,value)=>{this.sendMoney(data,value)}}/>

            </View>);
    }
}

const styles = StyleSheet.create({
    container:{
        height: '100%',
        flex: 1,
        flexDirection: 'column',
    },
    background:{
        tintColor: colors.BLUE_GREY_900,
        height: '100%',
        width: '100%',
        position: 'absolute',
        top:0,
        left:0,
        zIndex:0,
    },
    list:{
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        height: '100%',
    },
    emptyListContainer:{
        justifyContent:'center',
    }
});