import http from 'node:http';
import {json} from './middlewares/json.js'//Don't forget to specify the data type
import { routes } from './routes.js';

const server = http.createServer(async(req,res)=>{
    await json(req,res);
    //Our middleware will automatically set our req.body object
    //And the header as JSON

    const {method,url} = req;

    //This will find the route that matches our requisition
    const route = routes.find(route=>{
        return route.method===method && route.path.test(url);
    });

    if(route){
        console.log(req.params)
        return route.handler(req,res);
    }

    return res.writeHead(404).end();
});

server.listen(3334);