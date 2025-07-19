document.addEventListener("DOMContentLoaded", function() { 
    let btn = document.getElementById("account-btn");
    let loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        btn.innerText = loggedInUser.length > 5 ? loggedInUser.substring(0, 5) + "..." : loggedInUser;
    } else {
        btn.innerText = "Guest";
    }
});




function logout() {
    alert("ออกจากระบบเรียบร้อย!");
    window.location.href = "../Frist/frist.html";
}