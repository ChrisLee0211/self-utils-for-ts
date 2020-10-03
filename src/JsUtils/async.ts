function fakeAsync (gen:Function){
    return new Promise((resolve,reject)=>{
        const _g:Generator = gen();

        function next(res?:any){
            let _next;
            try{
                _next = _g.next(res);
            }catch(e){
               return reject(e)
            }
            if(_next.done){
               return resolve(_next.value)
            }
            Promise.resolve(_next.value).then(res=>{
                next(res)
            },err=>{
                _g.throw(err)
            })
        }
        next()
    })
}