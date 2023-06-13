export interface IUserSignup {
    displayName: string;
    username: string;
    password: string;
}

export interface IUserLogin {
    username: string;
    password: string;
}

export interface ICategory {
    id?: number;
    name: string;
    description: string;
}

export interface IAccount {
    id?: number;
    name: String;
    number: number;
    agency: number;
    bank: number;
    amount: number;   
}

export interface IFinancialMovement {
    id?: number;
    account: IAccount;
    accountToTransfer?: IAccount;
    value: number;
    date: Date;
    category: ICategory;
    description: String;
    situation: String;
    type: String;
}