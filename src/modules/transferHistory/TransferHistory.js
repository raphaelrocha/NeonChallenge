import React, {Component} from 'react';
import {FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from "../../constants/colors";
import images from "../../assets/images";
import Toolbar, {LIGHT} from "../../components/Toolbar";
import ApiMock from "../../__mocks__/ApiMock";
import ContactShimmerItem from "../../components/ContactShimmerItem";
import ContactItem from "../../components/ContactItem";
import TransferChart from "./components/TransferChart";
import {translate} from "../../locales";

export default class TransferHistory extends Component{

    constructor(props) {
        super(props);

        /*
        Itens temporários para mostrar o elementos na lista enquanto carrega a lista.
         */
        let contacts = [];

        let contactsChart = [];

        for(let i = 0; i<10; i++){
            contacts.push(i);
        }

        let profile = props.navigation.state.params.profile;

        this.state = {
            loading:true,
            contacts,
            contactsChart,
            profile,
            refreshing:false,
        };
    }

    componentDidMount() {
        this.loadContent();
    }

    loadContent = async () => {
        try{
            let myUuid = this.state.profile.login.uuid;
            let result = await ApiMock.loadContactsWithTransfer(myUuid);

            let contacts = result.contacts;
            let contactsChart = result.contactsChart;

            if(!contacts){
                contacts = [];
            }

            if(!contactsChart){
                contactsChart = [];
            }

            this.setState({contacts,contactsChart, loading:false, refreshing: false});
        }catch (e) {
            console.log('TransferHistory','Erro ao carregar contatos',e);
            this.setState({contacts:[],contactsChart:[],loading:false, refreshing: false});
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
                    {translate('emptyListTransferHistoryText')}
                </Text>
            </View>
        );
    };

    render () {

        let {contacts,contactsChart} = this.state;

        let chart = null;

        if(!this.state.loading && contactsChart.length>1){
            chart = (
                <TransferChart
                    data={contactsChart}
                />
            );
        }

        return (
            <View style={styles.container}>

                <Image
                    style={styles.background}
                    source={images.bgGrad}
                />

                <Toolbar
                    navigation={this.props.navigation}
                    title={translate('transferHistory').toUpperCase()}
                    barStyle={LIGHT}
                />

                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={async ()=>{
                                this.setState({refreshing: true});
                                this.loadContent();
                            }}
                            title={translate('loading').toUpperCase()+'...'}
                            tintColor={colors.WHITE_1000}
                            titleColor={colors.WHITE_1000}
                        />
                    }>

                    {chart}

                    <FlatList
                        style={styles.list}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={ (item, index) => index.toString() }
                        data={contacts}
                        ListEmptyComponent={this.listEmptyComponent.bind(this)}
                        renderItem={ ({ item, index }) => this.renderItem(item,index) }
                    />

                </ScrollView>

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
