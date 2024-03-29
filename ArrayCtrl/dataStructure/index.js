var Node = /** @class */ (function () {
    function Node(obj) {
        this.pre = null;
        this.next = null;
        this.target = obj;
        this.val();
    }
    Node.prototype.val = function () {
        return this.target;
    };
    return Node;
}());
export { Node };
/**
 * 双向链表
 * 功能：
 * 1、头部增加节点
 * 2、尾部增加节点
 * 3、头部删除节点(弹出头部节点)
 * 4、尾部删除节点(弹出尾部节点)
 * 5、判断节点是否在链表中
 * 6、删除指定的节点
 * 7、在指定节点的前或后增加节点
 * 8、获取链表的节点个数
 * 9、打印所有节点
 * 10.反转链表
 */
var DoubleLinkList = /** @class */ (function () {
    function DoubleLinkList() {
        this.size = 0;
        this.head = null;
        this.tail = null;
    }
    //向头部增加节点
    DoubleLinkList.prototype.addOnHead = function (node) {
        var _node = new Node(node);
        if (this.size === 0) {
            this.head = _node;
            this.tail = _node;
            _node.pre = null;
            _node.next = null;
            this.size += 1;
        }
        else {
            var old_head = this.head;
            this.head = _node;
            _node.next = old_head;
            old_head.pre = _node;
            this.size += 1;
        }
    };
    //向尾部增加节点
    DoubleLinkList.prototype.addOnTail = function (node) {
        var _node = new Node(node);
        if (this.size === 0) {
            this.head = _node;
            this.tail = _node;
            _node.pre = null;
            _node.next = null;
            this.size += 1;
        }
        else {
            var old_tail = this.tail;
            this.tail = _node;
            _node.pre = old_tail;
            old_tail.next = _node;
            this.size += 1;
        }
    };
    //头部删除节点
    DoubleLinkList.prototype.deleteOnHead = function () {
        if (this.size === 0) {
            console.error('No Node In DoubleLinkList!');
            return;
        }
        if (this.size < 2) {
            var currentNode = this.head;
            this.head = null;
            this.tail = null;
            this.size = 0;
            return currentNode;
        }
        if (this.size >= 2) {
            var old_head = this.head;
            var new_head = old_head.next;
            if (this.size === 2) {
                this.size = 0;
                this.head = null;
                this.tail = null;
                this.addOnHead(new_head.target);
            }
            else {
                this.head = new_head;
                new_head.pre = null;
                this.size = this.size - 1;
            }
            return new_head;
        }
    };
    //尾部删除节点
    DoubleLinkList.prototype.deleteOnTail = function () {
        if (this.size === 0) {
            console.error('No Node In DoubleLinkList!');
            return;
        }
        if (this.size < 2) {
            var currentNode = this.tail;
            this.head = null;
            this.tail = null;
            this.size = 0;
            return currentNode;
        }
        if (this.size >= 2) {
            var old_tail = this.tail;
            var new_tail = old_tail.pre;
            if (this.size === 2) {
                this.size = 0;
                this.head = null;
                this.tail = null;
                this.addOnTail(new_tail.target);
            }
            else {
                this.tail = new_tail;
                new_tail.next = null;
                this.size = this.size - 1;
            }
            return new_tail;
        }
    };
    //判断节点是否在链表中
    DoubleLinkList.prototype.getNode = function (val) {
        var _node = new Node(val);
        var currentNode = this.head;
        if (this.size === 0) {
            return false;
        }
        else {
            var length_1 = this.size;
            var c = JSON.stringify(currentNode.target);
            var n = JSON.stringify(_node.target);
            while (c != n) {
                if (length_1 > 1) {
                    currentNode = currentNode.next;
                    c = JSON.stringify(currentNode.target);
                    length_1 = length_1 - 1;
                }
                else {
                    return false;
                }
            }
            return true;
        }
    };
    //删除指定的节点
    DoubleLinkList.prototype.removeNode = function (val) {
        var _node = new Node(val);
        var judgeNode = this.getNode(val);
        if (judgeNode === false) {
            console.error('No This Node In DoubleLinkList!');
            return;
        }
        if (this.size === 1) {
            var h = JSON.stringify(this.head.target);
            var n = JSON.stringify(_node.target);
            if (h === n) {
                this.head = null;
            }
            if (h === n) {
                this.tail = null;
            }
            this.size = 0;
        }
        else {
            var currentNode = this.head;
            var c = JSON.stringify(currentNode.target);
            var n = JSON.stringify(_node.target);
            while (c != n) {
                currentNode = currentNode.next;
                c = JSON.stringify(currentNode.target);
            }
            ;
            var preNode = currentNode.pre === null ? null : currentNode.pre;
            var nextNode = currentNode.next === null ? null : currentNode.next;
            if (preNode === null) {
                this.deleteOnHead();
            }
            if (nextNode === null) {
                this.deleteOnTail();
            }
            if (preNode !== null && nextNode !== null) {
                preNode.next = nextNode;
                nextNode.pre = preNode;
            }
        }
    };
    /**
     *
     * @param val 要插入的节点
     * @param ele 被插入的节点
     * @param type 插入的位置：next or pre
     */
    DoubleLinkList.prototype.insertNode = function (val, ele, type) {
        var _ele = new Node(ele);
        var _node = new Node(val);
        var currentNode = this.head;
        var c = JSON.stringify(currentNode.target);
        var e = JSON.stringify(_ele.target);
        if (!this.getNode(ele)) {
            console.error("Can Not Find Node " + e);
            return;
        }
        while (c !== e) {
            currentNode = currentNode.next;
            c = JSON.stringify(currentNode.target);
        }
        _ele = currentNode;
        if (type === 'next') {
            if (_ele.next === null) {
                this.addOnTail(_node.target);
                return;
            }
            var nextNode = _ele.next;
            var nextNextNode = nextNode.next;
            _node.pre = nextNode;
            _node.next = nextNextNode;
            nextNode.next = _node;
            nextNextNode.pre = _node;
        }
        if (type === 'pre') {
            if (_ele.pre === null) {
                this.addOnHead(_node.target);
                return;
            }
            var preNode = _ele.pre;
            var prePreNode = preNode.pre;
            _node.pre = prePreNode;
            _node.next = preNode;
            prePreNode.next = _node;
            preNode.pre = _node;
        }
        return _node;
    };
    //获取链表的节点个数
    DoubleLinkList.prototype.countNodes = function () {
        return this.size;
    };
    //打印所有节点
    DoubleLinkList.prototype.getAllNode = function () {
        var str = '';
        var currentNode = this.head;
        if (currentNode === null)
            return;
        while (currentNode.next !== null) {
            var targetContent = typeof (currentNode.target) === 'function' ? String(currentNode.target) : JSON.stringify(currentNode.target);
            str = str + targetContent;
            currentNode = currentNode.next;
        }
        str = str + JSON.stringify(this.tail.target);
        console.log(str);
    };
    //反转链表
    DoubleLinkList.prototype.reverseAll = function () {
        var new_doubleLinkList = new DoubleLinkList();
        var cur = this.head;
        while (cur.next != null) {
            var next = cur.next;
            new_doubleLinkList.addOnHead(cur.target);
            cur = next;
        }
        ;
        this.head = new_doubleLinkList.head;
        this.addOnHead(cur.target);
        this.tail = new_doubleLinkList.tail;
    };
    return DoubleLinkList;
}());
export { DoubleLinkList };
var Stack = /** @class */ (function () {
    function Stack() {
        this.length = 0;
        this.doubleLink = new DoubleLinkList();
        this.length = this.doubleLink.countNodes();
    }
    ;
    /**
     * 把一个元素推入栈中
     * @param item :推入栈顶的元素
     * @returns {number} 此时栈内元素的数量
     */
    Stack.prototype.push = function (item) {
        var index = NaN;
        var currentItem = item;
        var size = this.doubleLink.countNodes();
        this.doubleLink.addOnHead(currentItem);
        this.length = this.doubleLink.countNodes();
        index = size + 1;
        return index;
    };
    /**
     * 弹出栈顶的元素
     * @param
     * @returns {any} 被弹出的元素
     */
    Stack.prototype.pop = function () {
        if (this.length === 0)
            return null;
        var result;
        result = this.doubleLink.head;
        this.doubleLink.deleteOnHead();
        this.length = this.doubleLink.countNodes();
        return result.target;
    };
    /**
     * 清空栈
     */
    Stack.prototype.clear = function () {
        var size = this.doubleLink.countNodes();
        while (size > 1) {
            this.doubleLink.deleteOnHead();
            size = this.doubleLink.countNodes();
        }
        ;
        this.length = this.doubleLink.countNodes();
        return;
    };
    /**
     * 打印栈内所有元素
     */
    Stack.prototype.getAll = function () {
        var head = this.doubleLink.head;
        var arr = [];
        var current;
        var size = this.doubleLink.countNodes();
        var count = 0;
        while (count < size) {
            var cur = head;
            arr.push(cur.target);
            head = cur.next;
            count++;
        }
        return arr;
    };
    return Stack;
}());
export { Stack };
/**
 * 队列生成器
 * size:属性，当前队列长度
 * pop:出列操作，弹出最近入列元素并返回
 * push:入列操作
 * clear:清空队列
 * getAll:打印队列中所有的元素
 */
