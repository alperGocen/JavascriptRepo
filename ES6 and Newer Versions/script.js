// you can check out what let and const keywords are used for from the
// completed code of the course

//ES5 version 

var box = {
    color: 'green',
    position: 1,
    clickMe: function () {
        document.querySelector('.green').addEventListener('click',
  // ARROW FUNCTİONS SHARE THE THİS KEYWORD WITH ITS OUTTER SCOPE
            () => {
                var str = 'This is box number ' + this.position +
                    ' and it is ' + this.color;
                alert(str);
            });
    }
}

box.clickMe();