import Storage from "../helpers/Storage";
import GetProfile from "../modules/profile/commands/GetProfile";

export default class LoadData {

    start = async () => {
        try {
            let profile = await this.loadProfile();
            let contacts = await this.loadContacts();
            return {profile,contacts};
        }catch (e) {
            throw "erro ao carregar dados.";
        }
    };

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
                let command = new GetProfile();
                let response = await command.execute();
                contacts = response.results;
                await Storage.saveContacts(contacts);
                return contacts;
            }
        }catch (e) {
            throw 'erro ao carregar contatos.';
        }
    };
}