var Queue = /** @class */ (function () {
    function Queue() {
        /** 队列大小 */
        this.count = 0;
        /**队列头部元素指针 */
        this.headIndex = 0;
        /** 队列实体 */
        this.queue = {};
        this.init();
    }
    /** 初始化方法 */
    Queue.prototype.init = function () {
        this.count = 0;
        this.headIndex = 0;
        this.queue = {};
    };
    /** 推入一个元素到队列尾部 */
    Queue.prototype.push = function (item) {
        this.queue[this.count] = item;
        this.count++;
    };
    /** 获取队列的大小 */
    Queue.prototype.size = function () {
        return this.count - this.headIndex;
    };
    /** 弹出队列头部元素 */
    Queue.prototype.pop = function () {
        var len = this.size();
        if (len <= 0)
            return undefined;
        var result = this.queue[this.headIndex];
        delete this.queue[this.headIndex];
        this.headIndex++;
        return result;
    };
    /** 清空队列 */
    Queue.prototype.clear = function () {
        this.init();
    };
    /** 打印队列内部所有元素 */
    Queue.prototype.getAll = function () {
        var result = [];
        for (var i = this.headIndex; i < this.count; i++) {
            result.push(this.queue[i]);
        }
        console.log(result);
    };
    return Queue;
}());
export { Queue };
/**
 * 双端队列生成器
 * size:属性，当前队列长度
 * pop:出列操作，弹出队列尾部元素并返回
 * shift: 弹出队列头部元素并返回
 * unshift: 插入元素到队列头部
 * push:插入元素到队列尾部
 * clear:清空队列
 * getAll:打印队列中所有的元素
 */
