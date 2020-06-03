async function getData(url) {
  const response = await fetch(url, {
    method: 'GET'
  });
  return response.json();
}

class quotes{
  constructor(){
    this.data = [];
    this.quote = "Eu gosto de bunda, mas não de todas 🍞";
    this.domQuote = document.getElementById('theQuote');
    this.button = document.getElementById('theButton');
  }

  init(data){
    this.data = data.quotes;

    this.validateButton();
    this.printQuote()
  }

  validateButton(){
    this.button.addEventListener('click', ()=>{this.printQuote()})
  }

  selectQuote(){
    this.quote = this.data[Math.floor(Math.random() * this.data.length)];
  }

  printQuote(){
    this.selectQuote();
    this.domQuote.innerText = this.quote;
  }

}

const quotesManager = new quotes;

getData('/json/quotes.json')
  .then(data => {
    quotesManager.init(data);
  });