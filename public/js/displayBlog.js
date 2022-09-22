$(document).ready(function() {
  /* global moment */

  // blogContainer holds all of our posts
  var blogContainer = $(".blog-container");
  
  var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  // Variable to hold our posts
  var posts;

  // The code below handles the case where we want to get blog posts for a specific post
  // Looks for a query param in the url for post_id
  var url = window.location.search;
  var post_id;
  if (url.indexOf("?post_id=") !== -1) {
    post_id = url.split("=")[1];
    getPosts(post_id);
  }
  // If there's no post_id we just get all posts as usual
  else {
    getPosts();
  }


  // This function grabs posts from the database and updates the view
  function getPosts(post) {
    post_id = post || "";
    if (post_id) {
      post_id = "/?post_id=" + post_id;
    }
    console.log(post_id);
    $.get("/api/post" + post_id, function(data) {
      console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty(post);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    })
      .then(function() {
        getPosts(postCategorySelect.val());
      });
  }

  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    blogContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    
    console.log(post)
    var formattedDate = new Date(post.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
    var newRow = '<section class="post">'
   + '<h3 class="description">- ' + post.word + ' - </h3>'
   + '<h1>' + post.title + '</h1>'
   + '<p>Dreamcatcher nesciunt pour-over, VHS Schlitz et hella occaecat Wes Anderson put a bird on it quinoa voluptate occupy jean shorts. Yr vegan readymade mlkshk, pour-over cornhole fap tempor Wes Anderson direct trade. Banjo bicycle rights Godard fingerstache, occupy deep v mollit tote bag raw denim ugh banh mi trust fund nisi Williamsburg.</p>'
    + '<p>Fingerstache forage semiotics messenger bag. Retro whatever cardigan stumptown, PBR banh mi mollit. Assumenda mumblecore placeat readymade enim irure. Bushwick ullamco gastropub pickled gluten-free, retro post-ironic kogi tousled shabby chic photo booth deep v jean shorts fap tattooed. Banksy cray Etsy voluptate, sunt pickled DIY irony. American apparel ethnic duis, thundercats locavore 8-bit trust fund shabby chic single-origin coffee freegan asymmetrical Truffaut Cosby sweater vinyl ut.'
   + '</p>'
      
   +'<h2>Title Header 2</h2>'
    +'<p> Literally trust fund yolo, messenger bag kale chips photo booth cray et delectus deep v biodiesel leggings cillum shoreditch meh. Meh trust fund four loko, Brooklyn twee post-ironic tousled Vice magna.</p>'
    +'<blockquote>"The best things in life are not things."</blockquote>'
    
    +'<p>Hashtag banjo helvetica chambray, occupy you probably haven not heard of them kogi banh mi Carles. Intelligentsia Cosby sweater try-hard ullamco, Austin tote bag aliqu.aMcSweeney sapiente eiusmod Truffaut, ugh semiotics incididunt dolore. Pop-up Marfa cred Brooklyn. Hashtag irure umami aliquip laboris, commodo Vice aliqua biodiesel McSweeney nihil keytar flannel freegan lo-fi.</p>'
      
     + '<figure>'
       + '<img src="https://unsplash.s3.amazonaws.com/batch%206/lighthouse.jpg" alt="Light house" class="pic-medium" />'
     + '</figure>'
    
      + '<p>Hoodie semiotics tousled brunch, eu 3 wolf moon sartorial flannel Wes Anderson 8-bit organic ugh gastropub. Kale chips sunt DIY, Terry Richardson commodo id culpa Portland leggings. Culpa assumenda jean shorts, ugh readymade lo-fi laborum minim forage sunt 3 wolf moon kale chips aliqua et bicycle rights. Selvage accusamus meggings McSweeney twee cliche gastropub, nisi anim. Sunt in post-ironic mustache sapiente blog church-key, Etsy hoodie fanny pack occaecat selfies Austin id quinoa.</p>'
  
    + '<figure>'
      + '<img src="https://unsplash.s3.amazonaws.com/batch%205/pier.JPG" alt="Pier 2 exports" class="pic-medium" />'
    '</figure>'
    
    + '<p>Bitters Tonx mixtape hella four loko. Tofu meggings McSweeney scenester kitsch, brunch four loko Austin dreamcatcher High Life readymade tote bag single-origin coffee. Synth shabby chic High Life butcher iPhone cray. Small batch Tonx tumblr, Austin readymade Terry Richardson dreamcatcher Banksy blue bottle hoodie food truck kogi Bushwick Odd Future. Church-key chillwave Banksy butcher cardigan.</p>'
    
    + '<h3 class="thanks">Thanks for viewing!</h3>'
  
  + '</section>';

    $(".post-wrapper").append(newRow)
  }

  // This function figures out which post we want to delete and then calls deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/cms?post_id=" + currentPost.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for post #" + id;
    }
    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No posts yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    blogContainer.append(messageH2);
  }

});