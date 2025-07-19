document.addEventListener("DOMContentLoaded", function() {
    let btn = document.getElementById("account-btn");
    let text = btn.innerText;

    if (text.length > 2) {
        btn.innerText = text.substring(0, 3) + "...";
    }
});
let registeredAccount =localStorage.getItem("registeredaccountadmin");
document.getElementById("account-btn").textContent = registeredAccount;


document.addEventListener("DOMContentLoaded", function () {
    const conditionSelect = document.querySelector(".form-group select");
    const additionalFieldsContainer = document.querySelector(".un");

    function updateFields() {
        const selectedValue = conditionSelect.value;
        additionalFieldsContainer.innerHTML = "";

        if (selectedValue === "แถม" || selectedValue === "ส่วนลด") {
            additionalFieldsContainer.innerHTML = `
                <div class="form-group">
                    <label>จำกัดจำนวนผู้ใช้โปรโมชั่น:</label>
                    <input type="number" class="input" placeholder="ระบุจำนวน">
                </div>
                <div class="form-group">
                    <label>เงื่อนไข${selectedValue === "แถม" ? "ของแถม" : "ส่วนลด"}:</label>
                    <input type="text" class="input" placeholder="เงื่อนไข${selectedValue === "แถม" ? "ของแถม" : "ส่วนลด"}">
                </div>
                <div class="button-group">
                    <a href="./Addapromotion.html"><button class="cancel-button">ยกเลิก</button></a>
                    <button class="confirm-button">ยืนยัน</button>
                </div>
            `;
        }
    }

    if (conditionSelect) {
        conditionSelect.addEventListener("change", updateFields);
    }
});


document.getElementById("menu-image").addEventListener("change", function(event) {
    const file = event.target.files[0]; 
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;
            localStorage.setItem("promotionImage", imageData);

            const previewContainer = document.getElementById("image-preview");
            const previewIcon = document.getElementById("preview-icon");

            if (previewIcon) {
                previewIcon.style.display = "none"; 
            }

            let imgElement = previewContainer.querySelector("img");

            if (!imgElement) {
                imgElement = document.createElement("img");
                imgElement.style.width = "100%";
                imgElement.style.height = "100%";
                imgElement.style.objectFit = "cover";
                imgElement.style.borderRadius = "10%";
                previewContainer.appendChild(imgElement);
            }

            imgElement.src = imageData; 
            imgElement.style.display = "block"; 
        };
        reader.readAsDataURL(file);
    }
});



 

document.addEventListener("DOMContentLoaded", function () {
    const confirmButton = document.querySelector(".confirm-button");

    document.body.addEventListener("click", function (event) {
        if (event.target.classList.contains("confirm-button")) {
            savePromotion();
        }
    });

    function savePromotion() {
        const promoName = document.querySelector(".input-name").value;
        const type = document.querySelector(".form-group select")?.value || "";
        const condition = document.querySelector(".input-condition").value;
        const startDate = document.querySelector(".input-start").value;
        const endDate = document.querySelectorAll(".input-start")[1].value;
        const limit = document.querySelector(".un input[type='number']")?.value;

        let extraCondition = "";

        if (type === "แถม") {
            extraCondition = document.querySelector(".un input[placeholder='เงื่อนไขของแถม']")?.value || "";
        } else if (type === "ส่วนลด") {
            extraCondition = document.querySelector(".un input[placeholder='เงื่อนไขส่วนลด']")?.value || "";
        }

        const promoImage = localStorage.getItem("promotionImage") || "./picture/icon.png";

        if (!promoName || !promoImage || !condition || !startDate || !endDate || !limit) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }

        let promotions = JSON.parse(localStorage.getItem("promotion")) || [];
        promotions.push({
            type: type,
            name: promoName,
            condition: extraCondition,
            image: promoImage,
            startDate: startDate,
            endDate: endDate
        });

        localStorage.setItem("promotion", JSON.stringify(promotions));

        window.location.href = "../Promotion/Promotion-admin.html";
    }
});