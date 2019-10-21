import React, {Component} from 'react';
import {FlatList, Image, RefreshControl, StyleSheet, Text, View} from 'react-native';
import Toolbar, {LIGHT} from "../../components/Toolbar";
import colors from "../../constants/colors";
import images from "../../assets/images";
import ApiMock from "../../__mocks__/ApiMock";
import ContactItem from "../../components/ContactItem";
import ContactShimmerItem from "../../components/ContactShimmerItem";
import SendMoneyModal from "./components/SendMoneyModal";
import SendMoneyController from "./controller/SendMoneyController";
import AlertModal from "../../components/AlertMordal";
import LoadingModal from "../../components/LoadingModal";
import {handleErrorMessage, replaceAll} from "../../helpers/tools";
import {translate} from "../../locales";

export default class SendMoney extends Component{

    constructor(props) {
        super(props);

        SendMoneyController.clear();

        /*
        Itens temporários para mostrar o elementos na lista enquanto carrega a lista.
         */
        let contacts = [];

        for(let i = 0; i<10; i++){
            contacts.push(i);
        }

        let profile = props.navigation.state.params.profile;

        this.state = {
            loading:true,
            contacts,
            showModal:false,
            showAlertModal:false,
            showLoadingModal:false,
            typeAlertModal:'alert',
            profile,
            refreshing: false
        };
    }

    componentDidMount() {
        this.loadContent();
    }

    askConfirmation = () => {
        let to = SendMoneyController.getInstance().getTo();
        let name = to.name.first+' '+to.name.last;

        let onPressConfirmAlert = () => {
            let alertParams = {show:false};
            this.showAlert(alertParams);
            this.showLoadingModal(true);
            this.sendMoney();
        };

        let onPressCancelAlert = () => {
            let alertParams = {show:false};
            this.showAlert(alertParams);
        };

        let message = translate('askForConfirmationToSend');
        message = replaceAll(message,':name',name);

        let alertParams = {
            show:true,
            message,
            confirmButtonText: translate('yes'),
            cancelButtonText: translate('no'),
            onPressConfirmAlert,
            onPressCancelAlert
        };

        this.showAlert(alertParams);
    };

    showAlert = (params) => {

        let {show,message,confirmButtonText,cancelButtonText,onPressConfirmAlert,onPressCancelAlert,type} = params;

        let showAlertModal = show;
        let typeAlertModal = type;

        this.setState({
            refreshing:false,
            showAlertModal,
            message,
            typeAlertModal,
            showModal:false,
            confirmButtonText,
            cancelButtonText,
            showLoadingModal:false,
            onPressConfirmAlert,
            onPressCancelAlert});
    };

    showLoadingModal = (showLoadingModal) => {
        this.setState({showLoadingModal,showModal:false,showAlertModal:false});
    };

    loadContent = async () => {
        try{
            let contacts = await ApiMock.loadContacts();
            if(contacts){
                this.setState({contacts, loading:false, refreshing: false});
            }
        }catch (e) {
            console.log('SendMoney','Erro ao carregar contatos.',e);

            let message = handleErrorMessage(e,translate('errorLoadingContacts'));

            this.setState({contacts:[], loading:false, refreshing:false});

            let type = 'error';

            if(e.hasOwnProperty('code')){
                if(e.code === 'noConnection'){
                    type = 'warning';
                }
            }

            let alertMessageParams = {
                show:true,
                message,
                confirmButtonText:translate('ok'),
                type
            };

            this.showAlert(alertMessageParams);
        }
    };

    sendMoney = async () => {
        try {
            let to = SendMoneyController.getInstance().getTo();
            let toUuid = to.login.uuid;
            let myUuid = this.state.profile.login.uuid;
            let name = to.name.first+' '+to.name.last;
            let value = SendMoneyController.getInstance().getValueInvoice();

            let response = await ApiMock.sendMoney(myUuid,toUuid,value);

            this.setState({showModal:false, showLoadingModal:false, showAlertModal:false, refreshing:false});

            let message = translate('transferSuccessfulMessage');
            message = replaceAll(message,':name', name);
            message = response.id+' - '+message;

            let onPressConfirmAlert = () => {
                this.setState({showModal:false,showLoadingModal:false,showAlertModal:false});
                this.props.navigation.goBack();
            };

            let onPressCancelAlert = () => {
                this.setState({showModal:false,showLoadingModal:false,showAlertModal:false});
            };

            let alertParams = {
                type:'alert',
                show:true,
                message,
                confirmButtonText:translate('ok'),
                onPressConfirmAlert,
                onPressCancelAlert,
            };

            this.showAlert(alertParams);

        }catch (e) {
            let onPressConfirmAlert = () => {
                this.setState({showModal:false, showLoadingModal:false, showAlertModal:false, refreshing:false});
            };

            let onPressCancelAlert = () => {
                this.setState({showModal:false, showLoadingModal:false, showAlertModal:false, refreshing:false});
            };

            let message = handleErrorMessage(e,translate('errorWhileTransferring'));

            let type = 'error';

            if(e.hasOwnProperty('code')){
                if(e.code === 'noConnection'){
                    type = 'warning';
                }
            }

            let alertParams = {
                show:true,
                message,
                confirmButtonText:translate('ok'),
                onPressConfirmAlert,
                onPressCancelAlert,
                type,
            };

            this.showAlert(alertParams);
        }

    };

    renderItem = (item,index) => {

        let {contacts} = this.state;

        if(this.state.loading){
            return <ContactShimmerItem
                lastItem={index === contacts.length-1}
            />
        }

        return (
            <ContactItem
                onPress={(modalData)=>{this.setState({showModal:true,modalData,showAlertModal:false})}}
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
                    source={images.contactBook}
                />
                <Text style={styles.emptyMessage}>
                    {translate('emptyListSendMoneyText')}
                </Text>
            </View>
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
                    title={translate('sendMoney').toUpperCase()}
                    barStyle={LIGHT}
                />

                <FlatList
                    style={styles.list}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={ (item, index) => index.toString() }
                    data={ contacts }
                    ListEmptyComponent={this.listEmptyComponent.bind(this)}
                    renderItem={ ({ item, index }) => this.renderItem(item,index) }
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
                    }/>

                <SendMoneyModal
                    data={this.state.modalData}
                    visible={this.state.showModal}
                    onPressClose={()=>this.setState({showModal:false})}
                    onPressSend={this.askConfirmation.bind(this)}/>

                <AlertModal
                    type={this.state.typeAlertModal}
                    message={this.state.message}
                    visible={this.state.showAlertModal}
                    confirmButtonText={this.state.confirmButtonText}
                    cancelButtonText={this.state.cancelButtonText}
                    onPressConfirm={()=>{
                        if(this.state.onPressConfirmAlert){
                            this.state.onPressConfirmAlert();
                        } else {
                            this.setState({showAlertModal:false});
                        }
                    }}
                    onPressCancel={()=>{
                        if(this.state.onPressCancelAlert){
                            this.state.onPressCancelAlert();
                        } else {
                            this.setState({showAlertModal:false});
                        }
                    }}
                />

                <LoadingModal
                    visible={this.state.showLoadingModal}
                />

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
        height:100,
        resizeMode: 'contain',
        tintColor: colors.WHITE_1000,
    }

});