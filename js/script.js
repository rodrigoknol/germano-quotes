async function getData(url) {
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json();
}

class quotes {
  domQuote = document.getElementById("theQuote");
  quoteContainer = document.getElementById("quoteContainer");
  shuffleBtn = document.getElementById("shuffleButton");
  shareBtn = document.getElementById("shareButton");
  motivationBtn = document.getElementById("motivationButton");
  body = document.body;

  constructor(quotesData) {
    this.quotes = quotesData.quotes;
    this.images = quotesData.images;
    this.motivation = quotesData.motivation;
  }

  init() {
    const quote = this.randomItem(this.quotes);
    this.addListenerOnBtns();
    this.printQuote(quote);
    this.updateShareBtn(quote);
  }

  randomSelection(length) {
    return Math.floor(Math.random() * length);
  }

  randomItem(base) {
    return base[this.randomSelection(base.length)];
  }

  addListenerOnBtns() {
    this.shuffleBtn.addEventListener("click", () => {
      const quote = this.randomItem(this.quotes);
      this.printQuote(quote);
      this.updateShareBtn(quote);
      if (this.body.classList.contains("motivation")) {
        this.generateMotivation();
      }
    });

    this.motivationBtn.addEventListener("click", () => {
      this.toggleMotivation();
    });
  }

  printQuote(quote) {
    this.domQuote.innerText = quote;
  }

  toggleMotivation() {
    this.removeMotivation();
    this.body.classList.toggle("motivation");
    if (this.body.classList.contains("motivation")) {
      this.generateMotivation();
    }
  }

  removeMotivation() {
    const motivation = document?.getElementById("motivationContainer");
    motivation && motivation.remove();
  }

  generateMotivation() {
    this.removeMotivation();
    const image = this.randomItem(this.images);

    const bigText = document.createElement("span");
    const motivationalText = this.randomItem(this.motivation);
    bigText.classList.add("motivation-big-text");
    bigText.innerText = motivationalText;

    const img = document.createElement("img");
    img.alt = image.alt;
    img.src = `/img/motivation/${image.file}.jpg`;
    img.classList.add("motivation-img");

    const container = document.createElement("div");
    container.classList.add("motivation-container");
    container.id = "motivationContainer";
    container.append(img, bigText);

    this.quoteContainer.prepend(container);
  }

  updateShareBtn(quote) {
    const baseURL =
      "https://api.whatsapp.com/send?text=Uma vez Paulo Germano disse: ";
    const finalText =
      "Concorda? Descubra mais sabedoria e pílulas do conhecimento em https://germano-quotes.netlify.app/";
    const url = `${baseURL}"${quote}". ${finalText}`;
    this.shareBtn.href = encodeURI(url);
  }
}

getData("/json/quotes.json").then((quotesData) => {
  const quotesManager = new quotes(quotesData);
  quotesManager.init();
});
