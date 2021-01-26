const win = document.querySelector('.window');
const numbers = document.querySelectorAll('[data-num]');
const operators = document.querySelectorAll('[data-operator]');
const percent = document.querySelector('[data-percent]');
const reverse = document.querySelector('[data-reverse]');
const ac = document.querySelector('[data-reset]');
const res = document.querySelector('[data-result]');

let equation = '';
let outcome;
let lastNum = '';
let lastOperator = '';
let x = 1;

let calc = function() {

    function showStats() {
        console.group();
        console.log('Equation:', equation);
        console.log("Last number:", lastNum);
        console.log('Last operator', lastOperator);
        console.log('Outcome', outcome );
        console.log("x", x);
        console.groupEnd();
    }

    function swap() {
        if (win.textContent != '0' && equation != '') {
            ac.textContent = "C";
        } else {
            ac.textContent = "AC";
        }
    }

    reverse.addEventListener('click', ()=> {
        // Нужно исправить косяк если последний символ оператор
        if(equation.slice(-1).match(/[+*%/-]/)) {
            equation = equation.slice(0,-1); // обрезаем последний символ
            console.log('cheeck', showStats());
            x = 3;
        }

        if (win.textContent != '0' && equation != '') {
            if (x == 2) {
                lastNum = equation;
                x = 1;
            }
            if (!lastNum.match(/[-]/g)) {
                let y = lastNum.length; //определяем длинну последнего номера
                lastNum ="" + -lastNum; // последний номер получает минус
                
                equation = equation.slice(0,-y); // обрезаем equation 
                equation +=lastNum; //добавляем к обрезаной формуле lastNum со знаком минусов
                win.textContent = lastNum;
            } else {
                let y = lastNum.length; //определяем длинну последнего номера со знаком минус
                equation = equation.slice(0,-y); // обрезаем equation 
                lastNum = lastNum.slice(1);
                equation +=lastNum;
                win.textContent = lastNum;
            }
            if (x == 3) {
                equation += lastOperator;
                x=1;
            }
        } else {
            return;
        }
        showStats();
    });

    percent.addEventListener('click', ()=> {
        if(!equation || equation.match(/[+*%/-]/)) {
            return;
        } else {
            outcome = "" + equation/100;
            win.textContent = outcome;
            equation = outcome;
            showStats();
        }
    });

    ac.addEventListener('click', ()=> {
        //IF STATEMENT AC OR C
        if (ac.textContent == "C") {
            win.textContent = 0;
            equation = "";
            swap();
            x = 3;
            showStats();
        } else {
            equation = '';
            lastNum = '';
            lastOperator = '';
            x = 1;
            outcome = 0;
            win.textContent = 0;
            showStats();
        }
    });

    numbers.forEach(num => {
        num.addEventListener('click', (e)=> {
            //используем результат первого решения как аргумент для второго
            if (outcome || x == 2) {
                // equation="";
                lastNum = '';
                outcome = 0; // перезаписываем рез на ноль
                win.textContent = ''; // убираем раз с экрана
                if(!equation.slice(-1).match(/[+*%/-]/) || equation == 0) {
                    equation = '';
                }
            }
            x = 1;
            //игнорируем нажатие на ноль если у нас ноль
            if (win.textContent == '0' && equation == 0 && e.target.value == 0) {
                return;
            }
            //перезаписываем изначальный ноль нажатой кнопкой
            if (win.textContent == '0' && !equation) {
                win.textContent = '';
                equation = '';
                lastNum = '';
            }
            // если последний символ уравнения является знаком, то очищаем окно и lastNum
            if (equation.slice(-1).match(/[+*%/-]/)) {
                win.textContent = '';
                lastNum = '';
            }

            if (e.target.value == '.') {
                if (lastNum.slice(-1) != '.' && !lastNum.match(/\./g)) {
                    if(win.textContent == 0) {
                        equation += e.target.value;
                        lastNum +=e.target.value;
                        win.textContent ='0'+ e.target.value;
                        return;
                    }
                    equation += e.target.value;
                    lastNum +=e.target.value;
                    win.textContent += e.target.value;
                    return;
                } else {
                    return;
                }
            }
            win.textContent += e.target.value;
            equation += e.target.value;
            lastNum +=e.target.value;
            showStats();
        });        
    });

    operators.forEach(oper => {
        oper.addEventListener('click', (e)=> {
            if (win.textContent != '0' && equation != '') {
                x = 1;
            lastOperator = e.target.value;
            if(equation.slice(-1).match(/[+*%/-]/)){
                equation = equation.slice(0, -1);
            }
            equation += e.target.value;
            showStats();
            }
        });
    });

    res.addEventListener('click', ()=> {
        equation = equation.replace(/--/g, "+");
        //SWITCH
        switch(x) {
            case 1: 
            if (win.textContent == '0' && equation == '')  {
                return;
            }
                // equation = equation + lastOperator + lastNum;
                outcome = eval(equation);
                win.textContent = outcome;
                equation = '' + outcome;
                x = 2;
                showStats();
                break;
            case 2: 
                if (lastOperator && lastNum) {
                    outcome = eval(equation + lastOperator + lastNum);
                    equation = '' + outcome;
                    // ДОАВИТЬ УСЛОВИЕ ПО КОТОРОМУ ЕСЛИ ЧИСЛО ИМЕЕТ ДЕСЯТИЧНЫЕ СОКРАТИТЬ ЕГО
                    win.textContent = outcome;
                    showStats();
                } else {
                    return;
                }
                break;
            case 3: 
                if(!equation) {
                    lastNum = outcome;
                    equation = "" + outcome;
                    win.textContent = outcome;
                    showStats();
                } else {
                    equation = equation + lastOperator + outcome;
                    win.textContent = eval(equation);
                    showStats();
                }
                break;
        }
    });
    numbers.forEach(num=> {
        num.addEventListener('click', ()=> {
            swap();
        });
    });
    showStats();
};
calc();




// косяк с нулем
// косяк с минусом / добавить возможность добавить минус последнему номеру после добавнления оператора
// старый номер стирается про нажатии на конпку если предыдущий символ - оператор
