let emotion;

$("#searchEmotion").on("click", function() {
    event.preventDefault()
    emotion = $("input").val().trim()
    console.log(emotion)
    alert(emotion)
})
