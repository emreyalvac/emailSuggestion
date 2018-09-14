var email = document.querySelector('.email'),
    auto = document.querySelector('.suggestions'),

    popularEmails = ['gmail.com', 'googlemail.com', 'hotmail.com', 'yahoo.com', 'msn.com', 'aol.com'],

    itemSelected = 0,
    
    itemList = [];

window.addEventListener('keyup', function(){
    
  if(window.event.keyCode === 40) {
    if(itemSelected === (itemList.length - 1)) {
      itemSelected = itemList.length - 1;
    }
    else {
      itemSelected += 1;
    }
  }

  if(window.event.keyCode === 38) {
    if(itemSelected === 0) {
      return;
    }
    else {
      itemSelected -= 1;
    }
  }
  
  if(window.event.keyCode === 13) {
    email.value = itemList[itemSelected].textContent;
    auto.innerHTML = '';
  }
  
  for(var i = 0; i < itemList.length; i++) {
    if(itemList[i].classList.contains('selected')) {
      itemList[i].classList.remove('selected');
    }
    if(itemSelected === i) {
      itemList[i].classList.add('selected');
    }
  }
  
  console.log(itemSelected, itemList);
});


email.addEventListener('keyup', function() {
  auto.innerHTML = '';
  
  if(email.value.match('@')) { 
    var afterAt = email.value.substring(email.value.indexOf('@') + 1, email.value.length);
    var popularEmailsSub = [];
    
    for(var l = 0; l < popularEmails.length; l++) {
      popularEmailsSub.push(popularEmails[l].substring(0, afterAt.length))
    }
    
    if(afterAt == '') {
      for(var i = 0; i < popularEmails.length; i++) {
        auto.innerHTML += '<li>' + email.value + popularEmails[i] + '</li>';
      }
      itemList = document.querySelectorAll('.autosuffix li');
      itemList[0].classList.add('selected');
    }
    
    else if(!(afterAt == '')) {
      var matchedEmails = [];
      
      for(var k = 0; k < popularEmails.length; k++) {
        if(popularEmailsSub[k].match(afterAt)) {
          matchedEmails.push(popularEmails[k]);                   
        }
      }
      
      for(var i = 0; i < matchedEmails.length; i++) {
        auto.innerHTML += '<li>' + email.value.substring(0, email.value.indexOf('@')) + '@' + matchedEmails[i] + '</li>';
      }
    }
    
    var itemsList = document.querySelectorAll('.autosuffix li');
    
    for(var j = 0; j < itemsList.length; j++) {
      itemsList[j].addEventListener('click', function() {
        email.value = this.textContent;
        auto.innerHTML = '';
      });
    }
  }
});
