document.addEventListener("DOMContentLoaded", function() {
    let btn = document.getElementById("avatar-btn");
    let registeredaccountadmin = localStorage.getItem("registeredaccountadmin");

    if (registeredaccountadmin.length > 1) {
        btn.innerText = registeredaccountadmin.substring(0, 2);
    }
});
let registeredaccountadmin = localStorage.getItem("registeredaccountadmin");
document.getElementById("email-admin").innerText = localStorage.getItem("registeredemailadmin");