

$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
      // console.log(data)
      if(Object.keys(data).length > 0){
        $("#loginLink").remove()
        $("#signUpLink").remove()
      }
      else if (!Object.keys(data).length > 0) {
        // $("#createEventLink").remove()
        $("#accountLink").remove()
        $("#logOutLink").remove()
      }
      $(".member-name").text(data.name);

      // membersData = data

    });
  });

