var animateButton = function(e) {
    console.log(e);
  
    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
    },700);
  };
  
  var classname = document.getElementsByClassName("btn")
  console.log(document.getElementsByClassName("btn"))
  for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', animateButton, false);
  }