async function getData(url) {
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json();
}

class quotes {
  domQuote = document.getElementById("theQuote");
  button = document.getElementById("shuffleButton");

  constructor(quotesData) {
    this.data = quotesData.quotes;
    this.quote = "Eu gosto de bunda, mas não de todas 🍞";
  }

  init() {
    this.validateButton();
    this.printQuote();
  }

  validateButton() {
    this.button.addEventListener("click", () => {
      this.printQuote();
    });
  }

  selectQuote() {
    this.quote = this.data[Math.floor(Math.random() * this.data.length)];
  }

  printQuote() {
    this.selectQuote();
    this.domQuote.innerText = this.quote;
  }
}

getData("/json/quotes.json").then((quotesData) => {
  const quotesManager = new quotes(quotesData);
  quotesManager.init();
});
