/* complex_code.js */

// This code is an implementation of a binary search tree data structure along with various operations on it.
// It includes operations like insert, delete, search, minimum, maximum, and traversal functions like inorder, preorder, and postorder.

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(rootNode, value) {
    if (rootNode === null) {
      return null;
    }

    if (value < rootNode.value) {
      rootNode.left = this.deleteNode(rootNode.left, value);
    } else if (value > rootNode.value) {
      rootNode.right = this.deleteNode(rootNode.right, value);
    } else {
      if (rootNode.left === null && rootNode.right === null) {
        rootNode = null;
      } else if (rootNode.left === null) {
        rootNode = rootNode.right;
      } else if (rootNode.right === null) {
        rootNode = rootNode.left;
      } else {
        const minValue = this.findMinNode(rootNode.right).value;
        rootNode.value = minValue;
        rootNode.right = this.deleteNode(rootNode.right, minValue);
      }
    }

    return rootNode;
  }

  search(value) {
    return this.searchNode(this.root, value);
  }

  searchNode(node, value) {
    if (node === null) {
      return false;
    }

    if (value < node.value) {
      return this.searchNode(node.left, value);
    } else if (value > node.value) {
      return this.searchNode(node.right, value);
    }

    return true;
  }

  findMin() {
    if (this.root === null) {
      return null;
    }

    return this.findMinNode(this.root).value;
  }

  findMinNode(node) {
    if (node.left === null) {
      return node;
    }

    return this.findMinNode(node.left);
  }

  findMax() {
    if (this.root === null) {
      return null;
    }

    return this.findMaxNode(this.root).value;
  }

  findMaxNode(node) {
    if (node.right === null) {
      return node;
    }

    return this.findMaxNode(node.right);
  }

  inorderTraversal(callback) {
    this.inorderTraversalNode(this.root, callback);
  }

  inorderTraversalNode(node, callback) {
    if (node !== null) {
      this.inorderTraversalNode(node.left, callback);
      callback(node.value);
      this.inorderTraversalNode(node.right, callback);
    }
  }

  preorderTraversal(callback) {
    this.preorderTraversalNode(this.root, callback);
  }

  preorderTraversalNode(node, callback) {
    if (node !== null) {
      callback(node.value);
      this.preorderTraversalNode(node.left, callback);
      this.preorderTraversalNode(node.right, callback);
    }
  }

  postorderTraversal(callback) {
    this.postorderTraversalNode(this.root, callback);
  }

  postorderTraversalNode(node, callback) {
    if (node !== null) {
      this.postorderTraversalNode(node.left, callback);
      this.postorderTraversalNode(node.right, callback);
      callback(node.value);
    }
  }
}

// Example usage:

const bst = new BinarySearchTree();
bst.insert(50);
bst.insert(30);
bst.insert(70);
bst.insert(20);
bst.insert(40);
bst.insert(60);
bst.insert(80);

console.log("Inorder traversal:");
bst.inorderTraversal((value) => console.log(value));

console.log("Preorder traversal:");
bst.preorderTraversal((value) => console.log(value));

console.log("Postorder traversal:");
bst.postorderTraversal((value) => console.log(value));

console.log("Min value:", bst.findMin());
console.log("Max value:", bst.findMax());

console.log("Searching for 40:", bst.search(40));
console.log("Searching for 90:", bst.search(90));

bst.delete(40);
console.log("Inorder traversal after deleting 40:");
bst.inorderTraversal((value) => console.log(value));

// ... rest of the code ...
// ... additional functions and operations on the Binary Search Tree ...