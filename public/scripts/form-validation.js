var validateEmail = () => {
  var email = document.getElementsByName('email')[0].value;
  var alert = document.getElementById("email-alert");

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    alert.style.display = "none"; 
    return true;
  } else {
    alert.style.display = "block";
    return false;
  }
}

var validatePassword = () => {
  var pass = document.getElementsByName("password")[0].value;
  var alert = document.getElementById("password-alert");

  if (pass.length < 7) {
    alert.style.display = "block";
    return false;
  } else { 
    alert.style.display = "none";
    return true;
  }
}

var validateRepeatPassword = () => {
  var pass = document.getElementsByName("password")[0].value;
  var passRpt = document.getElementsByName("repeat-password")[0].value;
  var alert = document.getElementById("repeat-password-alert");

  if (pass !== passRpt) {
    alert.style.display = "block";
    return false;
  } else {
    alert.style.display = "none";
    return true;
  }
}

var validateForm = () => {
  if (!validateEmail()) {
    return setAlertMessageAndDisplay("Please ensure you have entered a valid email.");
  } 
  else if (!validatePassword()) {
    return setAlertMessageAndDisplay("Please ensure your password is more than 6 characters.");
  }
  else if (!validateRepeatPassword()) {
    return setAlertMessageAndDisplay("Please ensure the passwords you entered match.");
  } 
  else {
    return true;
  }
}

var setAlertMessageAndDisplay = (message) => {
  var alertMsg = document.getElementById('alert-inner-message');
  var alertBox = document.getElementsByClassName('alert')[0];

  alertMsg.innerHTML = message;
  alertBox.style.display = "block";
  setTimeout(() => { alertBox.style.display = "none"; }, 3500);
  return false;
}