// Function constructor **********************************************

var john = {
    name:'John',
    yearOfBirth: 1990,
    job: 'teacher'
};


var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    
}

// We add the method in the prototype chain by adding it to Person's *************
// prototype property

Person.prototype.calculateAge = function(){
    console.log(2019 - this.yearOfBirth);
};

var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1985, 'engineer');
var michael = new Person('Michael', 1995, 'vet');



john.calculateAge();
jane.calculateAge();
michael.calculateAge();


// Object.create() ***************************
// Here the object we will create will be inherited from personProto
// On the other hand, in func constructors they inherit from 
// the constructors' prototype property
var personProto = {
    calculateAge: function(){
        console.log(2019 - this.yearOfBirth);
    }
};

var john  = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';

var jane = Object.create(personProto, {
    name: {value : 'Jane'},
    yearOfBirth: {value : 1990},
    job: {value : 'designer'}
});

// Primitives and Objects **********************


// Primitives
var a = 23;
var b = a;
a = 46;
console.log(a);
console.log(b);


// Objects
var obj1 = {
    name: 'John',
    age: 26
};

var obj2 = obj1;
obj1.age = 30;
console.log(obj1.age);
console.log(obj2.age);

// First class functions  : Passing functions as arguments ******************

var years =  [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = [];
    arr.forEach(element => {
        arrRes.push(fn(element));
    });
    return arrRes;
}

function calculateAge(el){
    return 2019 - el;
}

var ages = arrayCalc(years, calculateAge);
console.log(ages);

// First class functions : Functions returning functions ******************

function interviewQuestion(job){
    if(job === 'software eng'){
        return function(name){
            console.log(name + 'can you please explain what' +
            + 'the SOLID principles are?');
        };
   
    } else if(job === 'teacher'){ 
        return function(name){
            console.log('What subjects do you teach, ' + name + '?');
        }
    }
    
};

// Immediately Invoked Function Expressions ********************

// function game(){
//     var score = Math.random() * 10;
//     console.log(score >= 5);
// }
// game();

// Instead of the one above we do,

(function () {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();

(function (goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLock);
})(5);


// Closures *****************************

function retirement(retirementAge){
    var a = ' years left until retirement';
    return function(yearOfBirth){
        var age = 2019 - yearOfBirth;
        console.log(retirementAge - age + a);
    };
}

var retirementUS = retirement(66);
retirementUS(1990);
retirement(66)(1990); // here retirement with 66 is called and finishes its execution
// even after that the function returned in retirement has access to the variable
// a in the retirement function.

// An inner function has always access to the variables and parameters of its
// outter function, even after the outter function has returned. 
// This is called closure



// Bind, Call and Apply ***********************

// Bind() fonksiyonu, içine verilen objeye göre yeni bir 
// fonksiyon kopyası yaratır. Oluşan bu kopya fonksiyonu
//  daha sonradan argüman listesi ile beraber 
//  gönderilen objeye kullanabiliriz.

// Call() fonksiyonu, verilen this anahtar değeriyle(obje)
//  ve bağımsız olarak sağlanan bağımsız argümanlarla
//   bir fonksiyonu çağırır. Argümanlar fonksiyona tek tek
//    gönderilir. (Örnek: test(obj,arg1,arg2,arg3))
// Apply() fonksiyonu, verilen this anahtar değeriyle(obje)
//  ve bağımsız olarak sağlanan değişkenlerle bir
//   fonksiyonu çağırır. Argümanlar fonksiyona argüman
//    listesi şeklinde gönderilir.
//     (Örnek: test(obj,[arg1,arg2,arg3]))