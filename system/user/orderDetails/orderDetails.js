document.addEventListener("DOMContentLoaded", function () {
    let userorders = JSON.parse(localStorage.getItem("userorders")) || [];
    let selectedOrderId = localStorage.getItem("selectedOrder");
    let orderDetailsContainer = document.getElementById("order-details");
    let totalQuantityContainer = document.querySelector(".total-quantity");
    let totalPriceContainer = document.querySelector(".total-price");

    let order = userorders.find(o => o.id == selectedOrderId);
    
    if (!order) {
        orderDetailsContainer.innerHTML = "<p>ไม่พบข้อมูลคำสั่งซื้อ</p>";
        return;
    }

    let totalQuantity = 0;
    let totalPrice = 0;

    let orderHTML = `<p><strong>วันที่:</strong> ${order.date}</p>`;
    orderHTML += `<table class="cart-table">
        <tr>
            <th>สินค้า</th>
            <th>ราคา</th>
            <th>จำนวน</th>
            <th>รวม</th>
        </tr>`;

    order.items.forEach(item => {
        let itemTotal = item.price * item.quantity;
        totalQuantity += item.quantity;
        totalPrice += itemTotal;
        orderHTML += `
            <tr>
                <td style="display: flex; align-items: center; justify-content: space-evenly;">
                    <img src="${item.image}" alt="${item.name}" width="80"> ${item.name}
                </td>
                <td>${item.price} บาท</td>
                <td>${item.quantity}</td>
                <td>${itemTotal} บาท</td>
            </tr>`;
    });

    orderHTML += "</table>";
    orderDetailsContainer.innerHTML = orderHTML;
    totalQuantityContainer.textContent = `จำนวนสินค้าทั้งหมด: ${totalQuantity} ชิ้น`;
    totalPriceContainer.textContent = `ราคารวมทั้งหมด: ${totalPrice} บาท`;
});

document.addEventListener("DOMContentLoaded", function() {
    let btn = document.getElementById("account-btn");
    let text = btn.innerText;

    if (text.length > 2) {
        btn.innerText = text.substring(0, 3) + "...";
    }
});
let registeredaccount = localStorage.getItem("registeredaccount");
document.getElementById("account-btn").textContent = registeredaccount;
