class Stack {
    constructor() {
        this.items = [];
    }

    Push(temp) {
        return this.items.push(temp);
    }

    Pop() {
        if (this.items.length > 0) {
            return this.items.pop();
        }
    }

    Top() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        if (this.items.length == 0) {
            return true;
        };
        return false;

    }
    // issome(){
    //     return this.isEmpty();
    // }

}

let infixinput = document.getElementById('infixInput');
let posfixinput = document.getElementById('Postfix');
let prefixinput = document.getElementById('Prefix');
let Resulttitle = document.getElementById('Resulttitle');
let result = document.getElementById('result');

function oprend(temp) {
    if (temp != '+' && temp != '-' &&
        temp != '^' && temp != '*' &&
        temp != '/' && temp != '(' &&
        temp != ')') {
        return true;
    }
    else
        return false;
}


function checkPrecedence(temp, obj) {
    if (temp == ')') {
        return true;
    }
    if (obj.Top() == '(') {
        return false;
    }
    else if (obj.Top() == '^' && temp == '^' || obj.Top() == '^' && temp == '/' || obj.Top() == '^' && temp == '*'
        || obj.Top() == '^' && temp == '+' || obj.Top() == '^' && temp == '-') {

        return true;
    }

    else if (obj.Top() == '/' && temp == '/' || obj.Top() == '/' && temp == '*' ||
        obj.Top() == '/' && temp == '+' || obj.Top() == '/' && temp == '-'
    ) {

        return true;
    }
    else if (obj.Top() == '*' && temp == '*' || obj.Top() == '*' && temp == '+' ||
        obj.Top() == '*' && temp == '-') {

        return true;
    }
    else if (obj.Top() == '+' && temp == '+' ||
        obj.Top() == '+' && temp == '-') {

        return true;
    }
    else if (obj.Top() == '-' && temp == '-') {

        return true;
    }
    else {
        return false;
    }

}


function infixTOpostfix(Infix) {
    let temp;
    let postfix = "";
    let obj = new Stack();
    
    for (let i = 0; i < Infix.length; i++) {
        temp = Infix[i];

        if (oprend(temp)) {
            postfix = postfix.concat(temp);

        }
        else {
            while (!obj.isEmpty() && checkPrecedence(temp, obj)) {

                if (obj.Top() != '(') {
                    postfix = postfix.concat(obj.Pop());

                }
                else {
                    obj.Pop();
                }
            }
            if (temp != ')') {
                obj.Push(temp);

            }

        }
    }
    while (!obj.isEmpty()) {
        postfix = postfix.concat(obj.Pop());

    }
    return postfix;

}

function reverseString(str) {

    const arrayStrings = str.split("");
   
    const reverseArray = arrayStrings.reverse();

    const joinArray = reverseArray.join("");
    
    return joinArray;
}

function infixTOprefix(Infix) {

    let prefix = "";

    Infix = reverseString(Infix);
    for (let i = 0; i < Infix.length; i++) {
        if (Infix[i] == '(') {
            Infix[i] = ')';
        }
        else {
            Infix[i] = '(';

        }
    }
    prefix = infixTOpostfix(Infix);
    prefix = reverseString(prefix);
    return prefix;

}

function convert() {
    let infix = infixinput.value;
    let post = posfixinput.checked;
    let res;
    if (post) {
        res = infixTOpostfix(infix);
        output(post, res);
    }
    else {
        res = infixTOprefix(infix);
        output(post, res);

    }

}
function output(post, res) {
    if (post) {
        Resulttitle.innerText = "Postfix:";
        result.innerText = res
        console.log(res);
    }
    else {
        Resulttitle.innerText = "Prefix:";
        result.innerText = res

    }
}