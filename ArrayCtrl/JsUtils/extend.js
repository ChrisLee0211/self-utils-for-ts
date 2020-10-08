"use strict";
function fakeExtends(parent, child) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
}
//# sourceMappingURL=extend.js.map