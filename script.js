const prev_operation_text = document.querySelector("#prev-operation");
const current_operation_text = document.querySelector("#current-operation");
const btns = document.querySelectorAll("#teclado button")

class Calculator {
    constructor(prev_operation_text, current_operation_text) {
        this.prev_operation_text = prev_operation_text
        this.current_operation_text = current_operation_text
        this.current_operation = ""
    }

    // adicionando dígito na tela
    add_digit(digit) {
        this.current_operation = digit;
        this.update_scream();
    }

    // mudando valores da tela
    update_scream() {
        this.current_operation_text.innerText += this.current_operation;
    }
}

const calc = new Calculator (prev_operation_text, current_operation_text);

btns.forEach((buttons) => {
    buttons.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
            calc.add_digit(value)
        } else {
            console.log("Op: " + value)
        }
    })
});