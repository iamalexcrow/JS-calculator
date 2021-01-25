const btns = document.querySelectorAll('button');

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
        if (win.textContent != '0' && equation != '') {

            if (!lastNum.match(/[-]/g)) {
                lastNum ="" + (-lastNum);
                win.textContent = lastNum;
            } else {
                lastNum = lastNum.slice(1);
                win.textContent = lastNum;
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
            x = 1;
            //allows us to use the result from the previous equation as a basis for new equation
            if (outcome) {
                lastNum = '';
                outcome = 0; // перезаписываем рез на ноль
                win.textContent = ''; // убираем раз с экрана
                if(!equation.slice(-1).match(/[+*%/-]/)) {
                    equation = '';
                }
            }



            if (win.textContent == '0' && equation == 0 && e.target.value == 0) {
                return;
            }


            //if the last symbol is an operator+comma!!! or starting position, we replace the value in the window
            if (win.textContent == '0' && !equation) {
                win.textContent = '';
                equation = '';
                lastNum = '';
            }

            if (equation.slice(-1).match(/[+*%/-]/)) {
                win.textContent = '';
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
            showStats();

            if(equation.slice(-1).match(/[+*%/-]/)){
                equation = equation.slice(0, -1);
                // equation.replace(equation.slice(-1), e.target.value);
            }
            equation += e.target.value;
            lastNum = '';
            showStats();
            }
        });
    });





    res.addEventListener('click', ()=> {
        //SWITCH
        switch(x) {
            case 1: 
            if (win.textContent == '0' && equation == '')  {
                return;
            }
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

        // if(!x) {
        //     outcome = eval(equation);
        //     win.textContent = outcome;
        //     equation = '' + outcome;
        //     x = true;
        //     showStats();
        // } else {
        //     if (lastOperator && lastNum) {
        //         outcome = eval(equation + lastOperator + lastNum);
        //         equation = '' + outcome;
        //         // ДОАВИТЬ УСЛОВИЕ ПО КОТОРОМУ ЕСЛИ ЧИСЛО ИМЕЕТ ДЕСЯТИЧНЫЕ СОКРАТИТЬ ЕГО
        //         win.textContent = outcome;
        //         showStats();
        //     } else {
        //         return;
        //     }
        // }
    });




    // меняет AC/C when buttons are pressed
    numbers.forEach(num=> {
        num.addEventListener('click', ()=> {
            swap();
        });
    });
    showStats();
};

calc();




// add plus/minus functionality
// make sure when you press comma you have zero in front
// change the font 