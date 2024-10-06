class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DouleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(value) {
    let newNode = new Node(value);
    if (this.head == null && this.length == 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  pop() {
    if (this.tail == null || this.head == null) return undefined;

    let removerTail = this.tail;
    let newTail = removerTail.prev;
    if (newTail) {
      newTail.next = null;
      this.tail = newTail;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.length--;
    if (this.length == 0) {
      this.head = null;
      this.tail = null;
    }
    return removerTail;
  }
  shift() {
    if (this.length == 0) return undefined;
    let oldHead = this.head;

    if (this.length == 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      this.head.prev = null;
      oldHead.next = null;
    }

    this.length--;
    if (this.length == 0) {
      this.head = null;
      this.tail = null;
    }
    return oldHead;
  }
  unshift(val) {
    let newNode = new Node(val);
    if (this.length == 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      let oldNode = this.head;
      this.head.prev = newNode;
      this.head = newNode;
      this.head.next = oldNode;

      oldNode.prev = this.head;
    }
    this.length++;
    return this;
  }
  get(index) {
    if (index < 0 || index >= this.length) return null;
    let count = 0;
    let current = this.head;
    if (index <= this.length / 2) {
      while (index != count) {
        current = current.next;
        count++;
      }
    } else {
      current = this.tail;
      count = this.length - 1;
      while (index != count) {
        current = current.next;
        count--;
      }
    }
    return current;
  }

  set(val, index) {
    let foundNode = this.get(index);
    if (foundNode != null) {
      foundNode.value = val;
      return true;
    }
    return false;
  }
  insert(val, index) {
    if (index < 0 || index > this.length) return null;

    let newNode = new Node(val);

    if (index === 0) {
      this.unshift(val);
      return true;
    }

    if (index === this.length) {
      this.push(val);
      return true;
    }

    let oldNode = this.get(index);
    newNode.prev = oldNode.prev;
    newNode.next = oldNode;

    if (oldNode.prev) {
      oldNode.prev.next = newNode;
    }
    oldNode.prev = newNode;

    this.length++;
    return true;
  }
  remove(index) {
    if(index < 0 || index >= this.length) return undefined;
    if(index === 0) return this.shift();
    if(index === this.length - 1) return this.pop();

    let removedNode = this.get(index);
    let prevNode = removedNode.prev;
    let nextNode = removedNode.next;
  
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
    this.length--;

    return removedNode;

  }
}
