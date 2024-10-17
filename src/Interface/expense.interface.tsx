export interface ExpenseDetails{
    name:string,
    amount:number,
    category:string,
    date:Date|string,
    id?:string,
    email?:string,
    file_id?:null|string,
    createdAt?:Date,
    updatedAt?:Date
}