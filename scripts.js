const featureButtons = document.querySelectorAll(".featureBtn");
const detailsSection = document.getElementById("details");
const detailsHeader = document.getElementById("detailsHeader");
const detailsContent = document.getElementById("detailsContent");
const cartSection = document.getElementById("cartSection");
const cartItems = document.getElementById("cartItems");
const paymentBtn = document.getElementById("paymentBtn");
const trackOrderBtn = document.getElementById("trackOrderBtn");
const logoutBtn = document.getElementById("logoutBtn");
const wishlistSection = document.getElementById("wishlistSection");
const exclusiveOffersSection = document.getElementById("exclusiveOffersSection");

// Cart count element added
const cartCount = document.createElement('span');
cartCount.id = "cartCount";
cartCount.style.fontSize = "14px";
cartCount.style.backgroundColor = "red";
cartCount.style.color = "white";
cartCount.style.padding = "2px 8px";
cartCount.style.borderRadius = "50%";
cartCount.style.display = "none";
cartSection.querySelector('h2').appendChild(cartCount); // Attach cart count to cart heading

let cart = [];
let wishlist = []; // Initialize wishlist array

// Event Listeners for Features
featureButtons.forEach(button => {
    button.addEventListener("click", function () {
        const feature = this.getAttribute("data-feature");
        showFeatureDetails(feature);
    });
});

// Show feature details (Makeup, Skincare, Haircare)
function showFeatureDetails(feature) {
    detailsSection.style.display = "block";
    detailsContent.innerHTML = ""; // Clear previous content

    if (feature === "makeup") {
        detailsHeader.textContent = "Makeup Products";
        const makeupProducts = [
            { name: "Lipstick", price: "₹960", img: "lipstick.jpg" },
            { name: "Foundation", price: "₹800", img: "foundation.jpg" },
            { name: "Mascara", price: "₹250", img: "mascara.jpg" },
            { name: "Kajal", price: "₹326", img: "kajal.jpg" },
            { name: "Concealer", price: "₹999", img: "cocealer.jpg" },
            { name: "Eyeshadow", price: "₹400", img: "eyeshadow.jpg" }
        ];
        displayProducts(makeupProducts);
    } else if (feature === "skincare") {
        detailsHeader.textContent = "Select Skin Type";
        const skinTypes = ["Dry", "Sensitive", "Oily"];
        skinTypes.forEach(skinType => {
            detailsContent.innerHTML += `<button class="skinTypeBtn" data-skin="${skinType.toLowerCase()}">${skinType}</button>`;
        });

        document.querySelectorAll(".skinTypeBtn").forEach(button => {
            button.addEventListener("click", function () {
                const skinType = this.getAttribute("data-skin");
                showSkinProducts(skinType);
            });
        });
    } else if (feature === "haircare") {
        detailsHeader.textContent = "Hair Care Products";
        const hairCareProducts = [
            { name: "Shampoo", price: "₹380", img: "sham.jpg" },
            { name: "Hair oil", price: "₹250", img: "oil.jpg" },
            { name: "Shampoo", price: "₹380", img: "cond.jpg" },
            { name: "Serum", price: "₹900", img: "sh.jpg" }
        ];
        displayProducts(hairCareProducts);
    } else if (feature === "myorders") {
        document.getElementById('orderHistory').style.display = "block";
    }
}

function displayProducts(products) {
    detailsContent.innerHTML = "";
    products.forEach(product => {
        detailsContent.innerHTML += `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: ${product.price}</p>
                <button class="addToCartBtn" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
                <button class="addToWishlistBtn" data-name="${product.name}">Add to Wishlist</button>
            </div>
        `;
    });

    document.querySelectorAll(".addToCartBtn").forEach(button => {
        button.addEventListener("click", function () {
            const productName = this.getAttribute("data-name");
            const productPrice = this.getAttribute("data-price");
            addToCart(productName, productPrice);
        });
    });

    document.querySelectorAll(".addToWishlistBtn").forEach(button => {
        button.addEventListener("click", function () {
            const productName = this.getAttribute("data-name");
            addToWishlist(productName);
        });
    });
}

function showSkinProducts(skinType) {
    const products = [
        { name: "Serum - Dry Skin", price: "₹560", img: "serumd.jpg", type: "dry" },
        { name: "Sunscreen - Dry Skin", price: "₹300", img: "sd.jpg", type: "dry" },
        { name: "Moisturizer - Dry Skin", price: "₹256", img: "md.jpg", type: "dry" },
        { name: "Serum - Oily Skin", price: "₹610", img: "serumo.jpg", type: "oily" },
        { name: "Sunscreen - Oily Skin", price: "₹450", img: "so.jpg", type: "oily" },
        { name: "Moisturizer - Oily Skin", price: "₹300", img: "mo.jpg", type: "oily" },
        { name: "Serum - Sensitive Skin", price: "₹590", img: "serums.jpg", type: "sensitive" },
        { name: "Sunscreen - Sensitive Skin", price: "₹400", img: "ss.jpg", type: "sensitive" },
        { name: "Moisturizer - Sensitive Skin", price: "₹356", img: "ms.jpg", type: "sensitive" }
    ];

    const filteredProducts = products.filter(product => product.type === skinType);
    displayProducts(filteredProducts);
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";
    cart.forEach((item, index) => {
        cartItems.innerHTML += `<p>${item.name} - ${item.price} <button onclick="removeFromCart(${index})">Remove</button></p>`;
    });

    if (cart.length > 0) {
        cartCount.textContent = cart.length;
        cartCount.style.display = "inline";
        paymentBtn.style.display = "block";
    } else {
        cartCount.style.display = "none";
        paymentBtn.style.display = "none";
    }
}

function addToWishlist(name) {
    if (!wishlist.includes(name)) {
        wishlist.push(name);
        alert(`${name} added to your wishlist!`);
        showWishlist();
    } else {
        alert(`${name} is already in your wishlist.`);
    }
}

function showWishlist() {
    wishlistSection.style.display = "block";
    const wishlistItems = wishlist.map(item => `<p>${item}</p>`).join('');
    document.getElementById('wishlistItems').innerHTML = wishlistItems;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

trackOrderBtn.addEventListener("click", function () {
    alert("Your order is being processed. Please check back later.");
});

logoutBtn.addEventListener("click", function () {
    window.location.href = "login.html";
});

paymentBtn.addEventListener("click", function () {
    if (cart.length > 0) {
        let total = 0;
        cart.forEach(item => {
            total += parseFloat(item.price.replace(/[₹$]/g, ''));
        });

        alert(`Proceeding to payment. Total amount: ₹${total.toFixed(2)}`);
        cart = [];
        updateCart();
    }
});

document.getElementById('offersBtn').addEventListener('click', function () {
    exclusiveOffersSection.style.display = 'block';
    document.getElementById('exclusiveOffersContent').innerHTML = "<p>Exclusive Offer: Buy 1 Get 1 Free on selected products!</p>";
});

document.getElementById('wishlistBtn').addEventListener('click', function () {
    showWishlist();
});