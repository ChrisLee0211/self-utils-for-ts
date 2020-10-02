"use strict";
function MyApply(context) {
    if (typeof this !== "function") {
        throw new Error("type error");
    }
    ;
    context = context || window;
    context.fn = this;
    var args = arguments[1] || [];
    var result = context.fn.apply(context, args);
    delete context.fn;
    return result;
}
Function.prototype.MyApply = MyApply;
//# sourceMappingURL=apply.js.map