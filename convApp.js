document.addEventListener('DOMContentLoaded', async () => {
    const targetSelect = document.getElementById('targetCurrency');
    const resultDiv = document.getElementById('result');

    const symbols = await getCurrencySymbols();
    if (!symbols) {
        alert("Unable to fetch currency name");
        return;
    }

    for (let code in symbols) {
        if (code === 'EUR') continue;
        const option = new Option(`${code} - ${symbols[code]}`, code);
        targetSelect.appendChild(option);
    }

    targetSelect.value = "USD";

    document.getElementById('converterForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const target = targetSelect.value;
        const amount = parseFloat(document.getElementById('amount').value);

        if (!amount || amount <= 0) {
            alert("Set correct amount!");
            return;
        }

        const rate = await getExchangeRate(target);
        if (!rate) {
            alert("Unable to fetch rate!");
            return;
        }

        const converted = (amount * rate).toFixed(2);
        resultDiv.textContent = `${amount} EUR = ${converted} ${target}`;
        resultDiv.style.display = 'block';
    });
});
