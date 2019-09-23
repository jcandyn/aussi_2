$(document).ready(function() {
      let words;
      let wordMatch;


// $.get("/api/words", function (data) {
//     console.log("okay")
//     console.log("words", data);
//      words = data;
//   });

    let emotion;
    let word;
    let definition;
    
    // request to get all words in database
      // $.get("/api/words", function(data) {
            //     console.log(data)
            //     word = data
            //     alert(word)
            // })
    
    
        $("#searchEmotion").on("click", function() {
            event.preventDefault()
          
            emotion = $("input").val().trim()
            console.log(emotion)
            var user_emotion = {
                emotion: emotion
            }
        
            checkWord(user_emotion);
            getMatch()
          })
            // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
           
            function checkWord(user_emotion) {
                $.post("/api/aussi", user_emotion).then(function(data) {
                  wordMatch = (data.words[0].word)
                  definition = (data.words[0].definition)
                  console.log(data)
                //   console.log(wordMatch)
                //   console.log(definition)
                  displayMatches()
                  // If there's an error, log the error
                }).catch(function(err) {
                //   console.log(err);
                });
              }
              function getMatch() {
              $.get("/api/aussi", function(data){
                console.log(data)
              }).then(function(data) {
            console.log("actual match",data)
            //     definition = data.words[0].definition;
            //     word = data.words[0].word;
             }).catch(function (err) {
                console.log(err);
                res.json(err);
                //   res.status(422).json(err.errors[0].message);
            });;
            }

             
    
            function displayMatches() {
                $('#matches').empty()
              const newRow = $('<div>').addClass("row")
              const h1 = $('<h4>').text(wordMatch).addClass("row")
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