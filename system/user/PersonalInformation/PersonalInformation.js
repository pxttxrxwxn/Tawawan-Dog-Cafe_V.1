function logout() {
    let confirmlogout = confirm("คุณต้องการออกจากระบบหรือไม่?");
    if (confirmlogout) {
        window.location.href = "../../../index.html";
    }
}

let registeredaccount = localStorage.getItem("registeredaccount");
document.getElementById("account-btn").textContent = registeredaccount;

document.getElementById("username").innerText = localStorage.getItem("registeredaccount");
document.getElementById("email-phone").innerText = localStorage.getItem("registeredemail");{
    let contactInfo = localStorage.getItem("registeredemail");
    let emailPhoneElement = document.getElementById("email-phone");
    let iconElement = document.getElementById("icon");
    let labelElement = document.getElementById("label");

    if (contactInfo) {
        emailPhoneElement.innerText = contactInfo;

        if (/^\d{9,10}$/.test(contactInfo)) {
            iconElement.className = 'bx bx-phone';
            labelElement.innerText = 'เบอร์โทรศัพท์';
        } else {

            iconElement.className = 'bx bx-envelope';
            labelElement.innerText = 'อีเมล';
        }
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const usernameField = document.getElementById("username");
    const editButton = document.querySelector(".edit button");
    const accountBtn = document.getElementById("account-btn");
    let username = registeredaccount;
    usernameField.value = username;
    accountBtn.textContent = username;
    editButton.addEventListener("click", function () {
        const input = document.createElement("input");
        input.type = "text";
        input.value = username;
        input.classList.add("edit-input");
        usernameField.replaceWith(input);
        input.focus();
        input.addEventListener("blur", function () {
            username = input.value.trim();
            localStorage.setItem("registeredaccount", username);
            usernameField.value = username;
            input.replaceWith(usernameField);
            accountBtn.textContent = username;
        });
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                input.blur();
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.getElementById("toggle-password");
    const editButton = document.getElementById("edit-button");
    const passwordError = document.getElementById("password-error");
    let password = localStorage.getItem("registeredpassword") || "";
    passwordInput.value = password;
    let isEditing = false;

    function togglePasswordVisibility() {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            toggleIcon.classList.replace("bx-hide", "bx-show");
        } else {
            passwordInput.type = "password";
            toggleIcon.classList.replace("bx-show", "bx-hide");
        }
    }
    function validatePassword() {
        let password = passwordInput.value.trim();
        if (password === "") {
            passwordError.innerText = "";
            passwordInput.style.border = "1px solid #ccc";
            return true;
        } else if (password.length < 8) {
            passwordError.innerText = "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร";
            passwordInput.style.border = "2px solid red";
            return false;
        } else {
            passwordError.innerText = "";
            passwordInput.style.border = "1px solid #ccc";
            return true;
        }
    }    
    editButton.addEventListener("click", function () {
        isEditing = true;
        passwordInput.removeAttribute("readonly");
        passwordInput.focus();
    });
    passwordInput.addEventListener("blur", function () {
        if (validatePassword()) {
            localStorage.setItem("registeredpassword", passwordInput.value.trim());
        } else {
            passwordInput.value = password;
        }
        passwordInput.setAttribute("readonly", "true");
        isEditing = false;
        passwordInput.type = "password";

    });
    passwordInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            passwordInput.blur();
        }
    });
    toggleIcon.addEventListener("click", togglePasswordVisibility);
});
document.addEventListener("DOMContentLoaded", function() {
    let btn = document.getElementById("account-btn");
    let text = btn.innerText;

    if (text.length > 2) {
        btn.innerText = text.substring(0, 3) + "...";
    }
});