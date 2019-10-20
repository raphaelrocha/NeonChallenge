import React, {Component} from 'react';
import {FlatList, Image, StyleSheet, View, Text} from 'react-native';
import colors from "../../constants/colors";
import images from "../../assets/images";
import Toolbar, {LIGHT} from "../../components/Toolbar";
import SessionManager from "../../application/SessionManager";
import ContactShimmerItem from "../../components/ContactShimmerItem";
import ContactItem from "../../components/ContactItem";

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
            let contacts = await SessionManager.getInstance().loadContactsWithTransfer();
            if(contacts){
                console.log(contacts);
                this.setState({contacts,loading:false});
            }
        }catch (e) {
            console.log('TransferHistory','Erro ao carregar contatos',e);
            this.setState({contacts:[],loading:false});
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

        // item.transferValue = getRandomFloat(0.01,99.99);

        return (
            <ContactItem
                item={item}
                lastItem={index === contacts.length-1}
            />
        );
    };

    listEmptyComponent = () => {
        return (
            <View style={styles.emptyContainer}>
                <Image
                    style={styles.emptyIcon}
                    source={images.exchange}
                />
                <Text style={styles.emptyMessage}>
                    Ainda não há movimentações para mostar.
                </Text>
            </View>
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
                    ListEmptyComponent={this.listEmptyComponent.bind(this)}
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
    emptyContainer:{
        margin: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyMessage:{
        fontWeight:'bold',
        fontSize: 20,
        color: colors.WHITE_1000,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    emptyIcon:{
        marginTop:40,
        marginBottom:40,
        height:60,
        resizeMode: 'contain',
        tintColor: colors.WHITE_1000,
    }
});
