const submit_button = document.querySelector("#submit_button");
const name_input = document.querySelector("#name");
const address_input = document.querySelector("#address");
const name_error = document.querySelector("#name__error");
const address_error = document.querySelector("#address__error");

/*
    add event listener to submit button for checking validation .
    params: name_value: value of name input, address_value: value of the address input.
    action: toggle the class of the li element to show the erro if have any.
*/
submit_button.addEventListener("click", event => {
  event.preventDefault();
  name_value = name_input.value;
  address_value = address_input.value;

  if (name_value.length < 5) {
    name_error.style.visibility = "visible";
  }
  if (address_value.length > 9) {
    address_error.style.visibility = "visible";
  }
});

name_input.addEventListener("focus", event => {
  name_error.style.visibility = "hidden";
});

address_input.addEventListener("focus", event => {
  address_error.style.visibility = "hidden";
});
