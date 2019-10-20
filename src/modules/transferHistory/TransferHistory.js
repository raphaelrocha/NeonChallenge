import React, {Component} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import colors from "../../constants/colors";
import images from "../../assets/images";
import Toolbar, {LIGHT} from "../../components/Toolbar";
import SessionManager from "../../application/SessionManager";
import ContactShimmerItem from "../../components/ContactShimmerItem";
import ContactItem from "../../components/ContactItem";
import {getRandomFloat, getRandomInt} from "../../helpers/tools";

export default class TransferHistory extends Component{

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

    renderItem = (item,index) => {

        let {contacts} = this.state;

        if(this.state.loading){
            return <ContactShimmerItem
                value={true}
                lastItem={index === contacts.length-1}
            />
        }

        return (
            <ContactItem
                // onPress={(modalData)=>{this.setState({showModal:true,modalData,showAlertModal:false})}}
                item={item}
                value={getRandomFloat(0.01,999.99)}
                lastItem={index === contacts.length-1}
            />
        );
    };

    render () {

        let {contacts} = this.state;

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

                <FlatList
                    style={styles.list}
                    bounces={ false }
                    showsVerticalScrollIndicator={ false }
                    keyExtractor={ (item, index) => index.toString() }
                    data={ contacts }
                    renderItem={ ({ item, index }) => this.renderItem(item,index) } />

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
});
