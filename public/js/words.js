$(document).ready(function() {
  let words;
      let thisWord;
  $(document).on('click', '#writeBtn', function() {
   
           
      thisWord = $(this).attr("attr")

      console.log(thisWord);
      window.location.href = '/discussion?use_id=' + thisWord.match(/[A-Z][a-z]+/g)
 
    })
  
  
      


// $.get("/api/words", function (data) {
//     console.log("okay")
//     console.log("words", data);
//      words = data;
//   });

    let emotion;
    let definition;
    
    // request to get all words in database
      // $.get("/api/words", function(data) {
            //     console.log(data)
            //     word = data
            //     alert(word)
            // })
    
    
        $("#searchEmotion").on("click", function() {
            event.preventDefault()
            $('#matches').empty()
          
            emotion = $("input").val().trim()
            // console.log(emotion)
            var user_emotion = {
                emotion: emotion
            }
       
            checkWord(user_emotion);
            getMatch()
            
            // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
           
            function checkWord(user_emotion) {
                $.post("/api/aussi", user_emotion).then(function(data) {
                //   wordMatch = (data.words[0].word)
                //   definition = (data.words[0].definition)
                  words = data.words
                  // console.log(data)
                
                //   console.log(wordMatch)
                //   console.log(definition)
                if (words[0]) {
                populateWords(words)
                }
                else {
                  populateWarning();
                }
             
                //   displayMatches()
                  // If there's an error, log the error
                }).catch(function(err) {
                  
                //   console.log(err);
                });
              }

              function populateWarning(){
              document.getElementById("alertBtn").classList.remove("alertBtnDisappear");
              setTimeout(function() {document.getElementById('alertBtn').className='alertBtnDisappear btn btn-warning toast-action disabled';},3000);
               }

              function populateWords(data) {
                var wordData = data;
                for (let i = 0; i < wordData.length; i++) {
                  let newCardData = wordData[i]
                  displayMatches(newCardData)
                };
      
            };
              function getMatch() {
              $.get("/api/aussi", function(data){
                // console.log(data)
              }).then(function(data) {
            // console.log("actual match",data)
            //     definition = data.words[0].definition;
            //     word = data.words[0].word;
             }).catch(function (err) {
                console.log(err);
                res.json(err);
                //   res.status(422).json(err.errors[0].message);
            });;
            }

             
    
            function displayMatches(x) {
                var newRow =  '<div class="card">';
                newRow += '<div class="card__img">';
                newRow += '<div class="ishadow">';
               newRow += '<img data-blur="20" data-hover="true" src="' + x.ImageURL + '">';
               newRow += '</div>';
               newRow += '</div>';
               newRow += '<div class="card__content">';
               newRow += '<div class="card__title">' + x.word + '</div>';
               newRow += ' <div class="card__description">' + x.definition + '</div>';
               newRow += '<button id="writeBtn" type="submit" value="Submit" class="button button--rayen button--border-thin button--text-thick button--text-upper button--size-s" attr=' + x.word.replace(/ +/g, "") + " data-text=Write bout' it!><span>Write bout' it!</span></button>";
               newRow += '</div>';
               newRow += '</div>';

              $("#matches").append(newRow)
 
            
            //   $(newRow).append(h1)
            //   $(newRow).append(p)
            }
           
          
          });
          

      })
        
        //   const header = document.querySelector('.header');
        //   const headerContent = header.querySelector('.header-content');
          
        //   window.addEventListener('scroll', e => {
        //     headerContent.style.top = `${50 + (window.pageYOffset / 16)}%`
        //   });



        // '<div class="card main"><img src="https://ak8.picdn.net/shutterstock/videos/3635288/thumb/1.jpg" class="card-img-top" alt="#"><div class="card-body"><h5 class="card-title event-title">' + wordMatch + '</h5><br><p class="card-text event-desc">'+definition+'</p><br><p class="card-text event-deets"><p class="card-text event-deets">Location: '+x.location+'</p>Category: '+x.category+'</p><p class="card-text event-deets">Created by: '+x.User.name+'</p><p class="card-text event-deets">Date: '+x.date+'</p><p class="card-text event-deets">Time: '+x.time+'</p></div></div>';