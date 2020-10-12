"use strict";
function compose(fnArray) {
    var i = 0;
    var len = fnArray.length;
    if (len < 0)
        return;
    if (len <= 1)
        return fnArray[0];
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = fnArray[i].apply(fnArray, args);
        i++;
        while (i < len) {
            result = fnArray[i](result);
            i++;
        }
        ;
        return result;
    };
}
//# sourceMappingURL=compose.js.map