import React, {Component} from 'react';
import {AppState, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ApiMock from "../../__mocks__/ApiMock";
import images from "../../assets/images";
import colors from "../../constants/colors";
import Loading from "../../components/Loading";
import AlertModal from "../../components/AlertMordal";
import {handleErrorMessage} from "../../helpers/tools";

export default class Profile extends Component{

    constructor(props) {
        super(props);
        this.state = {
            typeAlertModal:'alert',
            message:'',
            showAlertModal:false,
            confirmButtonText:'ok',
            appState: AppState.currentState,
            onError:false,
            refreshing: false
        };
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!');
            if(this.state.onError){
                this.getProfile();
            }
        }
        this.setState({appState: nextAppState});
    };

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        this.getProfile();
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    getProfile () {
        ApiMock.loadProfile()
            .then(async  profile=>{
                this.setState({
                    profile,
                    onError:false,
                    refreshing: false,
                    showAlertModal:false,});

            })
            .catch(error=>{
                console.log('erro do load data',error);

                let message = handleErrorMessage(error,'Não foi possível carregar os dados da conta.');

                let onPressConfirmAlert;
                let typeAlertModal = 'error';

                if(error.hasOwnProperty('code')){
                    if(error.code === 'timeout' || error.code === 'noConnection'){
                        if(!this.state.profile){
                            onPressConfirmAlert = () => {
                                this.setState({
                                    onError:false,
                                    showAlertModal:false,
                                });
                                this.getProfile();
                            };
                        }
                    }

                    if(error.code === 'noConnection'){
                        typeAlertModal = 'warning';
                    }
                }

                this.setState({
                    refreshing: false,
                    onError:true,
                    typeAlertModal,
                    message,
                    showAlertModal:true,
                    confirmButtonText:'ok',
                    onPressConfirmAlert,
                })
            });
    }

    goToSendMoney = () => {
        const {navigate} = this.props.navigation;
        navigate('SendMoney',{profile:this.state.profile});
    };

    goToTransferHistory = () => {
        const {navigate} = this.props.navigation;
        navigate('TransferHistory',{profile:this.state.profile});
    };

    loadNewProfile = async () => {
        // this.setState({profile:undefined});
        await ApiMock.delete();
        this.getProfile();
    };

    render(){

        let {profile} = this.state;

        let content;

        if(profile){
            content = (
                <View style={styles.content}>

                    <View
                        style={styles.avatarContainer}>

                        <Image
                            style={styles.avatar}
                            source={{uri:profile.picture.large}}
                        />

                    </View>

                    <Text style={styles.name}>
                        {profile.name.first} {profile.name.last}
                    </Text>

                    <Text style={styles.email}>
                        {profile.email}
                    </Text>

                    <View style={styles.buttonsContainer}>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.goToSendMoney.bind(this)}>

                            <Text style={styles.buttonText}>
                                ENVIAR DINHEIRO
                            </Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.goToTransferHistory.bind(this)}>

                            <Text style={styles.buttonText}>
                                HISTÓRICO DE ENVIOS
                            </Text>

                        </TouchableOpacity>

                    </View>

                </View>
            );
        } else{
            content = (
                <View style={styles.content}>

                    <Loading/>

                </View>
            );
        }

        return (
            <View style={styles.body}>

                <Image
                    style={styles.background}
                    source={images.bgGrad}
                />

                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={async ()=>{
                                this.setState({refreshing: true});
                                this.loadNewProfile();
                            }}
                            title="Carregando..."
                            tintColor={colors.WHITE_1000}
                            titleColor={colors.WHITE_1000}
                        />
                    }>

                    {content}

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
                        }}/>

                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    body:{
        alignItems: 'center',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    contentContainerStyle:{
        flex: 1
    },
    content:{
        alignItems: 'center',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center'
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
    avatarContainer:{
        alignSelf: 'center',
        height: 150,
        width: 150,
        borderRadius: 75,
        borderWidth:5,
        borderColor:colors.WHITE_1000,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.ALPHA_GREY_46,
    },
    avatar:{
        height: 140,
        width: 140,
        resizeMode: 'contain',
        borderRadius: 70,
    },
    name:{
        color: colors.WHITE_1000,
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    email:{
        color: colors.WHITE_1000,
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    buttonsContainer:{
        alignSelf: 'center',
        marginTop: 50,
        marginRight: 30,
        marginLeft: 30,
    },
    button:{
        borderRadius: 30,
        marginBottom: 20,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: colors.GREY_800,
        borderWidth: 2,
        borderColor: colors.ALPHA_GREY_15
    },
    buttonText:{
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.WHITE_1000,
        fontSize: 18,
    }
});

