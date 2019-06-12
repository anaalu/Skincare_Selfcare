dragula([document.getElementById('products')]);
var modal = document.getElementById('remove-product-modal');
var toBeRemoved = null;
var toBeEdited = null;

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display='none';
  }
}

var alertMsg = () => {
  alert("Sorry, this page is still being worked on!")
  return false;
}

var addProduct = () => {
  // TODO: AJAX call to add new product to server
  var prodList = document.getElementById('products');
  var newProd = createNewProduct();
  var removeButton = createRemoveBtn();
  var editButton = createEditBtn();

  newProd.appendChild(removeButton);
  newProd.appendChild(editButton);
  prodList.appendChild(newProd);

  return false;
}

var createNewProduct = () => {
  var name = document.getElementById('new-product-name').value;
  var newProd = document.createElement("div");

  newProd.setAttribute('class', 'item');
  newProd.textContent = name;

  return newProd;
}

var createRemoveBtn = () => {
  var removeButton = document.createElement("span");

  removeButton.innerHTML = '&times;'
  removeButton.setAttribute('class', 'closebtn edit-products-btn');
  removeButton.setAttribute('onclick', 'removeProduct(this.parentElement)');

  return removeButton;
}

var createEditBtn = () => {
  var editButton = document.createElement("span")

  editButton.setAttribute('class', 'editbtn edit-products-btn');
  editButton.setAttribute('onclick', 'openEditForm(this.parentElement)');
  editButton.textContent ='EDIT';

  return editButton;
}

var openEditForm = (dom) => {
  var product = dom.innerHTML.split("<")[0].trim();
  var form = document.getElementById('edit-products-form');
  toBeEdited = dom;

  document.getElementById('edit-instruction').style.display='none';
  document.getElementById('old-name').value = product;
  form.style.display='block';
}

var updateProduct = () => {
  // TODO: AJAX call to update product on server
  var newname = document.getElementById('new-name').value;
  var form = document.getElementById('edit-products-form');

  toBeEdited.innerHTML = newname +' <span class="closebtn edit-products-btn" onclick="removeProduct(this.parentElement)">&times;</span><span class="editbtn edit-products-btn" onclick="openEditForm(this.parentElement)">EDIT</span>'
  form.style.display='none';
  document.getElementById('edit-instruction').style.display='block';
  
  toBeEdited = null;
  return false;
}

var removeProduct = (dom) => {
  var product = dom.innerHTML.split("<")[0].trim();
  var modalMsg = document.getElementById('modal-message');
  modalMsg.innerHTML='Are you sure you would like to remove "' + product + '"? <br> Doing so will remove the product from pre-made routines, but old calendar entries with this product will remain in tact.'

  document.getElementById('remove-product-modal').style.display='block';
  toBeRemoved = dom;
}

var closeModal = () => {
  modal.style.display='none';
  toBeRemoved = null;
}

var removeProductFromList = () => {
  // TODO: AJAX call to remove product from server

  var modalMsg = document.getElementById('modal-message');
  toBeRemoved.style.display='none';
  toBeRemoved = null;
  modal.style.display='none';
}