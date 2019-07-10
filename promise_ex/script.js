function simplePromise(num) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      if (num > 10) {
        resolve(true);
      } else {
        reject("Error: the value is under 11");
      }
    }, 500);
  });
}
const res_text = document.querySelector(".div__h1--result_text");
const fire_promise_btn = document.querySelector("#fire_promise");
const number_input = document.querySelector(".input_number");

fire_promise_btn.addEventListener("click", async () => {
  let res;
  num = number_input.value;
  try {
    res = await simplePromise(num);
  } catch (error) {
    res = error;
  } finally {
    res_text.textContent = res;
  }
});
