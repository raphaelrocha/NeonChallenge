import LocalStorage from "../../../helpers/LocalStorage";

export default class SendMoneyController {

    constructor(){
        if(!SendMoneyController.instance){
            SendMoneyController.instance = this;
        }
        return SendMoneyController.instance;
    }

    static clear() {
        SendMoneyController.instance = undefined;
    }

    static getInstance(){
        return new SendMoneyController();
    }

    setTo = (to) => {
        this.to = to;
    };

    getTo = () => {
        return this.to;
    };

    setValueInvoice = (value) => {
        this.value = value;
    };

    getValueInvoice = () => {
        return this.value;
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
}