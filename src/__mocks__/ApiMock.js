import LocalStorage from "./db/LocalStorage";
import GetProfile from "./commands/GetProfile";
import GetContacts from "./commands/GetContacts";
import {sleep} from "../helpers/tools";
import SendMoneyController from "../modules/sendMoney/controller/SendMoneyController";
import PostTransfer from "./commands/PostTransfer";

/*
As apis de teste repondem bem rapido por seresm staticas, este delay serve para emular a lentidao normal em transaçoes
reais.
 */
const DEFAULT_DELAY = 0;

export default class ApiMock {

    /*
    Carrega um perfil local ou busca no servidor;
     */
    static async loadProfile() {
        try{
            await sleep(DEFAULT_DELAY);
            let profile = await LocalStorage.getProfile();
            if(!profile){
                let command = new GetProfile();
                let response = await command.execute();
                profile = response.results[0];
                LocalStorage.saveProfile(profile);
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
            let contacts = await LocalStorage.getContacts();
            if(!contacts){
                let command = new GetContacts();
                let response = await command.execute();
                contacts = response.results;
                await LocalStorage.saveContacts(contacts);
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
            let contacts = await LocalStorage.getContacts();
            if(!contacts){
                contacts = [];
            }
            let resultContacts = [];
            let promises = contacts.map(async (contact)=>{
                let uuid = myUuid+'='+contact.login.uuid;
                console.log(uuid);
                let value = await LocalStorage.getTransfersValue(uuid);
                if(value){
                    console.log('value',value);
                    contact.transferValue = value;
                    resultContacts.push(contact);
                }
            });
            await Promise.all(promises);
            return resultContacts;
        }catch (e) {
            throw e
        }
    };

    static async sendMoney (myUuid,toUuid,value) {
        let uuid = myUuid+'='+toUuid;
        try{
            await sleep(DEFAULT_DELAY);

            let oldValue = await LocalStorage.getTransfersValue(uuid);

            if(oldValue){
                oldValue = parseFloat(oldValue);
            }
            value = parseFloat(value);
            value = oldValue+value;
            value = value.toString();
            console.warn('valor para salvar',uuid,value);
            await LocalStorage.saveTransferValue(uuid,value);

            let command = new PostTransfer(uuid,value);
            return await command.execute();
        }catch (e) {
            throw e;
        }
    };

}