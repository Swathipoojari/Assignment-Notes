const jwt = localStorage.getItem("jwt");
const urlPath = "https://610f9659c848c900171b392e.mockapi.io/api/v1";
const header = "application/json";
if (jwt != null) {
  window.location.href = "./index.html";
}

window.addEventListener("load", function () {
  function sendData() {
    const XHR = new XMLHttpRequest();

    // Bind the FormData object and the form element
    const FD = new FormData(form);

    // Define what happens on successful data submission
    XHR.addEventListener("load", function (event) {
      const objects = JSON.parse(event.target.responseText);
      if (objects["status"] == "ok") {
        localStorage.setItem("jwt", objects["accessToken"]);
        localStorage.setItem("user_id", objects["id"].id);
        window.location.href = "./index.html";
      }
    });

    // Define what happens in case of error
    XHR.addEventListener("error", function (event) {
      alert("Oops! Something went wrong.");
    });

    // Set up our request
    XHR.open("POST", urlPath + "/users");
    // XHR.setRequestHeader("Content-Type", header);
    // The data sent is what the user provided in the form
    XHR.send(FD);
  }

  // Access the form element...
  const form = document.getElementById("loginForm");

  // ...and take over its submit event.
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    sendData();
  });
});
