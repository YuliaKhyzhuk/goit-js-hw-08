const LOCALSTORAGE_KEY = 'feedback-form-state';
const throttle = require('lodash.throttle');
const feedbackFormEl = document.querySelector('.feedback-form');

initForm();

const onFeedbackFormSubmit = event => {
  event.preventDefault();
  const formData = new FormData(feedbackFormEl);

  const submittedData = {};
  formData.forEach((value, name) => {
    value = value.trim();
    if (value) submittedData[name] = value;
  });

  if (Object.values(submittedData).length !== 2) {
    alert('Усі поля мать бути заповнені');
    return;
  } else {
    console.log(submittedData);
    feedbackFormEl.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
  }
};

const onFeedbackFormInput = event => {
  let savedClientInput = localStorage.getItem(LOCALSTORAGE_KEY);
  savedClientInput = savedClientInput ? JSON.parse(savedClientInput) : {};
  savedClientInput[event.target.name] = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(savedClientInput));
};

function initForm() {
  let savedClientInput = localStorage.getItem(LOCALSTORAGE_KEY);
  if (savedClientInput) {
    savedClientInput = JSON.parse(savedClientInput);
    Object.entries(savedClientInput).forEach(([name, value]) => {
      feedbackFormEl.elements[name].value = value;
    });
  }
}

feedbackFormEl.addEventListener('input', throttle(onFeedbackFormInput, 500));

feedbackFormEl.addEventListener('submit', throttle(onFeedbackFormSubmit, 500));
