async function getData(url) {
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json();
}

class quotes {
  domQuote = document.getElementById("theQuote");
  shuffleBtn = document.getElementById("shuffleButton");
  shareBtn = document.getElementById("shareButton");

  constructor(quotesData) {
    this.data = quotesData.quotes;
    this.quote = "Eu gosto de bunda, mas não de todas 🍞";
  }

  init() {
    this.validateButton();
    this.printQuote();
    this.updateShareBtn();
  }

  validateButton() {
    this.shuffleBtn.addEventListener("click", () => {
      this.printQuote();
      this.updateShareBtn();
    });
  }

  selectQuote() {
    this.quote = this.data[Math.floor(Math.random() * this.data.length)];
  }

  printQuote() {
    this.selectQuote();
    this.domQuote.innerText = this.quote;
  }

  updateShareBtn() {
    const baseURL =
      "https://api.whatsapp.com/send?text=Uma vez Paulo Germano disse: ";
    const finalText =
      "Concorda? Descubra mais sabedoria e pílulas do conhecimento em https://germano-quotes.netlify.app/";
    const url = `${baseURL}"${this.quote}". ${finalText}`;
    this.shareBtn.href = encodeURI(url);
  }
}

getData("/json/quotes.json").then((quotesData) => {
  const quotesManager = new quotes(quotesData);
  quotesManager.init();
});
