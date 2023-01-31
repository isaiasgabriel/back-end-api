export function extractQueryParams(query){
    /**
     * Our function will receive the query like:
     * ?search=Mario
     * substr(1) will remove the "?"
     * 
     */
    
    return query.substr(1).split('&').reduce((queryParams,param)=>{
            const [key,value] = param.split('=');
            queryParams[key] = decodeURIComponent(value.replace(/\+/g,' '));
            return queryParams;
        },{});
	}

    /**
     * The reduce() function is used to receive the query string 
     * And transform it into an object with key value pairs
     */