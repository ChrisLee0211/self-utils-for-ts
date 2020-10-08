function fakeExtends (parent:any,child:any){
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
}