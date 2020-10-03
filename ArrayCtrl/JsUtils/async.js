"use strict";
function fakeAsync(gen) {
    return new Promise(function (resolve, reject) {
        var _g = gen();
        function next(res) {
            var _next;
            try {
                _next = _g.next(res);
            }
            catch (e) {
                return reject(e);
            }
            if (_next.done) {
                return resolve(_next.value);
            }
            Promise.resolve(_next.value).then(function (res) {
                next(res);
            }, function (err) {
                _g.throw(err);
            });
        }
        next();
    });
}
//# sourceMappingURL=async.js.map