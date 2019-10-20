import Request from '../../helpers/Request'

export default class GetContacts extends Request {
    constructor() {
        super('https://randomuser.me/api/?results=20&nat=br', {
            method: 'GET',
        });
    }
}