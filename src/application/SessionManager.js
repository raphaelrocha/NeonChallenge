import LocalStorage from "../helpers/LocalStorage";
import GetProfile from "../__mocks__/commands/GetProfile";
import GetContacts from "../__mocks__/commands/GetContacts";
import {sleep} from "../helpers/tools";
import {AsyncStorage as storage} from "react-native";

const DEFAULT_DELAY = 500;

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
            throw 'erro ao carregar contatos.';
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
                    let value = await this.getTransfersValue(contact.login.uuid);
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
                    let value = await this.getTransfersValue(contact.login.uuid);
                    if(value){
                        contact.transferValue = value;
                        resultContacts.push(contact);
                    }
                });
                await Promise.all(promises);
                return resultContacts;
            }
        }catch (e) {
            throw 'erro ao carregar contatos.',e;
        }
    };

    saveTransferValue = async (uuid,value) => {
        let profile = await LocalStorage.getProfile();

        if(profile){
            uuid = uuid+profile.login.uuid;
            let oldValue = await this.getTransfersValue(uuid);
            if(oldValue){
                oldValue = parseFloat(oldValue);
            }
            value = parseFloat(value);
            value = oldValue+value;
            uuid = uuid.toString();
            value = value.toString();
            await LocalStorage.saveTransferValue(uuid,value);
        }
    };

    getTransfersValue = async (uuid) => {
        let profile = await LocalStorage.getProfile();
        if(!profile){
            return null;
        }
        uuid = uuid+profile.login.uuid;
        return  await LocalStorage.getTransfersValue(uuid);
    };

    static clear = async () => {
        await LocalStorage.clear();
    }
}