var DeQueue = /** @class */ (function () {
    function DeQueue() {
        /** 队列大小 */
        this.count = 0;
        /**队列头部元素指针 */
        this.headIndex = 0;
        /** 队列实体 */
        this.queue = {};
        this.init();
    }
    /** 初始化方法 */
    DeQueue.prototype.init = function () {
        this.count = 0;
        this.headIndex = 0;
        this.queue = {};
    };
    /** 推入一个元素到队列尾部 */
    DeQueue.prototype.push = function (item) {
        this.queue[this.count] = item;
        this.count++;
    };
    /** 获取队列的大小 */
    DeQueue.prototype.size = function () {
        return this.count - this.headIndex;
    };
    /** 弹出队列尾部元素 */
    DeQueue.prototype.pop = function () {
        var len = this.size();
        if (len <= 0)
            return undefined;
        var result = this.queue[this.count - 1];
        delete this.queue[this.count - 1];
        this.count--;
        return result;
    };
    /** 弹出队列头部元素 */
    DeQueue.prototype.shift = function () {
        var len = this.size();
        if (len <= 0)
            return undefined;
        var result = this.queue[this.headIndex];
        delete this.queue[this.headIndex];
        this.headIndex++;
        return result;
    };
    /** 插入元素到队列头部 */
    DeQueue.prototype.unshift = function (item) {
        if (this.size() <= 0) {
            this.push(item);
        }
        else {
            if (this.headIndex > 0) {
                // 队首元素指针不为0时
                this.headIndex--;
                this.queue[this.headIndex] = item;
            }
            else {
                // 队首元素指针为0，我们需要将将队列里的0号key空出来，其他数据整体向后移动一位。
                for (var i = this.count; i > 0; i--) {
                    this.queue[i] = this.queue[i - 1];
                }
                // 队列长度自增
                this.count++;
                // 队首元素设为0
                this.headIndex = 0;
                // 为队首的0号key添加当前元素
                this.queue[0] = item;
            }
        }
    };
    /** 清空队列 */
    DeQueue.prototype.clear = function () {
        this.init();
    };
    /** 打印队列内部所有元素 */
    DeQueue.prototype.getAll = function () {
        var result = [];
        for (var i = this.headIndex; i < this.count; i++) {
            result.push(this.queue[i]);
        }
        console.log(result);
    };
    return DeQueue;
}());
export { DeQueue };
//# sourceMappingURL=index.js.map