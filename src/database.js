//1.importar o file system
import fs from 'node:fs/promises';


const databasePath = new URL('../db.json',import.meta.url);

export class Database{

    #database = {};

    constructor(){

        fs.readFile(databasePath,'utf8')
            .then(data=>{
                this.#database = JSON.parse(data)
            }).catch(()=>{
                this.#persist();
            });

            /**
             * The readFile() function will first read the data where
             * we specifiend and then we'll put all of this inside our
             * #database = {} object so we can use it
             * 
             * If's there no data means there's no database
             * So we'll use our #persist functions to create it
             * 
             */

    }

    #persist(){
        fs.writeFile(databasePath,JSON.stringify(this.#database));
    }

    select(table,search){
        let users = this.#database[table] ?? [];
        //If this table doesn't exist it'll return an empty array

        if(search.name===undefined&&search.email===undefined){
            return users;
        }

        if(search){
            users = users.filter(row=>{
                return Object.entries(search).some(([key,value])=>{
                    return row[key].includes(value);
                });
            });
        }

        return users;
    }

    insert(table,user){

        //First we'll check if the table specified exists
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(user);
        }else{
            this.#database[table] = [user];
        }
        this.#persist();

        return user;
    }

    delete(table,id){

        //First we'll find the index of the user with the same ID
        //Using the findIndex function
        const rowIndex = this.#database[table].findIndex(row=>row.id===id);
        //The findIndex function return -1 if doesn't find
        if(rowIndex>-1){
            this.#database[table].splice(rowIndex,1);
            this.#persist();
            //Don't forget to save the data
        }
    }

    update(table,id,data){

        //Again we'll find the row if the same ID
        //Using the findIndex method

        const rowIndex = this.#database[table].findIndex(row=>row.id===id);

        if(rowIndex>-1){
            this.#database[table][rowIndex] = {id,...data};
            this.#persist;
        }
    }
}