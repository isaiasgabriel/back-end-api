//This will be a FUNCTION that'll receive a path
//And change it's path to a RegExp

export function buildRoutePath(path){
    // /users/:id
    const routeRegExp = /:([a-zA-Z]+)/g
    //This regExp will capture the :id part

    const pathWithParams = path.replaceAll(routeRegExp,'(?<$1>[a-z0-9\-_]+)');
    // /users/(?<id>[a-z0-9-_]+)

    const pathRegExp = new RegExp(`${pathWithParams}(?<query>\\?(.*))?$`);

    return pathRegExp;
}

