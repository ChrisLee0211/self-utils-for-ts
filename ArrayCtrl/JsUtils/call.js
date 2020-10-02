"use strict";
function myCall(context) {
    if (typeof this !== "function") {
        throw new Error("type error");
    }
    context = context || window;
    context.fn = this;
    var args = Array.from(arguments).slice(1);
    var result = context.fn.apply(context, args);
    delete context.fn;
    return result;
}
Function.prototype.MyCall = myCall;
//# sourceMappingURL=call.js.map