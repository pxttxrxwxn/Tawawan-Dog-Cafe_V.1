document.addEventListener("DOMContentLoaded", function () {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let selectedOrderId = localStorage.getItem("selectedOrder");
    let orderDetailsContainer = document.getElementById("order-details");

    let order = orders.find(o => o.id == selectedOrderId);
    
    if (!order) {
        orderDetailsContainer.innerHTML = "<p>ไม่พบข้อมูลคำสั่งซื้อ</p>";
        return;
    }

    let orderHTML = `<p><strong>วันที่:</strong> ${order.date}</p>`;
    orderHTML += "<ul>";

    order.items.forEach(item => {
        orderHTML += `
            <li>
                <img src="${item.image}" alt="${item.name}" style="width:80px; height:80px; border-radius: 10px;">
                ${item.name} - ${item.quantity} x ${item.price} บาท
            </li>
        `;
    });

    orderHTML += "</ul>";
    orderDetailsContainer.innerHTML = orderHTML;
});
