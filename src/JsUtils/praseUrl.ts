function urlPraser<T = any>(url:string):T{
    if(Object.prototype.toString.call(url)!=="object String"){
        throw new Error(`The param type must be String!`)
    }
    const result = Object.create({})
    const paramsContent:string = url.split("?").splice(0,1)[0]??"";
    const params:string[] = paramsContent.length>0?paramsContent.split("&"):[];
    if(params.length){
        params.forEach(param => {
            const keyValue:string[] =param.split("=")??[];
            if(keyValue.length){
                result[keyValue[0]] = keyValue[1]
            } 
        })
    } 

    return result
}

// 正则版本
function getParam(str:string) {
    var o = Object.create({})
    str.replace(/([^?=&]+)=([^?=&]+)/g, (a, b, c) => o[b] = c);
    return o;
}
