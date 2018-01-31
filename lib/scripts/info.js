$(document).ready(function() {

  const btnContainer = document.getElementById("toggle");
  const btns = btnContainer.getElementsByTagName('button');
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      let current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }

  $('.toggle-about').on('click', function() {
   	 $('.about').show();
     $('.company').hide();
     $('.future').hide();
  });

  $('.toggle-company').on('click', function() {
   	 $('.company').show();
     $('.about').hide();
     $('.future').hide();
  });

  $('.toggle-future').on('click', function() {
   	 $('.future').show();
     $('.about').hide();
     $('.company').hide();
  });

});
