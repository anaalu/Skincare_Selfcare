var validateEmail = () => {
  var email = document.getElementsByName('email')[0].value;
  var alert = document.getElementById("email-alert");

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    alert.style.display = "none"; 
  } else {
    alert.style.display = "block";
  }
}

var validatePassword = () => {
  var pass = document.getElementsByName("password")[0].value;
  var alert = document.getElementById("password-alert");

  if (pass.length < 7) {
    alert.style.display = "block";
  } else { 
    alert.style.display = "none";
  }
}

var validateRepeatPassword = () => {
  var pass = document.getElementsByName("password")[0].value;
  var passRpt = document.getElementsByName("repeat-password")[0].value;
  var alert = document.getElementById("repeat-password-alert");

  if (pass !== passRpt) {
    alert.style.display = "block";
  } else {
    alert.style.display = "none";
  }
}