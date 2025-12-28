const base_url = "https://2024-03-06.currency-api.pages.dev/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

/* Populate dropdowns */
for (let select of dropdown) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        }
        if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }

        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
});
}

/* Update flag */
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

const updateExchangeRate = async () => {
    let amountInput = document.querySelector(".amount input");
    let amount = amountInput.value;

    if (amount === "" || amount < 1) {
        amount = 1;
        amountInput.value = "1";
    }

    const from = fromCurr.value.toLowerCase();
    const to = toCurr.value.toLowerCase();

    try {
        const response = await fetch(`${base_url}/${from}.json`);
        const data = await response.json();

        const rate = data[from][to];
        const finalAmount = (amount * rate).toFixed(2);

        msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } catch (error) {
        msg.innerText = "Error fetching exchange rate";
        console.error(error);
    }
}

/* Convert currency */
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});
/* convert currency in start*/
window.addEventListener("load", () => {
    updateExchangeRate();
});
/* change flags */



