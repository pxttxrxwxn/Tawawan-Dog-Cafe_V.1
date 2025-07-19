document.addEventListener("DOMContentLoaded", function () {
    let adminOrders = JSON.parse(localStorage.getItem("adminOrders")) || [];
    let selectedOrderId = localStorage.getItem("selectedOrder");
    let orderDetailsContainer = document.getElementById("order-details");
    let totalQuantityContainer = document.querySelector(".total-quantity");
    let totalPriceContainer = document.querySelector(".total-price");
    let order = adminOrders.find(o => o.id == selectedOrderId);
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
    totalQuantityContainer.textContent = `จำนวนสินค้าทั้งหมด: ${totalQuantity}`;
    totalPriceContainer.textContent = `ราคารวมทั้งหมด: ${totalPrice} บาท`;
    document.getElementById("finish-button").addEventListener("click", completeOrder);
});
function completeOrder() {
    console.log('completeOrder function called');
    let selectedOrderId = localStorage.getItem("selectedOrder");
    if (!selectedOrderId) return;

    let adminOrders = JSON.parse(localStorage.getItem("adminOrders")) || [];
    let userOrders = JSON.parse(localStorage.getItem("userorders")) || [];
    let userNotifications = JSON.parse(localStorage.getItem("userNotifications")) || [];

    let orderIndex = adminOrders.findIndex(o => o.id == selectedOrderId);
    if (orderIndex === -1) return;

    let completedOrder = adminOrders[orderIndex];

    if (completedOrder.status === "เสร็จสิ้น") {
        window.location.href = "../notification/notification-admin.html";
        return;
    }

    completedOrder.status = "เสร็จสิ้น";
    adminOrders[orderIndex] = completedOrder;
    localStorage.setItem("adminOrders", JSON.stringify(adminOrders));

    let userOrderIndex = userOrders.findIndex(o => o.id == selectedOrderId);
    if (userOrderIndex !== -1) {
        userOrders[userOrderIndex].status = "เสร็จสิ้น";
        localStorage.setItem("userorders", JSON.stringify(userOrders));
    }

    let newNotification = {
        id: completedOrder.id,
        date: new Date().toLocaleString(),
        message: "ออร์เดอร์ของคุณเสร็จสิ้นแล้ว"
    };

    let notificationExists = userNotifications.some(n => n.id == completedOrder.id);
    if (!notificationExists) {
        userNotifications.push(newNotification);
        localStorage.setItem("userNotifications", JSON.stringify(userNotifications));
    }

    alert("ทำรายการเสร็จสิ้น และได้ส่งการแจ้งเตือนให้ลูกค้าแล้ว");
}
document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("account-btn");
    let registeredAccount = localStorage.getItem("registeredaccountadmin");

    if (registeredAccount.length > 5) {
        btn.innerText = registeredAccount.substring(0, 5) + "...";
    } else {
        btn.innerText = registeredAccount;
    }
});