function setUpBookingForm() {
  const form = document.getElementById("booking-form");
  const submitBtn = form.querySelector('button[type="submit"]');
  const formAlert = document.getElementById("booking-form-alert");

  const handleFormError = () => {
    formAlert.textContent =
      "There was an error submitting your request. If you continue to experience issues, email us directly at desertskystrings@gmail.com";
    formAlert.classList.replace("alert-success", "alert-danger");
    formAlert.hidden = false;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "024d9faf-d757-4519-963b-2a1c36dc4701");
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      });

      const data = await response.json();

      if (response.ok) {
        formAlert.textContent =
          "Your booking inquiry has been submitted successfully. We will review your request and get back to you soon!";
        formAlert.hidden = false;
        form.reset();
      } else {
        handleFormError();
      }
    } catch (error) {
      handleFormError();
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

setUpBookingForm();
