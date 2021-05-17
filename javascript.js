
//variables for DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

//created function for use in pword gen function for loop
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

//generate event--listen for click and generate pword
generate.addEventListener('click', () =>{
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);

});

//add click listener to copy generated pword to clipboard
clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }

    //make text area for password to be copied to; show copied msg
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!');
});


//generate  password function; longest process
function generatePassword(lower, upper, number, symbol, length) {

    let generatedPassword = '';
    
    const typesCount = lower + upper + number + symbol;

    const typesArr = [{ lower}, { upper }, { number }, { symbol }].filter
    (
        item => Object.values(item)[0]
    );

    if (typesCount === 0) {
        return '';
    }    

    for (let i = 0; i < length; i+=typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }
    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword 

}   
 
//functions for each generator type, lower, upper, number,  and symbol using Character Code chart position reference

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = "!@#$%&()<>=*+,-./~";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

//console.log(getRandomSymbol());


