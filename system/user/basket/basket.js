document.addEventListener("DOMContentLoaded", function () {
    renderCart();
});

function renderCart() {
    const cartContainer = document.getElementById("menu-container"); 
    const totalPriceElement = document.getElementById("total-price");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartContainer.innerHTML = ""; 

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-message-Container">
                <i class='bx bx-basket'></i>
                <p class='empty-message' style=" font-size: 26px;">ไม่มีสินค้าในตะกร้า</p>
            </div>`;
        totalPriceElement.innerHTML = "ราคารวม: 0 บาท";
        return;
    }

    let totalPrice = 0;

    const table = document.createElement("table");
    table.classList.add("cart-table");
    table.innerHTML = `
        <tr>
            <th>สินค้า</th>
            <th>ราคา</th>
            <th>จำนวน</th>
            <th>รวม</th>
            <th>ลบ</th>
        </tr>
    `;

    cart.forEach((item, index) => {
        const row = document.createElement("tr");

        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        row.innerHTML = `
            <td style="display: flex; align-items: center; justify-content: space-evenly;"><img src="${item.image}" alt="${item.name}" width="80"> ${item.name}</td>
            <td>${item.price} บาท</td>
            <td>
                <button class="decrease" onclick="changeQuantity(${index}, -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="increase" onclick="changeQuantity(${index}, 1)">+</button>
            </td>
            <td>${itemTotal} บาท</td>
            <td><button class="trash" onclick="removeItem(${index})"><i class='bx bx-trash'></i></button></td>
        `;

        table.appendChild(row);
    });

    cartContainer.appendChild(table);
    totalPriceElement.innerHTML = `ราคารวม: ${totalPrice} บาท`;
}

function changeQuantity(index, amount) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (cart[index].quantity + amount > 0) {
        cart[index].quantity += amount;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function clearCart() {
    localStorage.removeItem("cart");
    renderCart();
}
function checkout() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("ไม่พบสินค้า กรุณาตรวจสอบตะกร้าสินค้า");
        return;
    }
    document.getElementById("qrCodeContainer").style.display = "block";
    document.getElementById("qrcode").innerHTML = "";
    var totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    if (totalPrice === 0) {
        alert("ไม่พบสินค้า กรุณาตรวจสอบตะกร้าสินค้า");
        return;
    }
    var xValue = "7";
    if (totalPrice < 10) {
        xValue = "4";
    } else if (totalPrice < 100) {
        xValue = "5";
    } else if (totalPrice < 1000) {
        xValue = "6";
    }
    var qrText = "00020101021229370016A000000677010111011300668284999015802TH5303764540" + 
                xValue + totalPrice.toFixed(2) + "63044B37";
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: qrText,
        width: 256,
        height: 256
    });
    setTimeout(() => {
        let qrContainer = document.getElementById("qrcode");
        let icon = document.createElement("img");
        icon.src = "./picture/icon.png";
        icon.style.position = "absolute";
        icon.style.width = "50px";
        icon.style.height = "50px";
        icon.style.left = "50%";
        icon.style.top = "50%";
        icon.style.transform = "translate(-50%, -50%)";
        icon.style.borderRadius = "10px";
        qrContainer.style.position = "relative";
        qrContainer.appendChild(icon);
    });
}
function completeOrder() {
    document.getElementById("qrCodeContainer").style.display = "none"; 

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("ไม่พบสินค้า กรุณาตรวจสอบตะกร้าสินค้า");
        return;
    }

    let userorders = JSON.parse(localStorage.getItem("userorders")) || [];
    let adminOrders = JSON.parse(localStorage.getItem("adminOrders")) || [];
    let newOrder = {
        id: Date.now(),
        items: cart,
        date: new Date().toLocaleString()
    };

    userorders.push(newOrder);
    adminOrders.push(newOrder);
    
    localStorage.setItem("userorders", JSON.stringify(userorders));
    localStorage.setItem("adminOrders", JSON.stringify(adminOrders));
    localStorage.removeItem("cart");

    alert("สั่งซื้อสำเร็จ!");
    location.reload();
}
document.addEventListener("DOMContentLoaded", function() {
    let btn = document.getElementById("account-btn");
    let text = btn.innerText;

    if (text.length > 2) {
        btn.innerText = text.substring(0, 3) + "...";
    }
});
let registeredaccount = localStorage.getItem("registeredaccount");
document.getElementById("account-btn").textContent = registeredaccount;