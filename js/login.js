window.onload = () => {
  let login_btn = document.getElementById("login-button");
  login_btn.addEventListener("click", login);

  function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let data = new FormData();
    data.append("email", email);
    data.append("password", password);

    axios
      .post("http://localhost/hospital_backend/login.php", data)
      .then((result) => {
        console.log(result.data.status);
        if (result.data.jwt) {
          console.log(result.data.jwt);
          localStorage.setItem("jwt", result.data.jwt);
          alert("logedin");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
};
