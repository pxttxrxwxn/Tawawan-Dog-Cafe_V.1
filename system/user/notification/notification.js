document.addEventListener("DOMContentLoaded", function() {
    let btn = document.getElementById("account-btn");
    let text = btn.innerText;

    if (text.length > 2) {
        btn.innerText = text.substring(0, 3) + "...";
    }
});
let registeredaccount = localStorage.getItem("registeredaccount");
document.getElementById("account-btn").textContent = registeredaccount;


document.addEventListener("DOMContentLoaded", function () {
    let orders = JSON.parse(localStorage.getItem("userorders")) || [];
    let notifications = JSON.parse(localStorage.getItem("userNotifications")) || [];
    let notificationContainer = document.getElementById("notification-container");
    

    if (orders.length === 0 && notifications.length === 0) {
        notificationContainer.innerHTML = "<i class='bx bx-message-dots'></i><br><p>ไม่มีการแจ้งเตือน</p>";
        return;
    }

    orders.forEach(order => order.type = "order");
    notifications.forEach(notification => notification.type = "notification");

    let allNotifications = [...orders, ...notifications];

    allNotifications.sort((a, b) => new Date(a.date) - new Date(b.date));

    allNotifications.forEach(item => {
        let notificationElement = document.createElement("div");
        notificationElement.classList.add("menu-grid");

        if (item.type === "order") {
            notificationElement.innerHTML = `
                <div class="menu-item" id="notification-${item.id}">
                    <i class='bx bx-bell'></i>
                    <div class="menu-details">
                        <div class="menu-order" onclick="viewOrder(${item.id})">
                            <div class="menu-name">สั่งออเดอร์เสร็จสิ้น
                                <div class="menu-topic">(${item.date})</div>
                            </div>
                        </div>
                        <button class="cart-button" onclick="deleteNotificationorder(${item.id})">
                            <i class='bx bx-trash'></i>
                        </button>
                    </div>
                </div>
            `;
        } else if (item.type === "notification") {
            notificationElement.innerHTML = `
                <div class="menu-item">
                    <i class='bx bx-bell'></i>
                    <div class="menu-details-notification">
                        <div class="menu-order" onclick="viewOrder(${item.id})">
                            <div class="menu-name">${item.message}
                                <div class="menu-topic">(${item.date})</div>
                            </div>
                        </div>
                        <button class="cart-button" onclick="deleteNotificationnotification(${item.id})">
                            <i class='bx bx-trash'></i>
                        </button>
                    </div>
                </div>
            `;
        }

        notificationContainer.prepend(notificationElement);
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
    window.location.href = "../orderDetails/orderDetails.html";
}
function deleteNotificationorder(orderId) {
    let confirmDelete = confirm("คุณต้องการลบการแจ้งเตือนออเดอร์นี้หรือไม่?");
    if (confirmDelete) {
        let userOrders = JSON.parse(localStorage.getItem("userorders")) || [];
        let updatedUserOrders = userOrders.filter(order => order.id !== orderId);
        localStorage.setItem("userorders", JSON.stringify(updatedUserOrders));
        
        let notificationElement = document.getElementById(`notification-${orderId}`);
        if (notificationElement) {
            notificationElement.remove();
        }
        location.reload();
    }
}

function deleteNotificationnotification(notificationId) {
    let confirmDelete = confirm("คุณต้องการลบการแจ้งเตือนนี้หรือไม่?");
    if (confirmDelete) {
        let userNotifications = JSON.parse(localStorage.getItem("userNotifications")) || [];
        let updatedUserNotifications = userNotifications.filter(notification => notification.id !== notificationId);
        localStorage.setItem("userNotifications", JSON.stringify(updatedUserNotifications));
        
        location.reload();
    }
}





document.addEventListener("DOMContentLoaded", loadNotifications);

function viewOrder(orderId) {
    localStorage.setItem("selectedOrder", orderId);
    window.location.href = "../orderDetails/orderDetails.html";
}
function addNewOrder(order) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let adminOrders = JSON.parse(localStorage.getItem("adminOrders")) || [];

    orders.push(order);
    adminOrders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("adminOrders", JSON.stringify(adminOrders));
}