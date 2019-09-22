$(document).ready(function () {

    let usernameLog;
    let passLog;
  
    $("#logInBtn").on("click", function (event) {
      event.preventDefault()
      usernameLog = $("#usernameLog").val().trim()
      passLog = $("#passLog").val().trim()
  
      var user_data = {
        username: usernameLog,
        password: passLog
      };
  
      if (!user_data.username || !user_data.password) {
        return;
      }
  
      loginUser(user_data.username, user_data.password);
      $("#usernameLog").val("");
      $("#passLog").val("");
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  
    function loginUser(username, password) {
      $.post("/api/login", {
        username: username,
        password: password
      }).then(function (data) {
        window.location.replace(data);
        // If there's an error, log the error
      }).catch(function (err) {
        console.log(err);
      });
    }
  
  
  
  });