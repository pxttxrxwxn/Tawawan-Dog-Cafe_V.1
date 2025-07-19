document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("account-btn");
    let registeredAccount =localStorage.getItem("registeredaccountadmin");

    if (registeredAccount.length > 5) {
        btn.innerText = registeredAccount.substring(0, 5) + "...";
    } else {
        btn.innerText = registeredAccount;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let orders = JSON.parse(localStorage.getItem("adminOrders")) || [];
    let readOrders = JSON.parse(localStorage.getItem("readOrders")) || [];
    let notificationContainer = document.getElementById("notification-container");

    if (orders.length === 0) {
        notificationContainer.innerHTML = "<i class='bx bx-message-dots'></i><br><p>ไม่มีการแจ้งเตือน</p>";
        return;
    }

    orders.forEach(order => {
        let orderElement = document.createElement("div");
        orderElement.classList.add("menu-grid");
        let isRead = readOrders.includes(order.id) ? "read" : "";
        
        orderElement.innerHTML = `
            <div class="menu-item">
                <i class='bx bx-bell'></i>
                <div class="menu-details">
                    <div class="menu-order ${isRead}" onclick="viewOrder(${order.id})">
                        <div class="menu-name">ออเดอร์ใหม่! เช็กเลย
                            <div class="menu-topic">(${order.date})</div>
                        </div>
                    </div>
                    <button class="cart-button" onclick="deleteNotification(${order.id})">
                    <i class='bx bx-trash'></i>
                    </button>
                </div>
            </div>
        `;
        notificationContainer.prepend(orderElement);
    });
});


function viewOrder(orderId) {
    localStorage.setItem("selectedOrder", orderId);
    let readOrders = JSON.parse(localStorage.getItem("readOrders")) || [];
    if (!readOrders.includes(orderId)) {
        readOrders.push(orderId);
        localStorage.setItem("readOrders", JSON.stringify(readOrders));
    }
    document.querySelectorAll(".menu-order").forEach(orderElement => {
        let orderText = orderElement.innerHTML;
        if (orderText.includes(`(${orderId})`)) {
            orderElement.classList.add("read");
        }
    });
    window.location.href = "../orderDetails/orderDetails-admin.html";
}


function deleteNotification(orderId) {
    let confirmDelete = confirm("คุณต้องการลบการแจ้งเตือนนี้หรือไม่?");
    if (confirmDelete) {
        let adminOrders = JSON.parse(localStorage.getItem("adminOrders")) || [];
        let updatedAdminOrders = adminOrders.filter(order => order.id !== orderId);
        localStorage.setItem("adminOrders", JSON.stringify(updatedAdminOrders));
        location.reload();
    }
}

function addNewOrder(order) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let adminOrders = JSON.parse(localStorage.getItem("adminOrders")) || [];

    orders.push(order);
    adminOrders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("adminOrders", JSON.stringify(adminOrders));
}

