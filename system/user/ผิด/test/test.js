document.addEventListener("DOMContentLoaded", function () {
    renderCart();
});

function renderCart() {
    const cartContainer = document.getElementById("cart-container");
    const totalPriceElement = document.getElementById("total-price");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartContainer.innerHTML = ""; // เคลียร์รายการเก่า

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>ไม่มีสินค้าในตะกร้า</p>";
        totalPriceElement.innerHTML = "ราคารวม: 0 บาท";
        return;
    }

    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");

        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50">
            <div class="menu-details">
                <span class="menu-name">${item.name}</span>
                <span class="menu-price">${item.price} บาท</span>
                <div class="quantity-container">
                    <span class="menu-price">รวม: ${itemTotal} บาท</span>
                    <div class="number">
                        <button class="decrease" onclick="changeQuantity(${index}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase" onclick="changeQuantity(${index}, 1)">+</button>
                        <button onclick="removeItem(${index})">ลบ</button>
                    </div>
                </div>
            </div>
        `;
        cartContainer.appendChild(itemElement);
    });

    totalPriceElement.innerHTML = `ราคารวม: ${totalPrice} บาท`;
}

function changeQuantity(index, amount) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += amount;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart(); // อัปเดตหน้าตะกร้าโดยไม่ต้องโหลดใหม่
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart(); // อัปเดตหน้าตะกร้าโดยไม่ต้องโหลดใหม่
}







function checkout() {
    alert("ดำเนินการสั่งซื้อสำเร็จ!");
    localStorage.removeItem("cart");
    renderCart();
}