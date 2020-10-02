"use strict";
function MyBind(context) {
    if (typeof this !== "function") {
        throw new Error("type error");
    }
    ;
    context = context || window;
    var currentThis = this;
    var args = arguments[1] || [];
    return function () {
        return currentThis.apply(context, args.concat(arguments));
    };
}
Function.prototype.MyBind = MyBind;
//# sourceMappingURL=bind.js.map