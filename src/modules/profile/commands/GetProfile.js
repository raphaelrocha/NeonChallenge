import Request from '../../../helpers/Request'

export default class GetProfile extends Request {
    constructor() {
        super('https://randomuser.me/api/?nat=br', {
            method: 'GET',
        });
    }
}