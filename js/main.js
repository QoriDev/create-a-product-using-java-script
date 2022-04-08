const createElement = function(elName, className, textContent, image) {
    const createdElement = document.createElement(elName);
    createdElement.className = className;

    if (textContent) {
        createdElement.textContent = textContent
    } else {
        createdElement.src = image
    }
    return createdElement;
}

const addZero = function(number) {
    return number < 10 ? "0" + number : number 
}

const dateShow = function(dateString) {
    const date = new Date(dateString);

    return `${addZero(date.getDate())}.${addZero(date.getMonth())}.${date.getFullYear()}`
}

const renderProduct = function(product){

    const {id,  title, img, price, model, addedDate,benefits} = product;

    const productItem = createElement("li", "col-4", "", "");

    const productDivWrapper = createElement("div", "card", "", "")
    const productImg = createElement("img", "card-img-top", "", img);
    const productDivWrap = createElement("div", "card-body", "", "")
    const productTitle = createElement("h3", "card-title", title, "");
    const productPrice = createElement("p", "card-text fw-bold", price, "");
    const productPriceMark = createElement ("mark", "", "", "");
    const productPriceeMarkS = createElement("s", "", "9000000", "");
    const productPricee = createElement("p", "card-text","", "");
    const productPriceeS = createElement("s", "", "", "");
    const productModel = createElement("p", "badge bg-success", model, "");
    const productDate = createElement("p", "card-text", dateShow(addedDate), "");

    const productListInside = createElement("ul", "d-flex flex-wrap list-unstyled", "", "")

    const btnDivWrap = createElement("div", "position-absolute top-0 end-0 d-flex", "", "");

    const btnEdit = createElement("button", "btn rounded-0 btn-secondary", "", "")
    const btnEditIcon = createElement("i", "fa-solid fa-pen", "", "");
    btnEdit.append(btnEditIcon);

    const btnDel = createElement("button", "btn rounded-0 btn-danger", "", "");
    const btnDelIcon = createElement("i", "fa-solid fa-trash");
    btnDel.append(btnDelIcon);
    btnDel.setAttribute("data-product", id);

    btnDivWrap.append(btnEdit); 
    btnDivWrap.append(btnDel);

    productDivWrapper.append(productImg);
    productDivWrapper.append(productDivWrap);

    productDivWrap.append(productTitle);
    productDivWrap.append(productPrice);
    productDivWrap.append(productPriceMark);
    productDivWrap.append(productPriceeMarkS);
    productDivWrap.append(productPricee);
    productDivWrap.append(productPriceeS);
    productDivWrap.append(productModel);
    productDivWrap.append(productDate);
    productDivWrap.append(btnDivWrap)
    
    productItem.append(productDivWrapper);

    for (let k = 0; k < benefits.length; k++){
        const currentBenefits = benefits[k]
        const productItemInside = createElement("li", "badge bg-primary me-1 mb-1", currentBenefits, "")
        productDivWrap.append(productItemInside)
    }

    return productItem;
}

const renderProducts = function(){

    productList.innerHTML = "";
    for (i = 0; i < products.length; i++) {
        const currentProduct = products[i]; 
        const productItem = renderProduct(currentProduct); 
        productList.append(productItem);
    } 
}

const productList = document.querySelector("#manafactures");

productList.addEventListener("click", function(evt){
    if (evt.target.matches(".btn-danger")){
        const clickedItemId = +evt.target.dataset.product;

        const clickedItemIndex = products.findIndex(function(product){
            return product.id === clickedItemId
        })

        products.splice(clickedItemIndex, 1);

        renderProducts();      
    }
})

renderProducts();

const addForm = document.querySelector("#add-form");
const addProductModalEl = document.querySelector("#edit-student-modal")
const addProductModal = new bootstrap.Modal(addProductModalEl);
const addSelect = document.querySelector("#product-manufacturer")
 for (let i=0; i<manufacturers.length; i++){
    const addOption = createElement("option", "", manufacturers[i].name, "")
    addSelect.append(addOption)
     console.log(addOption)
}

addForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    const elements = evt.target.elements;

    const titleInput = elements.title;
    const priceInput = elements.price;
    const benefitsInput = elements.benefits;
    const manufacturerInput = elements["product-manufacturer"];
    
    const titleValue = titleInput.value;
    const priceValue = priceInput.value;
    const imgValue = "https://picsum.photos/300/200?random=1"; 
    const manufacturerValue = manufacturerInput.value;
    const benefitsValue = benefitsInput.value.split(";");
    
    
    if (titleValue.trim() && priceValue.trim()){
        const product = {
            id : Math.floor(Math.random() * 1000),
            title : titleValue,
            img : imgValue,
            model : manufacturerValue,
            price : priceValue, 
            addedDate : new Date().toISOString(),
            benefits : benefitsValue,
        }
        products.push(product);

        addForm.reset();
        addProductModal.hide(); 
        const productItem = renderProduct(product); 
        productList.append(productItem);

    }
  
});







  