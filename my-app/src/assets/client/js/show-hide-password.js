const togglePassword = document.getElementById("toggle-password");
const newPassword = document.getElementById("new-password");
const toggleConfirmPassword = document.getElementById(
  "toggle-confirm-password"
);
const confirmPassword = document.getElementById("confirm-password");

togglePassword.addEventListener("click", function () {
  const type = newPassword.type === "password" ? "text" : "password";
  newPassword.type = type;
  this.querySelector("i").classList.toggle("bi-eye");
  this.querySelector("i").classList.toggle("bi-eye-slash");
});

toggleConfirmPassword.addEventListener("click", function () {
  const type = confirmPassword.type === "password" ? "text" : "password";
  confirmPassword.type = type;
  this.querySelector("i").classList.toggle("bi-eye");
  this.querySelector("i").classList.toggle("bi-eye-slash");
});
