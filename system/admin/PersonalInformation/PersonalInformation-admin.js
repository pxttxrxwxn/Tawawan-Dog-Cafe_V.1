function logout() {
    let confirmlogout = confirm("คุณต้องการออกจากระบบหรือไม่?");
    if (confirmlogout) {
        if (localStorage.getItem("registeredaccountadmin")) {
            localStorage.removeItem("registeredaccountadmin");
            localStorage.removeItem("registeredemailadmin");
            localStorage.removeItem("registeredpasswordadmin");
        } else {
            localStorage.removeItem("registeredaccount");
            localStorage.removeItem("registeredemail");
            localStorage.removeItem("registeredpassword");
        }

        window.location.href = "../../../index.html";
    }
}
document.addEventListener("DOMContentLoaded", function () {
    let usernameField = document.getElementById("username");
    let editButton = document.querySelector(".edit button");
    let accountBtn = document.getElementById("account-btn");

    let username = localStorage.getItem("registeredaccountadmin");

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
            let newUsername = input.value.trim();
            
            if (newUsername) {
                if (localStorage.getItem("registeredaccountadmin")) {
                    localStorage.setItem("registeredaccountadmin", newUsername);
                } else {
                    localStorage.setItem("registeredaccount", newUsername);
                }
                username = newUsername;
            }

            input.replaceWith(usernameField);
            usernameField.value = username;
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
    let btn = document.getElementById("account-btn");
    let registeredAccount =localStorage.getItem("registeredaccountadmin");

    if (registeredAccount.length > 5) {
        btn.innerText = registeredAccount.substring(0, 5) + "...";
    } else {
        btn.innerText = registeredAccount;
    }

    document.getElementById("username").innerText = registeredAccount;
    document.getElementById("email-phone").innerText = localStorage.getItem("registeredemailadmin");

    let contactInfo = document.getElementById("email-phone").innerText;
    let iconElement = document.getElementById("icon");
    let labelElement = document.getElementById("label");

    if (contactInfo) {
        if (/^\d{9,10}$/.test(contactInfo)) {
            iconElement.className = 'bx bx-phone';
            labelElement.innerText = 'เบอร์โทรศัพท์';
        } else {
            iconElement.className = 'bx bx-envelope';
            labelElement.innerText = 'อีเมล';
        }
    }

    const passwordInput = document.getElementById("password");
    const toggleIcon = document.getElementById("toggle-password");
    const editButtonPassword = document.getElementById("edit-button");
    const passwordError = document.getElementById("password-error");
    let password =localStorage.getItem("registeredpasswordadmin");

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

    editButtonPassword.addEventListener("click", function () {
        isEditing = true;
        passwordInput.removeAttribute("readonly");
        passwordInput.focus();
    });

    passwordInput.addEventListener("blur", function () {
        if (validatePassword()) {
            if (localStorage.getItem("registeredaccountadmin")) {
                localStorage.setItem("registeredpasswordadmin", passwordInput.value.trim());
            } else {
                localStorage.setItem("registeredpassword", passwordInput.value.trim());
            }
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