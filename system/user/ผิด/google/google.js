document.addEventListener("DOMContentLoaded", function() {
    let btn = document.getElementById("avatar-btn");
    let text = btn.innerText;

    if (text.length > 1) {
        btn.innerText = text.substring(0, 2);
    }
});
let registeredaccount = localStorage.getItem("registeredaccount");
document.getElementById("avatar-btn").textContent = registeredaccount;

document.getElementById("email").innerText = localStorage.getItem("registeredaccount");