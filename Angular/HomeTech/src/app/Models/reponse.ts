export class Response {
    isSuccess: boolean = false;

    message: string = '';

    result: {

        user: {

            role: string;

        };

        tokens: string;

    } = {

            user: {

                role: '',

            },

            tokens: '',

        };



    constructor() { }
}