$(document).ready(function() {

    let usernameSign_up;
    let nameSign_up;
    let emailSign_up;
    let passwordSign_up;
    let user_bio;
    
    $("#signUpBtn").on("click", function (event) {
        event.preventDefault()
        usernameSign_up = $("#usernameSign_up").val().trim()
        nameSign_up = $("#nameSign_up").val().trim()
        emailSign_up = $("#emailSign_up").val().trim()
        passwordSign_up = $("#passwordSign_up").val().trim()
        user_bio = $("#user_bio").val().trim()

        // var randomID = Math.floor(Math.random() * 2000000000) + 1000000000;


        var randomID = 1234567890
    
        var user_data = {
            username: usernameSign_up,
            name: nameSign_up,
            user_bio: user_bio,
            email: emailSign_up,
            password: passwordSign_up,
            user_identifier: randomID
        }
    
        if (!user_data.username || !user_data.password) {
            return;
          }
          // If we have an email and password, run the signUpUser function
          signUpUser(user_data.username, user_data.password,user_data.user_bio,user_data.user_identifier,user_data.name,user_data.email);
        //   usernameSign_up.val("");
        //   passwordSign_up.val("");
        //   emailSign_up.val("");
          $("#nameSign_up").val("");
          $("#emailSign_up").val("");
          $("#passwordSign_up").val("");
          $("#usernameSign_up").val("");
          $("#user_bio").val("");
    
    });
    
    
    // Does a post to the signup route. If succesful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(username,password,user_bio,user_identifier,name,email) {
      $.post("/api/signup", {
        username: username,
        password: password,
        user_identifier: user_identifier,
        name: name,
        user_bio: user_bio,
        email: email,
      }).then(function(data) {
          console.log(data)
        window.location.replace(data);
        // If there's an error, handle it by throwing up a boostrap alert
      }).catch(handleLoginErr);
    }
    
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
});