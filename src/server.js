import http from 'node:http';
import {json} from './middlewares/json.js'//Don't forget to specify the data type
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extractQueryParams.js';

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

        const routeParams = req.url.match(route.path);
        //So we'll use our buildRoutePath function
        //To separate de ID and query from the req

        const {query,...params} = routeParams.groups;

        req.params = params;
        //We'll set the params inside the req object

        //If there's any query we'll set it to use
        //Our extract query function
        if (query) {
            req.query = extractQueryParams(query);
          } else {
            req.query = {};
          }
        //And We'll push this information
        //Inside the req.params

        return route.handler(req,res);
    }

    return res.writeHead(404).end();
});

server.listen(3334);