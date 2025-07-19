document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("account-btn");
    let registeredAccount =localStorage.getItem("registeredaccountadmin");

    if (registeredAccount.length > 4) {
        btn.innerText = registeredAccount.substring(0, 5) + "...";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const deleteButtons = document.querySelectorAll(".bx-trash");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบเมนูนี้?")) {
                let menuItem = this.closest(".menu-item");
                const menuName = menuItem.querySelector(".menu-name").textContent.replace(/\s+/g, ' ').trim();

                menuItem.remove();

                let appetizers = JSON.parse(localStorage.getItem('appetizers')) || [];
                appetizers = appetizers.filter(menu => menu.name !== menuName);
                localStorage.setItem('appetizers', JSON.stringify(appetizers));
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const menuContainer = document.querySelector(".menu-grid");
    const addButton = document.getElementById("add-menu-button");
    const menuImageInput = document.getElementById("menu-image");
    const menuNameInput = document.getElementById("menu-name");
    const menuPriceInput = document.getElementById("menu-price");
    const previewContainer = document.querySelector(".preview-container");
    const previewIcon = document.querySelector(".preview-image");

    function loadAppetizers() {
        const appetizers = JSON.parse(localStorage.getItem('appetizers')) || [];
        appetizers.forEach(menu => {
            createMenuItem(menu.imageUrl, menu.name, menu.price);
        });
    }

    function createMenuItem(imageUrl, menuName, menuPrice) {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");
        menuItem.innerHTML = `
            <img src="${imageUrl}" class="menu-img">
            <div class="menu-details">
                <div class="menu-name">${menuName} <i class='bx bx-trash' onclick="deleteMenu(this)"></i></div>
                <div class="menu-price">ราคา ${menuPrice} บาท</div>
                <button class="edit-button"><i class='bx bx-edit-alt'></i></button>
            </div>
        `;
        menuContainer.appendChild(menuItem);
    }

    loadAppetizers();

    menuImageInput.addEventListener("change", function (event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();
    
            reader.onload = function () {
                const imageUrl = reader.result;
                previewIcon.style.display = "none";
    
                let imgElement = previewContainer.querySelector("img");
                if (!imgElement) {
                    imgElement = document.createElement("img");
                    previewContainer.appendChild(imgElement);
                }
                imgElement.src = imageUrl;
                imgElement.style.display = "block";
            };
    
            reader.readAsDataURL(file);
        }
    });

    addButton.addEventListener("click", function () {
    const imgElement = previewContainer.querySelector("img");
    const imageUrl = imgElement ? imgElement.src : "./picture/default.jpg";
    const menuName = menuNameInput.value.trim();
    const menuPrice = menuPriceInput.value.trim();

    if (menuName === "" || menuPrice === "" || imageUrl === "./picture/default.jpg") {
        alert("กรุณากรอกชื่อเมนูและราคาให้ครบถ้วน!");
        return;
    }

    createMenuItem(imageUrl, menuName, menuPrice);

    const appetizers = JSON.parse(localStorage.getItem('appetizers')) || [];
    appetizers.push({ imageUrl, name: menuName, price: menuPrice });
    localStorage.setItem('appetizers', JSON.stringify(appetizers));

    menuImageInput.value = "";
    menuNameInput.value = "";
    menuPriceInput.value = "";
    if (imgElement) imgElement.remove();
    previewIcon.style.display = "block";
    });
});

function deleteMenu() {
    const deleteButtons = document.querySelectorAll(".bx-trash");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบเมนูนี้?")) {
                let menuItem = this.closest(".menu-item");
                const menuName = menuItem.querySelector(".menu-name").textContent.replace(/\s+/g, ' ').trim();

                menuItem.remove();

                let appetizers = JSON.parse(localStorage.getItem('appetizers')) || [];
                appetizers = appetizers.filter(menu => menu.name !== menuName);
                localStorage.setItem('appetizers', JSON.stringify(appetizers));
            }
        });
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const editButtons = document.querySelectorAll(".bx-edit-alt");

    const appetizers = JSON.parse(localStorage.getItem('appetizers')) || [];
    appetizers.forEach(item => {
        const menuItem = document.querySelector(`[data-name="${item.name}"]`);
        if (menuItem) {
            const nameElement = menuItem.querySelector(".menu-name");
            const priceElement = menuItem.querySelector(".menu-price");
            nameElement.textContent = item.name;
            priceElement.textContent = `ราคา ${item.price} บาท`;
        }
    });

    editButtons.forEach(button => {
        button.addEventListener("click", function () {
            let menuItem = this.closest(".menu-item");
            let nameElement = menuItem.querySelector(".menu-name");
            let priceElement = menuItem.querySelector(".menu-price");

            if (!menuItem.dataset.editing) {
                menuItem.dataset.editing = "true";

                let nameInput = document.createElement("input");
                nameInput.type = "text";
                nameInput.value = nameElement.textContent.trim();
                nameElement.replaceWith(nameInput);

                let priceInput = document.createElement("input");
                priceInput.type = "number";
                priceInput.value = parseInt(priceElement.textContent.replace(/\D/g, ""));
                priceElement.replaceWith(priceInput);

                this.classList.replace("bx-edit-alt", "bx-check");

                this.addEventListener("click", function saveEdit() {
                    nameElement.textContent = nameInput.value;
                    priceElement.textContent = `ราคา ${priceInput.value} บาท`;

                    nameInput.replaceWith(nameElement);
                    priceInput.replaceWith(priceElement);

                    this.classList.replace("bx-check", "bx-edit-alt");

                    const editIcon = menuItem.querySelector(".edit-button i");
                    editIcon.classList.replace("bx-check", "bx-edit-alt");

                    delete menuItem.dataset.editing;

                    let updatedAppetizers = JSON.parse(localStorage.getItem('appetizers')) || [];
                    updatedAppetizers = updatedAppetizers.filter(menu => menu.name !== nameElement.textContent.trim());

                    updatedAppetizers.push({
                        imageUrl: menuItem.querySelector("img").src,
                        name: nameElement.textContent.trim(),
                        price: priceInput.value.trim()
                    });
                    localStorage.setItem('appetizers', JSON.stringify(updatedAppetizers));

                    this.removeEventListener("click", saveEdit);
                }, { once: true });
            }
        });
    });
});
