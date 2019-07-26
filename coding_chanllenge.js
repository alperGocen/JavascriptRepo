var question = function(number,quest,answers,correctNumber){
    this.number = number
    this.quest = quest;
    this.answers = answers;
    this.correctNumber = correctNumber;
};

function questionCreater(){
    var q1 = new question(1,'What is the capital city of Turkey?',
    ['1. Ankara', '2. Izmir', '3. Istanbul'],'1');
   
    var q2 = new question(2,'What is the most crowded city in Turkey?',
    ['1. Istanbul','2. Izmir','3. Kocaeli'],'1');
   
    var q3 = new question(3,'Which city in Turkey is famous for its olives?',
    ['1. Istanbul','2. Izmir','3. Kocaeli'],'2');

    var question_array = [q1,q2,q3];

    return question_array;
}

function randomQuestionSelector(array){
    var randomNumber = Math.floor(Math.random() * 3);
    var selectedQuestion = array[randomNumber];
    return selectedQuestion;
}

function getAnswerFromUser(questionText,answers){
    var answer = prompt(questionText + '\n' + answers);
    return answer;

}

while(true){
    var questions = questionCreater();
    var selected = randomQuestionSelector(questions);
    console.log(selected.quest);
    var answer = getAnswerFromUser(selected.quest,selected.answers);
    if(answer === selected.correctNumber){
        console.log('Your answer is correct!! Congrats');
        break;
    }else{
        console.log('Your answer is wrong. Next question.. \n');
        continue;
    }
       
}







 
