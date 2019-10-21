import ApiMockStorage from "./db/ApiMockStorage";
import GetProfile from "./commands/GetProfile";
import GetContacts from "./commands/GetContacts";
import {sleep} from "../helpers/tools";
import PostTransfer from "./commands/PostTransfer";

/*
As apis de teste repondem bem rapido por seresm staticas, este delay serve para emular a lentidao normal em transaçoes
reais.
 */
const DEFAULT_DELAY = 0;

const sortByTransferAmount = (a,b) => {
    var keyA = parseFloat(a.transferValue);
    var keyB = parseFloat(b.transferValue);
    if(keyA < keyB) return 1;
    if(keyA > keyB) return -1;
    return 0;
};

const sortByTransferDate = (a,b) => {
    var keyA = parseInt(a.transferDate);
    var keyB = parseInt(b.transferDate);
    if(keyA < keyB) return 1;
    if(keyA > keyB) return -1;
    return 0;
};

export default class ApiMock {

    /*
    Carrega um perfil local ou busca no servidor;
     */
    static async loadProfile() {
        try{
            await sleep(DEFAULT_DELAY);
            let profile = await ApiMockStorage.getProfile();
            if(!profile){
                let command = new GetProfile();
                let response = await command.execute();
                profile = response.results[0];
                await ApiMockStorage.saveProfile(profile);
            }
            return profile;
        }catch (e) {
            throw e;
        }
    };

    /*
    Carrega a lista de contatos
     */
    static async loadContacts() {
        try{
            await sleep(DEFAULT_DELAY);
            let contacts = await ApiMockStorage.getContacts();
            if(!contacts){
                let command = new GetContacts();
                let response = await command.execute();
                contacts = response.results;
                await ApiMockStorage.saveContacts(contacts);
            }
            return contacts;
        }catch (e) {
            throw e;
        }
    };

    /*
    Carrega a lista de contatos que possuem histório de transferencia.
     */
    static async loadContactsWithTransfer (myUuid) {
        try{
            await sleep(DEFAULT_DELAY);
            let storedContacts = await ApiMockStorage.getContacts();
            if(!storedContacts){
                storedContacts = [];
            }
            let contacts = [];
            let promises = storedContacts.map(async (contact)=>{
                let uuid = myUuid+'='+contact.login.uuid;
                let register = await ApiMockStorage.getTransfersValue(uuid);
                if(register){
                    contact.transferValue = register.value;
                    contact.transferDate = register.date;
                    contacts.push(contact);
                }
            });
            await Promise.all(promises);
            contacts = contacts.sort(sortByTransferDate);
            let contactsChart = [...contacts];
            contactsChart.sort(sortByTransferAmount);
            return {contacts,contactsChart};
        }catch (e) {
            throw e
        }
    };

    static async sendMoney (myUuid,toUuid,value) {
        let uuid = myUuid+'='+toUuid;
        try{
            await sleep(DEFAULT_DELAY);
            let oldRegister = await ApiMockStorage.getTransfersValue(uuid);
            value = parseFloat(value);
            if(oldRegister){
                oldRegister = parseFloat(oldRegister.value);
                value = oldRegister.value+value;
            }
            value = value.toString();
            let register = {value,date:new Date().getTime()};
            await ApiMockStorage.saveTransferValue(uuid,register);
            let command = new PostTransfer(uuid,register);
            return await command.execute();
        }catch (e) {
            throw e;
        }
    };

    static async delete (){
        await ApiMockStorage.clear();
    }
}