


//   let userId;
//     // This file just does a GET request to figure out which user is logged in
//     // and updates the HTML on the page
//     $.get("/api/user_data").then(function(data) {
//       // console.log(data)
//       if(Object.keys(data).length > 0){
//         $("#loginLink").remove()
//         $("#signUpLink").remove()
//       }
//       else if (!Object.keys(data).length > 0) {
//         // $("#createEventLink").remove()
//         $("#accountLink").remove()
//         $("#logOutLink").remove()
//       }
//       $(".member-name").text(data.name);

// userId = data.id
// console.log(userId)
//       // membersData = data

//     });

//     var posts;

//     var url = window.location.search;
//   // var authorId;
//   // if (url.indexOf("?author_id=") !== -1) {
//   //   authorId = url.split("=")[1];
//   //   getPosts(authorId);
//   // }
//   // If there's no authorId we just get all posts as usual
//   // else {
//     getPosts();
//   // }


//     function getPosts() {
//       // authorId = author || "";
//       // if (username) {
//       //   username = "/:" + username;
//       // }

//       $.get("/api/posts/" + userId, function(data) {
//         console.log("Posts", data);
//         posts = data;
//         if (!posts || !posts.length) {
//           // displayEmpty(author);
//           console.log("this author does not have any posts yet")
//         }
//         else {
//           initializeRows();
//         }
//       });
//     }
//   // InitializeRows handles appending all of our constructed post HTML inside blogContainer
//   function initializeRows() {
//     // blogContainer.empty();
//     var postsToAdd = [];
//     for (var i = 0; i < posts.length; i++) {
//       postsToAdd.push(createNewRow(posts[i]));
//     }
//     blogContainer.append(postsToAdd);
//   }

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
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("You haven't created any events yet!" + partial + ", navigate <a href='/create" + query +

            "'>here</a> in order to get started.");
        yourEvents.append(messageH2);
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
      // var formattedDate = new Date(x.createdAt);
      var newRow = '<div class="post-wrapper__post">';
      newRow += '<img src="https://placeimg.com/350/240/any">';
      newRow += '<div class="post-wrapper__post__date">';
      newRow += '<span>01 Agust 2018</span></div>';
      newRow += '<div class="post-wrapper__post__category">';
      newRow += '<span>' + x.User.username + '</span>';
      newRow += '</div>';
      newRow += '<h3>' + x.title + '</h3>';
      newRow += '<b>view more →</b>';
      newRow += '</div>'
  
      $(".post-wrapper").append(newRow)
    }
  
  
  })