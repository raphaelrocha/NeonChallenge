import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import SessionManager from "../../__mocks__/SessionManager";
import images from "../../assets/images";
import colors from "../../constants/colors";

export default class Profile extends Component{

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.loadAppData();
    }

    loadAppData = async () => {
        let sessionManager = new SessionManager();
        await sessionManager.clear();
        sessionManager.loadProfile()
            .then(profile=>{
                this.setState({profile})
            })
            .catch(error=>{
                console.log('erro do load data',error);
            })
    };

    goToSendMoney = () => {
        const {navigate} = this.props.navigation;
        navigate('SendMoney', {name: 'Jane'})
    };

    goToTransferHistory = () => {
        const {navigate} = this.props.navigation;
        navigate('TransferHistory', {name: 'Jane'})
    };

    render(){

        let {profile} = this.state;

        if(!profile){
            return  null;
        }

        return (
            <View style={styles.container}>

                <Image
                    style={styles.background}
                    source={images.bgGrad}
                />

                <View style={styles.avatarContainer}>

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
    avatarContainer:{
        marginTop: 150,
        alignSelf: 'center',
        height: 150,
        width: 150,
        borderRadius: 75,
        borderWidth:5,
        borderColor:colors.LIGHT_BLUE_400,
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
        backgroundColor: colors.BLUE_300,
    },
    buttonText:{
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.WHITE_1000,
        fontSize: 18,
    }
});

