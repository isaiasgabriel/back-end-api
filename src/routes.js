import {Database} from './database.js';
import {randomUUID} from 'node:crypto';
import { buildRoutePath } from './utils/buildRoutePath.js';

const database = new Database();

export const routes = [
    {
        method:'GET',
        path:buildRoutePath('/users'),
        handler:(req,res)=>{
            const users = database.select('users');
            console.log(users);
            return res.writeHead(200).end(JSON.stringify(users));
            //Don't forget the JSON.stringify
        }
    },
    {
        method:'POST',
        path:buildRoutePath('/users'),
        handler:(req,res)=>{
            const {name,email} = req.body;
            const user = {
                id : randomUUID(),
                name,
                email
            }

            database.insert('users',user);
            return res.writeHead(201).end();
        }
    },
    {
        method:'PUT',
        path:'/users/:id',
        handler:(req,res)=>{

        }
    },
    {
        method:'DELETE',
        path:'/users/:id',
        handler:(req,res)=>{
            
        }
    }
]