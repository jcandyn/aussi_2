$(document).ready(function () {
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

    });

    var yourEvents = $("#myPosts");
    var userdata;

    $.get("/api/user_data").then(function (data) {
        userdata = data;
        return userdata;
    }).then(function(){
        getYourEvents();
    });

    

    function getYourEvents(user) {
        userId = user || "";
        if (userId) {
          userId = "/?user_id=" + userId
        }
        $.get("/api/posts/" + userdata.id, function (data) {
            var events = data;
            if (!events || !events.length) {
                youHaveNoEvents(user);
            }
            else {
                populateYourEvents(events);
            };
        })
    };

    function youHaveNoEvents(id) {
        var query = window.location.search;
        var partial = "";
        if (id) {
            partial = " for user #" + id;
        };
        yourEvents.empty();
        var messageH2 = $("<h2>");
        // messageH2.css({ "text-align": "center", "margin-top": "50px" });
        // messageH2.html("You haven't created any posts yet!" + partial + ", navigate <a href='/words" + query +
            // "'>here</a> in order to get started.");
            var accountMessage = '<div id="noPosts" class="card text-center">'
            + '<div class="card-header">'
           + '</div>'
            + '<div id="messageCard" class="card-body">'
            +  '<h5 class="card-title">You have not created any posts yet!</h5>'
             + ' <p class="card-text">Navigate to get started.</p>'
              + '<a id="messageBtn" href="/words" + query class="button button--rayen button--border-thin button--text-thick button--text-upper button--size-s" data-text="Go search words">Go search words</a>'
            + '</div>'
          + '</div>';
        yourEvents.append(accountMessage);
    };

    function populateYourEvents(data) {
        var eventData = data;
        for (let i = 0; i < eventData.length; i++) {
            let newCardData = eventData[i]
            createNewRow(newCardData)
        };
    };
  
  
    function createNewRow(x) {
      console.log(x)
      var formattedDate = new Date(x.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
      var newRow = '<div class="post-wrapper__post">';
      newRow += '<img src="https://placeimg.com/350/240/any">';
      newRow += '<div class="post-wrapper__post__date">';
      newRow += '<span>' + formattedDate + '</span></div>';
      newRow += '<div class="post-wrapper__post__category">';
      newRow += '<span>' + x.User.username + '</span>';
      newRow += '</div>';
      newRow += '<div class="post-wrapper__post__word">';
      newRow += '<span>Word : ' + x.word + "</span>";
      newRow += '</div>';
      newRow += '<h3>' + x.title + '</h3>';
      // newRow += '<a href="/cms?post_id=' + x.id + '" id="view-more"><b>view more →</b></a>';
      newRow += '<a href="/displayBlog?post_id=' + x.id +'" id="view-more"><b>view more →</b></a>';
      newRow += '</div>'
      
  
      $("#myPosts").append(newRow)
    }
  
  
  })