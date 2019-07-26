//BUDGET CONTROLLER
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (curr) {
            sum = sum + curr.value;
        });

        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            inc: 0,
            exp: 0
        },

        budget: 0,

        percentage: -1
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;
            // Create new ID
            if (data.allItems[type].length === 0)
                ID = 0;
            else
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;

            // Create a new object based on the type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // Push the new object into the new data structure
            data.allItems[type].push(newItem);
            return newItem;

        },

        deleteItem : function(type, id){

          var ids = data.allItems[type].map(function(current){
            return current.id;
          });
         
          var index = ids.indexOf(id);
         
          if(index !== -1){
              data.allItems[type].splice(index,1);
              console.log('the item has been deleted');
          }

        },

        testing: function () {
            console.log(data);
        },

        calculateBudget: function () {
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            // calculate the budget income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate the percentage of income that we spent
            if (data.totals.inc > 0)
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            else
                data.percentage = -1;
        },

        getBudget: function () {
            return {
                income: data.totals.inc,
                expense: data.totals.exp,
                budget: data.budget,
                percentage: data.percentage
            };
        }

    }

})();


// UI CONTROLLER
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        button: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'

    };


    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        getDOMStrings: function () {
            return DOMstrings;
        },

        addListItem: function (obj, type) {
            var html, newHtml, element;
            // Create an html with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                element = DOMstrings.expenseContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }


            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value + ' TL');
            console.log(obj);


            // Insert the html into the DOM 
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem : function(selectorID){
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields: function () {
            var fields;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            var fieldsArr = Array.prototype.slice.call(fields);
            // fieldsArr.forEach(element => {

            // });
            fieldsArr.forEach(function (current, index, array) {
                current.value = "";
            });

            fieldsArr[0].focus();
        },

       displayBudget: function(obj){
           document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget + ' TL';
           document.querySelector(DOMstrings.incomeLabel).textContent = obj.income + ' TL';
           document.querySelector(DOMstrings.expenseLabel).textContent = obj.expense + ' TL';
           document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;

       }

    }

})();


// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.button).addEventListener('click', function () {
            ctrlAddItem();
        });

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)

    };

    var updateBudget = function () {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        // 2. Return the Budget
        var budget = budgetCtrl.getBudget();
        // 3. Display the budget on UI
        UICtrl.displayBudget(budget);
    };

    var ctrlAddItem = function () {
        // 1. Get the input data
        var input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value)) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate and Update the budget
            updateBudget();
        } else {
            alert("Please fill all the fields before you add an item!!");
        }

    };

    var ctrlDeleteItem = function(event){
        var itemID,splitID,splitArr,type;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID){
            splitArr = itemID.split('-');
            splitID = parseInt(splitArr[1]);
            type = splitArr[0];

            // 1. delete the item from the data structure
            budgetCtrl.deleteItem(type, splitID);
            // 2. delte the item from the ui
            UICtrl.deleteListItem(itemID);
            // 3. update and show the new budget


        }
    }

    return {
        init: function () {
            console.log('Application has been started');
            setupEventListeners();
        }
    }


})(budgetController, UIController);

controller.init();