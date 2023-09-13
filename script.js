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
        // checando se o valor atual é vazio
        if(this.current_operation_text.innerText === "" && operation !== "C") {
            // mudança de operaçao
            if(this.prev_operation_text.innerText !== "") {
                this.change_operation(operation);

            }
            return;
        };
        // pegandoo valor atual e anterior
        let operation_value;
        let previous = +this.prev_operation_text.innerText.split(" ")[0];
        let current = +this.current_operation_text.innerText;

        switch(operation) {
            case "+":
                operation_value = previous + current;
                this,this.update_scream(operation_value, operation, current, previous)
                break;
            case "-":
                operation_value = previous - current;
                this,this.update_scream(operation_value, operation, current, previous)
                break;
            case "/":
                operation_value = previous / current;
                this,this.update_scream(operation_value, operation, current, previous)
                break;
            case "*":
                operation_value = previous * current;
                this.update_scream(operation_value, operation, current, previous)
                break;
            case "DEL":
                this.process_del_operator();
                break;
            case "CE":
                this.process_clear_operation();
                break;
            case "C":
                this.process_clear();
                break;
            case "=":
                this.process_equal();
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

    change_operation(operation) {
        const math_operations = ["*", "/", "+", "-"];
        if(!math_operations.includes(operation)) {
            return;
        }

        this.prev_operation_text.innerText = this.prev_operation_text.innerText.slice(0, -1) + operation
    }
    // deleta o último numero
    process_del_operator() {
        this.current_operation_text.innerText = this.current_operation_text.innerText.slice(0, -1);
    }
    // limpar operaçoes atuais
    process_clear_operation() {
        this.current_operation_text.innerText = "";
    }
    // limpar tudo
    process_clear(){
        this.current_operation_text.innerText = "";
        this.prev_operation_text.innerText = "";
    }
    // igual
    process_equal() {
        const operation = prev_operation_text.innerText.split(" ")[1];
        this.process_operation(operation);
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