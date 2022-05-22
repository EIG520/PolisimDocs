import { genSaltSync, hashSync, compareSync } from 'bcrypt';

import { v4 as uuidv4 } from 'uuid';

const SALT_ROUNDS = 10;

export class User {
    public id: number;
    public email: string;
    public password: string;
    public token: string;
 
    constructor(id: number, email: string, password: string, token?: string, preHashed: boolean = false) {
        this.id = id;
        this.email = email;
        
        if (preHashed) {
            this.password = password;
            if (token) this.token = token;
            else this.token = this.setNewToken();
        } else {
            this.password = this.hashPassword(password);
            this.token = this.setNewToken();
        }

    }
    
    public checkPassword(password: string): boolean {
        console.log(compareSync(password, this.password));

        return compareSync(password, this.password);
    }

    public hashPassword(password: string): string {
        const salt = genSaltSync(SALT_ROUNDS);
        const hash = hashSync(password, salt);
        this.password = hash;
        return this.password;
    }

    public setNewToken(): string {
        this.token = uuidv4();
        return this.token;
    }
}