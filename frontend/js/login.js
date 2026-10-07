let selectedRole = "user";

function setRole(role) {
    selectedRole = role;

    document.getElementById("userRole").classList.toggle(
        "active",
        role === "user"
    );

    document.getElementById("adminRole").classList.toggle(
        "active",
        role === "admin"
    );
}

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        showToast("Please enter your details.");
        return;
    }

    localStorage.setItem(
        "biteUser",
        JSON.stringify({
            email,
            role: selectedRole
        })
    );

    if (selectedRole === "admin") {
        window.location.href = "admin/dashboard.html";
    } else {
        window.location.href = "index.html";
    }
});