


// -------update Cart on every page load---------------//
let totalProductsInCart = localStorage.getItem('productsInCart');

function updateCartOnLoad() {
    if (totalProductsInCart > 0) {
        document.querySelector('.popup').textContent = totalProductsInCart;
        document.querySelector('.popup').classList.add('triggerPopup');

    }
}


// --------- Display Items in Cart------------//
//-------------------------------------------//

function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem('categoryOfItemsInCart'));
    let totalPrice = JSON.parse(localStorage.getItem('totalCost'));
    let display = document.querySelector('.cart');
    let productDetail = JSON.parse(localStorage.getItem('productDetail'));


    if (cartItems && display) {
        display.innerHTML = '';
        Object.values(cartItems).map(item => {

            display.innerHTML += `
            <main class="container">    
            
            <section class="cart row"> 

                <div class="col-md-3 productImage">
                <img src=${item.image}> 
                </div>

            <div class="col-md-6 productDetail ">
           <div class=itemName> ${item.name}</div>
            <div>Size: <span>${item.size}</span></div>
            <div>Quantity: <span>${item.quantity}</span></div>
            <div><b>Price</b>: <span>${item.price}</span></div>
            
            </div>
<div class="col-md-3"> <a href="#" class="remove">Remove this item</a></div>

            </section>


</main>
                `;


        });

        display.innerHTML += `
        
        <div class="totalPrice">

        <b> Total Price</b> : $${totalPrice} 

            </div>

            <div id="accountAndAddressForm"> 
<form type="#" id="orderPlacementForm">
<div><input type="text" placeholder="Account Number" required> </div>
<div><input type="text" placeholder="Address" required> </div>
            <button class="btn-placeOrder">PLACE YOUR ORDER</button> 

            </form>

            </div>
        
        `;




        // -----------------Removing items from Cart-------------------//
        //-------------------------------------------------------------//
        let removeItemButton = document.querySelectorAll('.remove');

        for (let i = 0; i < removeItemButton.length; i++) {

            removeItemButton[i].addEventListener('click', () => {
                let itemName = removeItemButton[i].parentElement.parentElement.children[1].children[0].innerText;
                // console.log(itemName);
                let itemSize = removeItemButton[i].parentElement.parentElement.children[1].children[1].children[0].innerText.toUpperCase();
                // console.log(itemSize);

                let finalItemName = itemName.concat('_', itemSize);
                // console.log(finalItemName);


                if (cartItems[finalItemName]) {
                    delete cartItems[finalItemName];
                    removeItemButton[i].parentElement.parentElement.remove();

                    let boughtQuantity = removeItemButton[i].parentElement.parentElement.children[1].children[2].children[0].innerText;

                    let pricePerUnit = removeItemButton[i].parentElement.parentElement.children[1].children[3].children[1].innerText.slice(1, 3);


                    let deduction = boughtQuantity * pricePerUnit;

                    totalPrice = totalPrice - deduction;


                    totalProductsInCart = totalProductsInCart - 1;

                }
                if (totalProductsInCart > 0) {
                    localStorage.setItem('categoryOfItemsInCart', JSON.stringify(cartItems));
                    localStorage.setItem('totalCost', JSON.stringify(totalPrice));
                    localStorage.setItem('productsInCart', JSON.stringify(totalProductsInCart));
                }
                else {
                    localStorage.clear();
                    localStorage.remove('totalCost', 'productsInCart', 'categoryOfItemsInCart', 'productDetail');
                }



            });
        }





    }

    else if (!cartItems && display) {
        display.innerHTML = `
        
        <main class="container">  <h1>You bought nothing.</h1> </main>
        
        `;

    }


    let confirmOrderButton = document.querySelector('.btn-placeOrder');
    confirmOrderButton.addEventListener('click', (e) => {
        e.preventDefault();


        display.innerHTML = `
        
        <main class="container">  <h1>Your Order has been confirmed. 
        Thank you for shopping with us.</h1> </main>
        
        `;

        localStorage.clear();
        localStorage.remove('totalCost', 'productsInCart', 'categoryOfItemsInCart', 'productDetail');
    });

}






updateCartOnLoad();
displayCart();