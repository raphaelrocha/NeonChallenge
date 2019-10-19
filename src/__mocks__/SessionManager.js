import Storage from "../helpers/Storage";
import GetProfile from "../modules/profile/commands/GetProfile";
import GetContacts from "../modules/sendMoney/commands/GetContacts";
import {sleep} from "../helpers/tools";

export default class SessionManager {

    loadProfile = async () => {
        try{
            let profile = await Storage.getProfile();
            if(profile){
                return profile;
            }else{
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

    clear = async () => {
        await Storage.clear();
    }
}