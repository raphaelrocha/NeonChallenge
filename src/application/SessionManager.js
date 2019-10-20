import Storage from "../helpers/Storage";
import GetProfile from "../modules/profile/commands/GetProfile";
import GetContacts from "../modules/sendMoney/commands/GetContacts";
import {sleep} from "../helpers/tools";

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

    loadProfile = async () => {
        try{
            let profile = await Storage.getProfile();
            if(profile){
                return profile;
            }else{
                await sleep(DEFAULT_DELAY);
                let command = new GetProfile();
                let response = await command.execute();
                profile = response.results[0];
                await Storage.saveProfile(profile);
                return profile;
            }
        }catch (e) {
            throw 'erro ao carregar perfil.';
        }
    };

    loadContacts = async () => {
        try{
            let contacts = await Storage.getContacts();
            if(contacts){
                return contacts;
            }else{
                await sleep(DEFAULT_DELAY);
                let command = new GetContacts();
                let response = await command.execute();
                contacts = response.results;
                await Storage.saveContacts(contacts);
                return contacts;
            }
        }catch (e) {
            throw 'erro ao carregar contatos.';
        }
    };

    static clear = async () => {
        await Storage.clear();
    }
}