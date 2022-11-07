// Product loading---------------------------

let productToBuy = JSON.parse(localStorage.getItem('productDetail'));

let productImage = document.querySelector('.slide-img img');
productImage.setAttribute('src', productToBuy.image);

let productName = document.querySelector('.type a');
productName.textContent = productToBuy.name;

let productPrice = document.querySelector('.price');
productPrice.textContent = productToBuy.price;



// ------------------Quantity changing--------------------------------//
// -------------------------------------------------------------------//

const minusButton = document.querySelector('.minus');
const plusButton = document.querySelector('.plus');
const selectedQuantity = document.querySelector('.selectedquantity');
const selectedSize = document.querySelector('.size');

let quantity = selectedQuantity.innerText;

minusButton.addEventListener('click', () => {

    let quantity = selectedQuantity.innerText;
    if (quantity > 1) {
        quantity = quantity - 1;
        selectedQuantity.innerText = quantity;
    }

});

plusButton.addEventListener('click', () => {
    let quantity = selectedQuantity.innerText;
    quantity = parseInt(quantity) + 1;
    selectedQuantity.innerText = quantity;
});





// ----------------Adding to cart--------------------------------//
// --------------------------------------------------------------//

const addToCartButton = document.querySelector('.btn-addToBag');
let size = document.querySelector('.size');
let cart = document.querySelector('.popup');



addToCartButton.addEventListener('click', () => {

    if (size.value) {

        addItemToCart();
        allItemsInCart();
        costCalculator();
    }
    else {
        alert('Choose your size')
    }
});

// --------------Cost Calculator ---------------------//

function costCalculator() {

    let cost = JSON.parse(localStorage.getItem('totalCost'));
    cost = cost + parseInt(productPrice.textContent.slice(1, 3)) * selectedQuantity.innerText;
    localStorage.setItem('totalCost', JSON.stringify(cost));
}
// ---------------------------------------------------



function addItemToCart() {
    let totalProducts = localStorage.getItem('productsInCart');
    totalProducts = parseInt(totalProducts);
    if (totalProducts) {
        localStorage.setItem('productsInCart', totalProducts + 1);
        cart.textContent = totalProducts + 1;
        cart.classList.add('triggerPopup');
    }

    else {

        localStorage.setItem('productsInCart', 1);
        cart.textContent = 1;
        cart.classList.add('triggerPopup');
    }


}





// -------update Cart on every page load---------------//

function updateCartOnLoad() {
    let totalProductsInCart = localStorage.getItem('productsInCart');
    if (totalProductsInCart > 0) {
        cart.textContent = totalProductsInCart;
        cart.classList.add('triggerPopup');
    }
}




// --------------Keeping record of items in cart------------------//
// ---------------------------------------------------------------//


function addFirstItemToCart(item) {

    Object.assign(productToBuy, { size: size.value, quantity: selectedQuantity.innerText });

    if (size.value === 's') {

        key = item.concat('_S');
        itembeingAddedtoCart = { [key]: productToBuy };
    }

    else if (size.value === 'm') {

        key = item.concat('_M');
        itembeingAddedtoCart = { [key]: productToBuy };
    }

    else {

        key = item.concat('_L');
        itembeingAddedtoCart = { [key]: productToBuy };
    }

    localStorage.setItem('categoryOfItemsInCart', JSON.stringify(itembeingAddedtoCart));

}






function addMoreItemsToCart(productName, previousItemsInCart) {
    // let itemsAlreadyInCart = JSON.parse(localStorage.getItem('categoryOfItemsInCart'));
    let updatedQuantity;
    let itembeingAddedtoCart;
    if (size.value === 's') {
        key = productName.concat('_S');

        if (key in previousItemsInCart === false) {

            Object.assign(productToBuy, { size: size.value, quantity: selectedQuantity.innerText });

            itembeingAddedtoCart = {
                ...previousItemsInCart,
                [key]: productToBuy
            };
        }

        else if (key in previousItemsInCart) {

            updatedQuantity = parseInt(selectedQuantity.innerText) + parseInt(previousItemsInCart[key].quantity);
            Object.assign(productToBuy, { size: size.value, quantity: updatedQuantity });

            itembeingAddedtoCart = {
                ...previousItemsInCart,
                [key]: productToBuy
            };
        }

    }


    else if (size.value === 'm') {
        key = productName.concat('_M');

        if (key in previousItemsInCart === false) {

            Object.assign(productToBuy, { size: size.value, quantity: selectedQuantity.innerText });

            itembeingAddedtoCart = {
                ...previousItemsInCart,
                [key]: productToBuy
            };
        }

        else if (key in previousItemsInCart) {

            updatedQuantity = parseInt(selectedQuantity.innerText) + parseInt(previousItemsInCart[key].quantity);
            Object.assign(productToBuy, { size: size.value, quantity: updatedQuantity });

            itembeingAddedtoCart = {
                ...previousItemsInCart,
                [key]: productToBuy
            };
        }

    }

    else {
        key = productName.concat('_L');

        if (key in previousItemsInCart === false) {

            Object.assign(productToBuy, { size: size.value, quantity: selectedQuantity.innerText });

            itembeingAddedtoCart = {
                ...previousItemsInCart,
                [key]: productToBuy
            };
        }

        else if (key in previousItemsInCart) {

            updatedQuantity = parseInt(selectedQuantity.innerText) + parseInt(previousItemsInCart[key].quantity);
            Object.assign(productToBuy, { size: size.value, quantity: updatedQuantity });

            itembeingAddedtoCart = {
                ...previousItemsInCart,
                [key]: productToBuy
            };
        }

    }

    localStorage.setItem('categoryOfItemsInCart', JSON.stringify(itembeingAddedtoCart));

}







function allItemsInCart() {

    let itembeingAddedtoCart;

    let itemsAlreadyInCart = JSON.parse(localStorage.getItem('categoryOfItemsInCart'));

    if (itemsAlreadyInCart) {

        addMoreItemsToCart(productToBuy.name, itemsAlreadyInCart);
    }

    else {

        addFirstItemToCart(productToBuy.name);

    }

}




















updateCartOnLoad();