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

    select(table){
        const users = this.#database[table] ?? [];
        //If this table doesn't exist it'll return an empty array

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
        
    }
}