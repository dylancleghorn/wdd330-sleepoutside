const form = document.getElementById("myForm");
form.addEventListener("submit", function (event) {
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;
  if (!email || !age) {
    event.preventDefault(); // Prevent form submission
    alert("Please fill out all required fields.");
  } else if (age < 18 || age > 100) {
    event.preventDefault(); // Prevent form submission
    alert("Age must be between 18 and 100.");
  }
});
