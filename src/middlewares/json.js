//This is a middleware with the purpose
//To receive the req stream in buffers
//And return as JSON

export async function json(req,res){
    const buffers = [];

    for await(const chunk of req){
        buffers.push(chunk);
    };


    //We will set the req.body as this JSON:
    try{
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    }catch{//If there's no body in our requisition it'll return an error
           //So in error case we'll set the req.body as null
        req.body = null;
    }

    //We'll also set the Header of our body

    res.setHeader('Content-type','application/json');

}