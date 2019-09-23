var messages = document.getElementById("messages");
var textbox = document.getElementById("textbox");
var button = document.getElementById("button");
let chat_username;
let newMessageData;
let actualMessage;
let message;
let theMessage;

button.addEventListener("click", function(){


// 

$.get("/api/user_data").then(function(data) {
    console.log(data)
    chat_username = data.username;


    // membersData = data

  });



newMessageData = {
    username: chat_username,
    message: actualMessage
}

$.post("api/chat", newMessageData).then(function(data) {
    alert('firing first')
    message = data
    console.log("data from api/chat post call", data)
}).catch(function(err){
    console.log(err)
})

// $.post("api/chat", function(data) {
// alert('firing second')

    // 
     var newMessage = document.createElement("li");
     newMessage.innerHTML = textbox.value;
     actualMessage = textbox.value;
    // actualMessage = data.message;
     messages.appendChild(newMessage);
     textbox.value = "";
    theMessage = data
    // 
//     console.log("data from api/chat post call", data)
// }).catch(function(err){
//     console.log(err)
// })



// 




});


