$(document).ready(function() {
      let words;


// $.get("/api/words", function (data) {
//     console.log("okay")
//     console.log("words", data);
//      words = data;
//   });

    let emotion;
    let word;
    let definition;
    
    
    
    
    
        $("#searchEmotion").on("click", function() {
            event.preventDefault()
            $.get("/api/words", function(data) {
                console.log(data)
                word = data
                alert(word)
            })
            
            
          
            // emotion = $("input").val().trim()
            // console.log(emotion)
            // alert(emotion)
            // var user_data = {
            //     emotion: emotion
            // }
        
            // checkWord(user_data);
            // getMatch()
          })
            // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
           
            function checkWord(user_data) {
                $.post("/api/aussi/", {
                  feeling: user_data.emotion
                }).then(function(data) {
                  word = (data.words[0].word)
                  definition = (data.words[0].definition)
                  console.log(word)
                  console.log(definition)
                  displayMatches()
                  // If there's an error, log the error
                }).catch(function(err) {
                  console.log(err);
                });
              }
              function getMatch() {
              $.get("/api/aussi/").then(function(data) {
                // console.log(data)
                // // definition = data.words[0].definition;
                // // word = data.words[0].word;
             });
            }
             
    
            function displayMatches() {
              const newRow = $('<div>').addClass("row")
              const h1 = $('<h4>').text(word)
              const p = $('<p>').text(definition)
              $("#matches").append(newRow)
              $(newRow).append(h1)
              $(newRow).append(p)
            }
          });
        
        //   const header = document.querySelector('.header');
        //   const headerContent = header.querySelector('.header-content');
          
        //   window.addEventListener('scroll', e => {
        //     headerContent.style.top = `${50 + (window.pageYOffset / 16)}%`
        //   });