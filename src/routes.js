import {Database} from './database.js';
import {randomUUID} from 'node:crypto';
import { buildRoutePath } from './utils/buildRoutePath.js';

const database = new Database();

export const routes = [
    {
        method:'GET',
        path:buildRoutePath('/users'),
        handler:(req,res)=>{

            const {search} = req.query;

            const users = database.select('users',{
                name:search,
                email:search
            });

            return res
                .writeHead(200)
                .end(JSON.stringify(users));
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
        path:buildRoutePath('/users/:id'),
        handler:(req,res)=>{
            const {name,email} = req.body;
            const {id} = req.params;
            database.update('users',id,{
                name,
                email
            });

            return res.writeHead(200).end();
        }
    },
    {
        method:'DELETE',
        path:buildRoutePath('/users/:id'),
        handler:(req,res)=>{

            //First we'll import our ID from the req
            const {id} = req.params;

            database.delete('users',id);
            
            return res.writeHead(202).end();
        }
    }
]