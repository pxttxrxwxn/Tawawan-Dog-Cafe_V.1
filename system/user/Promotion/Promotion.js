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
                        <div class="menu-name">${promo.name} </div>
                        <div class="menu-price" id="menu-price">
                            รายละเอียด : ${promo.condition}
                            ${promo.type === "แถม" ? "" : ""}
                            ${promo.type === "ส่วนลด" ? "" : ""}
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
    displayPromotions();
});