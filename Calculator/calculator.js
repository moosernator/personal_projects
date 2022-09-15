// Define useful elements
let buttons = document.querySelector(".buttons");

let btn = document.querySelectorAll("span");

let value = document.getElementById("value");

let history = document.getElementById("history");

let ans = 0;

// Handle buttons being pressed
for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function() {
        // Handle equals button and evaluate expression
        if (this.innerHTML == "=") {
            let calcOri = value.innerHTML;
            let res = 0;
            let calc = 0;
            try {
                // Retains Ans in history expression but subs in variable for eval
                if (calcOri.toString().includes("Ans")) {
                    calc = calcOri.toString().replace("Ans", ans);
                    res = eval(calc);
                    value.innerHTML = res;
                    history.innerHTML = calcOri + "=" + res;

                } else {
                    res = eval(calcOri);
                    value.innerHTML = res;
                    history.innerHTML = calcOri + "=" + res;

                }

            } catch(e) {
                value.innerHTML = "Syntax Error"
                setTimeout(function(){value.innerHTML = ""}, 1200);
                k = 0;

            }

        } else if (this.innerHTML == "Ans") {
            // Obtains result of last calc and stores as answer
            let end = history.innerHTML.toString().indexOf("=");
            ans = history.innerHTML.toString().slice(end+1);
            value.innerHTML += "Ans";

        } else if (this.innerHTML == "Clear") {
            value.innerHTML = "";

        } else if (this.innerHTML == "←") {
            // Deletes words, otherwise just one step backwards
            if (value.innerHTML.toString().endsWith("Ans") || value.innerHTML.toString().endsWith("NaN") ) {
                value.innerHTML = value.innerHTML.toString().slice(0, -3);
            } else if (value.innerHTML.toString().endsWith("Infinity")) {
                value.innerHTML = value.innerHTML.toString().slice(0, -8);
            } else {
                value.innerHTML = value.innerHTML.toString().slice(0, -1);
            }

        } else if (this.innerHTML == "×") {
            value.innerHTML += "*";

        } else if (this.innerHTML == "÷") {
            value.innerHTML += "/";

        } else {
            value.innerHTML += this.innerHTML;
        }

    })
}