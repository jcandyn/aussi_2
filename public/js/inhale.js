var text = document.getElementById('text');
var current=1;
function changetext(){
  text.classList.add("bye");
  if(current == 1){
    setTimeout(function(){
      text.innerText = 'EXHALE';text.classList.remove("bye");
    },600);
    current = 0;
  }else{
    setTimeout(function(){
      text.innerText = 'INHALE';text.classList.remove("bye");
    },600);
    current = 1;
  }
}
setInterval(function(){changetext()},6000)