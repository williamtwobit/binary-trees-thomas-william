class BinarySearchTree{
  constructor(key=null,value=null,parent=null){
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value){
    if(this.key === null){
      this.key = key;
      this.value = value;
    }
    else if(key < this.key){
      if(this.left === null){
        this.left = new BinarySearchTree(key, value, this);
      }
      else{
        this.left.insert(key,value);
      }
    }
    else{
      if(this.right === null){
        this.right = new BinarySearchTree(key, value, this);
      }
      else{
        this.right.insert(key,value);
      }
    }
  }

  get(key) {
    if (this.key === key) {
      return this.value;
    }
    else if (key < this.key && this.left) {
      this.left.get(key);
    }
    else if (key > this.key && this.right) {
      return this.right.get(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        // successor = this.left._findMax();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      else if (this.left) {
        this._replaceWith(this.left);
      }
      else if (this.right) {
        this._replaceWith(this.right);
      }
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      }
      else if (this === this.parent.right) {
        this.parent.right = node;
      }
      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

// const testTree = new BinarySearchTree;

// function populateRandom(count){
//   for(let i=0; i<count; i++){
//     let num = Math.floor(Math.random() * 10);
//     console.log('inserting:', num);
//     testTree.insert(num);
//   }
//   console.log(testTree);
// }

// populateRandom(14);

// function populateString(string){
//   for(let i=0; i<string.length; i++){
//     console.log('inserting:', string[i]);
//     testTree.insert(string[i], string[i]);
//   }
//   console.log(testTree);
// }

// populateString('EASYQUESTION');


const heightTree = new BinarySearchTree;

function populateTree(valArr){
  for(let i=0; i<valArr.length; i++){
    heightTree.insert(valArr[i], valArr[i]);
  }
  console.log('Tree: ', heightTree);
}

populateTree([69,65,83,89,81,85,69,83,84,73,79,78]);

function findHeight(tree, depth=0, height){
  height = 0;
  if(!tree.left && !tree.right){
    console.log(tree);
    console.log();
    console.log('depth at bottom: ', depth);
    if (depth > height){
      height = depth;
    }
    console.log('height at bottom', height);
    return height;
  }
  depth++;
  if(tree.left){
    let num = findHeight(tree.left, depth, height)
    if(num > height){
      height = num;
    }
  }
  if(tree.right){
    let num = findHeight(tree.right, depth, height);
    if(num > height){
      height = num;
    }
  }
  return height;
}

console.log(`THE HEIGHT OF THE TREE IS:`, findHeight(heightTree));