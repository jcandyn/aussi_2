$(document).ready(function() {
  var urlParam = function(name, w){
    w = w || window;
    var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
        val = w.location.search.match(rx);
    return !val ? '':val[1];
}
let userId;
var useId = urlParam('use_id');



useId = useId.split("%")[0]
useId = useId.replace(/,/g, ' ')


var updating = false;


  $("#postWord").text(useId)




  // Getting jQuery references to the post body, title, form, and author select
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var cmsForm = $("#cms");
  var categorySelect = $("#post-category");

  $.get("/api/user_data").then(function(data) {

userId = data.id;
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);

  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var postId;
  var authorId;
  // Sets a flag for whether or not we're updating a post to be false initially
 

  // If we have this section in our url, we pull out the post id from the url
  // In '?post_id=1', postId is 1
  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId, "post");
  }
  // Otherwise if we have an author_id in our url, preset the author select box to be our Author
  else if (url.indexOf("?author_id=") !== -1) {
    authorId = url.split("=")[1];
  }



    // membersData = data

  });


  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or author
    if (!titleInput.val().trim() || !bodyInput.val().trim() || !categorySelect.val()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newPost = {
      UserId: userId,
      word: useId,
      title: titleInput
        .val()
        .trim(),
      body: bodyInput
        .val()
        .trim(),
      category: categorySelect.val()
    };

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newPost.id = postId;
      updatePost(newPost);
    }
    else {
      submitPost(newPost);
    }
  }

  // Submits a new post and brings user to blog page upon completion
  function submitPost(post) {
    if (post.word) {
    $.post("/api/posts", post, function() {
      console.log(post)
      window.location.href = "/blog";
    });
  }
  else {
  alert('please choose a word to write about.')
  }
  }

  // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
  // function getPostData(id, type) {
  //   var queryUrl;
  //   switch (type) {
  //   case "post":
  //     queryUrl = "/api/posts/" + id;
  //     break;
  //   case "author":
  //     queryUrl = "/api/authors/" + id;
  //     break;
  //   default:
  //     return;
  //   }
    // $.get(queryUrl, function(data) {
    //   if (data) {
    //     console.log(data.AuthorId || data.id);
    //     // If this post exists, prefill our cms forms with its data
    //     titleInput.val(data.title);
    //     bodyInput.val(data.body);
    //     authorId = data.AuthorId || data.id;
    //     // If we have a post with this id, set a flag for us to know to update the post
    //     // when we hit submit
    //     updating = true;
    //   }
    // });

 

  // Update a given post, bring user to the blog page when done
//   function updatePost(post) {
//     $.ajax({
//       method: "PUT",
//       url: "/api/posts",
//       data: post
//     })
//       .then(function() {
//         window.location.href = "/blog";
//       });
//   }
});
