import Request from '../../helpers/Request'

export default class PostTransfer extends Request {
    constructor(uuid,value) {
        let params = {
            uuid,
            value
        };

        super('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(params)
        });
    }
}