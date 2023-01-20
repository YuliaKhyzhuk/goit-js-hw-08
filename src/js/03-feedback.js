const throttle = require('lodash.throttle');
const feedbackFormEl = document.querySelector('.feedback-form');
const userInfo = {};

const fillFeedbackFormFields = () => {
  try {
    const userInfofromLS = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );

    if (userInfofromLS === null) {
      return;
    }

    // console.log(userInfofromLS);

    for (const property in userInfofromLS) {
      //   console.log(property);
      //   console.log(userInfofromLS[property]);
      feedbackFormEl.elements[property].value = userInfofromLS[property];
    }

    //   console.dir(feedbackFormEl);
  } catch (err) {
    console.log(err);
  }
};

fillFeedbackFormFields();

const onFeedbackFormInput = event => {
  const { target } = event;
  //   console.log(feedbackFormEl);
  console.log('Input 500ms');
  const name = target.name;
  const value = target.value;

  userInfo[name] = value;

  localStorage.setItem('feedback-form-state', JSON.stringify(userInfo));
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();

  try {
    const userInfofromLS = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );

    if (userInfofromLS === null) {
      return;
    }

    console.log(userInfofromLS);
  } catch (err) {
    console.log(err);
  }

  //   console.log(userInfo);
  feedbackFormEl.reset();
  localStorage.removeItem('feedback-form-state');
  //   console.log('Submit');
};

feedbackFormEl.addEventListener('input', throttle(onFeedbackFormInput, 500));
feedbackFormEl.addEventListener('submit', throttle(onFeedbackFormSubmit, 500));

// const throttledOnDocumentInput = _.throttle(onDocumentScroll, 300);

// document.addEventListener('scroll', throttledOnDocumentScroll);
