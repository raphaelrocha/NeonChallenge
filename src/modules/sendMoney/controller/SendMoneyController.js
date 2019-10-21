
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


}