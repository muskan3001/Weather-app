const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const one = document.getElementById("message-1");
const two = document.getElementById("message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  one.textContent = "Loading...";
  two.textContent = " ";

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          one.textContent = data.error;
        } else {
          one.textContent = data.location;
          one.textContent = data.forecast;
        }
      });
    }
  );
});
