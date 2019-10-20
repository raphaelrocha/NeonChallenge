import LocalStorage from "../helpers/LocalStorage";
import GetProfile from "../__mocks__/commands/GetProfile";
import GetContacts from "../__mocks__/commands/GetContacts";
import {sleep} from "../helpers/tools";
import SendMoneyController from "../modules/sendMoney/controller/SendMoneyController";
import PostTransfer from "../__mocks__/commands/PostTransfer";

/*
As apis de teste repondem bem rapido por seresm staticas, este delay serve para emular a lentidao normal em transaçoes
reais.
 */
const DEFAULT_DELAY = 1000;

export default class SessionManager {

    constructor(){
        if(!SessionManager.instance){
            /*
            Limpa o storage sempre que o app é iniciado para forçar o download de tudo novamente.
             */
            SessionManager.clear();
            SessionManager.instance = this;
        }
        return SessionManager.instance;
    }

    static getInstance(){
        return new SessionManager();
    }

    /*
    Carrega um perfil local ou busca no servidor;
     */
    loadProfile = async () => {
        try{
            let profile = await LocalStorage.getProfile();
            if(profile){
                return profile;
            }else{
                await sleep(DEFAULT_DELAY);
                let command = new GetProfile();
                let response = await command.execute();
                profile = response.results[0];
                await LocalStorage.saveProfile(profile);
                return profile;
            }
        }catch (e) {
            throw 'erro ao carregar perfil.';
        }
    };

    /*
    Carrega a lista de contatos
     */
    loadContacts = async () => {
        try{
            let contacts = await LocalStorage.getContacts();
            if(contacts){
                return contacts;
            }else{
                await sleep(DEFAULT_DELAY);
                let command = new GetContacts();
                let response = await command.execute();
                contacts = response.results;
                await LocalStorage.saveContacts(contacts);
                return contacts;
            }
        }catch (e) {
            throw e;
        }
    };

    /*
    Carrega a lista de contatos que possuem histório de transferencia.
     */
    loadContactsWithTransfer = async () => {
        try{
            let contacts = await LocalStorage.getContacts();
            if(contacts){
                let resultContacts = [];
                let promises = contacts.map(async (contact)=>{
                    let value = await SendMoneyController.getInstance().getTransfersValue(contact.login.uuid);
                    if(value){
                        contact.transferValue = value;
                        resultContacts.push(contact);
                    }
                });
                await Promise.all(promises);
                return resultContacts;
            }else{
                await sleep(DEFAULT_DELAY);
                let command = new GetContacts();
                let response = await command.execute();
                contacts = response.results;
                await LocalStorage.saveContacts(contacts);
                let resultContacts = [];
                let promises = contacts.map(async (contact)=>{
                    let value = await SendMoneyController.getInstance().getTransfersValue(contact.login.uuid);
                    if(value){
                        contact.transferValue = value;
                        resultContacts.push(contact);
                    }
                });
                await Promise.all(promises);
                return resultContacts;
            }
        }catch (e) {
            throw e
        }
    };

    sendMoney = async (uuid,value) => {
        try{
            await sleep(DEFAULT_DELAY);
            let command = new PostTransfer(uuid,value);
            return await command.execute();
        }catch (e) {
            throw e;
        }
    };

    static clear = async () => {
        await LocalStorage.clear();
    }
}