document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("account-btn");
    let registeredAccount =localStorage.getItem("registeredaccountadmin");

    if (registeredAccount.length > 4) {
        btn.innerText = registeredAccount.substring(0, 5) + "...";
    } else {
        btn.innerText = registeredAccount;
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const deleteButtons = document.querySelectorAll(".bx-trash");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบโปรโมชันนี้นี้?")) {
                let menuItem = this.closest(".menu-item");
                const menuName = menuItem.querySelector(".menu-name").textContent.replace(/\s+/g, ' ').trim();

                menuItem.remove();

                let promotion = JSON.parse(localStorage.getItem('promotion')) || [];
                promotion = promotion.filter(menu => menu.name !== menuName);
                localStorage.setItem('promotion', JSON.stringify(promotion));
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const promoContainer = document.getElementById("promotionList");

    function checkAndRemoveExpiredPromotions() {
        try {
            let promotions = JSON.parse(localStorage.getItem("promotion")) || [];
            const currentDate = new Date().toISOString().split("T")[0];
            promotions = promotions.filter(promo => {
                return promo.endDate >= currentDate;
            });

            localStorage.setItem("promotion", JSON.stringify(promotions));
        } catch (error) {
            console.error("Error processing promotions:", error);
        }
    }

    function displayPromotions() {
        try {
            let promotions = JSON.parse(localStorage.getItem("promotion")) || [];
            promoContainer.innerHTML = "";

            promotions.forEach((promo, index) => {
                let promoElement = document.createElement("div");
                promoElement.classList.add("menu-item");

                let promoHTML = `
                    <img src="${promo.image}">
                    <div class="menu-details">
                        <div class="menu-name">${promo.name} <i class='bx bx-trash' onclick="deletePromotion(${index})"></i></div>
                        <div class="menu-price">
                            รายละเอียด: ${promo.condition}
                            ${promo.type === "แถม" ? "" : ""}
                            ${promo.type === "ส่วนลด" ? "" : ""}
                        </div>
                        <div class="date">
                            <div class="pomo-expired">เริ่มใช้ตั้งแต่: ${promo.startDate}</div>
                            <div class="pomo-expired">หมดเขต: ${promo.endDate}</div>
                        </div>
                    </div>
                `;

                promoElement.innerHTML = promoHTML;
                promoContainer.appendChild(promoElement);
            });
        } catch (error) {
            console.error("Error displaying promotions:", error);
        }
    }

    window.deletePromotion = function (index) {
        try {
            let promotions = JSON.parse(localStorage.getItem("promotion")) || [];
            promotions.splice(index, 1);
            localStorage.setItem("promotion", JSON.stringify(promotions));
            displayPromotions();
        } catch (error) {
            console.error("Error deleting promotion:", error);
        }
    };

    checkAndRemoveExpiredPromotions();
    displayPromotions();
});