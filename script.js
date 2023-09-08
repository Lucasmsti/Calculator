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
        // checando se a operação atual ja tem um ponto
        if(digit === "." && this.current_operation_text.innerText.includes(".")) {
            return;
        }

        this.current_operation = digit;
        this.update_scream();
    }

    // processando todas as operações
    process_operation(operation) {
        // pegandoo valor atual e anterior
        let operation_value;
        let previous = +this.prev_operation_text.innerText;
        let current = +this.current_operation_text.innerText;

        switch(operation) {
            case "+":
                operation_value = previous + current;
                this,this.update_scream(operation_value, operation, current, previous)
                break;
            default:
                return;
        }
    }

    // mudando valores da tela
    update_scream(operation_value = null, operation = null, current = null, previous = null) {
        if (operation_value === null) {
            this.current_operation_text.innerText += this.current_operation;
        } else {
            // checagem se o valur é zero, se for entao add o valor atual
            if (previous === 0) {
                operation_value = current
            }

            // adiciona o valor atual para previous
            this.prev_operation_text.innerText = `${operation_value} ${operation}`;
            this.current_operation_text.innerText = "";
        }
    }
}

const calc = new Calculator (prev_operation_text, current_operation_text);

btns.forEach((buttons) => {
    buttons.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
            calc.add_digit(value)
        } else {
            calc.process_operation(value)
        }
    })
});