const feedbackForm = document.getElementById("feedbackForm");
const formView = document.getElementById("formView");
const successView = document.getElementById("successView");
const formAlert = document.getElementById("formAlert");
const suggestions = document.getElementById("suggestions");
const characterCount = document.getElementById("characterCount");

suggestions.addEventListener("input", () => {
  characterCount.textContent = suggestions.value.length;
});

feedbackForm.addEventListener("submit", event => {
  event.preventDefault();

  const nameInput = document.getElementById("visitorName");
  const emailInput = document.getElementById("visitorEmail");
  const satisfactionSelected = feedbackForm.querySelector(
    'input[name="satisfaction"]:checked'
  );
  const improvementSelected = feedbackForm.querySelector(
    'input[name="improve"]:checked'
  );

  const nameIsValid = nameInput.value.trim().length > 0;
  const emailIsValid = emailInput.checkValidity();

  nameInput.classList.toggle("is-invalid", !nameIsValid);
  emailInput.classList.toggle("is-invalid", !emailIsValid);

  if (
    !nameIsValid ||
    !satisfactionSelected ||
    !improvementSelected ||
    !emailIsValid
  ) {
    formAlert.classList.remove("d-none");
    formAlert.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  formAlert.classList.add("d-none");
  formView.classList.add("d-none");
  successView.classList.remove("d-none");
  successView.scrollIntoView({ behavior: "smooth", block: "center" });
});
