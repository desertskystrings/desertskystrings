const form = document.getElementById("booking-form");
let url =
  "https://script.google.com/macros/s/AKfycby-RMJNDG_PqQ5fOx4TQXWu7GRsPVnvxFWh_kI-xFVjkvqf_ppcc90pgkNEG_p7Uyhpcw/exec";

$("#booking-form").on("submit", function (e) {
  e.preventDefault();
  let formData = new FormData(form);
  const formDataObj = {};
  formData.forEach((value, key) => (formDataObj[key] = value));
  console.log(formDataObj);
  let data = JSON.stringify(formDataObj);
  var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: data,
  })
    .success(
      // do something
      () => {
        console.log("Success");
      }
    )
    .error(() => {
      console.log("Error");
    });
});
