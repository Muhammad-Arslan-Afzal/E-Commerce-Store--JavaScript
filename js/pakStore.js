
const swiper = new Swiper('.swiper', {

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },


});



// product Slider

$(document).ready(function () {
    $('.autoWidth').lightSlider({
        autoWidth: true,
        loop: true,
        onSliderLoad: function () {
            $('.autoWidth').removeClass('cS-hidden');
        }
    });
});






// -------------------------------------------------------
// -------------------------------------------------------

// buying page information load

let buyButton = document.querySelectorAll('.buy-btn');

for (let i = 0; i < buyButton.length; i++) {
    // console.log(buyButton[i]);
    buyButton[i].addEventListener('click', () => {
        const productImage = buyButton[i].parentElement.parentElement.children[0].src;
        // let transferredImage = localStorage.setItem('imageSource', JSON.stringify(image));

        const productName = buyButton[i].parentElement.parentElement.nextElementSibling.childNodes[1].children[0].innerText;

        const productPrice = buyButton[i].parentElement.parentElement.nextElementSibling.children[1].innerText;

        localStorage.setItem('productDetail', JSON.stringify({ image: productImage, name: productName, price: productPrice }));

    });
}


// -------update Cart on every page load---------------//

function updateCartOnLoad() {
    let totalProductsInCart = localStorage.getItem('productsInCart');
    if (totalProductsInCart > 0) {
        document.querySelector('.popup').textContent = totalProductsInCart;
        document.querySelector('.popup').classList.add('triggerPopup');

    }
}




// ------------- Move to product page-------------//
//-----------------------------------------------//

// let productLink = document.querySelectorAll('.dropdown-link a');

// for (let j = 0; j < productLink.length; j++) {

//     productLink[j].addEventListener('click', () => {
//         console.log(productLink[j].innerText);

//         console.log(productLink[j].parentElement.parentElement.parentElement.parentElement.children[0].innerText);
//     });
// }







updateCartOnLoad();