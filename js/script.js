async function getData(url) {
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json();
}

if ("serviceWorker" in navigator) {
  window.addEventListener(
    "load",
    () => {
      navigator.serviceWorker.register("/service-worker.js").catch((err) => {
        console.log("ServiceWorker registration failed: ", err);
      });
    },
    { once: true }
  );
}

const getDataFromSearchParam = (fullURLasString) => {
  const { search } = new URL(fullURLasString);
  const searchParams = new URLSearchParams(search);

  const onlyKeys = Array.from(searchParams.keys());

  const asObject = [...searchParams.entries()].reduce(
    (finalObject, contentAsArray) => {
      const [key, value] = contentAsArray;
      finalObject[key] = value;
      return finalObject;
    },
    {}
  );

  return { asObject, onlyKeys };
};

class Quotes {
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
    const quote = this.getQuote(this.quotes);
    this.addListenerOnBtns();
    this.printQuote(quote);
    this.updateShareBtn(quote);
  }

  getQuote(quotesList) {
    const { asObject } = getDataFromSearchParam(location);
    const quoteIdFromSearchParam = asObject?.quote;

    return quoteIdFromSearchParam
      ? quotesList[quoteIdFromSearchParam]
      : this.getRandomItemFromList({ list: this.quotes }).selectedItem;
  }

  randomSelection(length) {
    return Math.floor(Math.random() * length);
  }

  getRandomItemFromList({ list }) {
    const randomSelection = this.randomSelection(list.length);
    return { selectedItem: list[randomSelection], number: randomSelection };
  }

  setQuoteIdSearchParam(value) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("quote", value);
    window.location.search = searchParams.toString();
  }

  addListenerOnBtns() {
    this.shuffleBtn.addEventListener("click", () => {
      const { selectedItem, number } = this.getRandomItemFromList({
        list: this.quotes,
      });
      this.setQuoteIdSearchParam(number);
      this.printQuote(selectedItem);
      this.updateShareBtn(selectedItem);
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
    const image = this.getRandomItemFromList({
      list: this.images,
    }).selectedItem;

    const bigText = document.createElement("span");
    const motivationalText = this.getRandomItemFromList({
      list: this.motivation,
    }).selectedItem;
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
    const finalText = `Concorda? Descubra mais sabedoria e pílulas do conhecimento em ${location.href}`;
    const url = `${baseURL}"${quote}". ${finalText}`;
    this.shareBtn.href = encodeURI(url);
  }
}

getData("/json/quotes.json").then((quotesData) => {
  const quotesManager = new Quotes(quotesData);
  quotesManager.init();
});
