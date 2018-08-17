export class User {
    constructor(
        public name: string,
        public password: string,
        public email: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public _id?: string
    ) {
    }
}
