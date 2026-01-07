function setUpNewsletterSignup() {
  const form = document.getElementById("member-signup-form");
  const submitBtn = form.querySelector('button[type="submit"]');
  const formAlert = document.getElementById("member-signup-form-alert");

  const handleFormError = () => {
    formAlert.textContent =
      "There was an error submitting your request. If you continue to experience issues, email us directly at desertskystrings@gmail.com";
    formAlert.classList.replace("alert-success", "alert-danger");
    formAlert.hidden = false;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "b0cdba1f-8f7e-4b8d-8f13-bb0b8507191f");
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
          "Your new member information was submitted successfully. We will review your request and get back to you soon!";
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

setUpNewsletterSignup();
