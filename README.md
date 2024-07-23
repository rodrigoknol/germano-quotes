# Germano Quotes

Frases inspiradoras de [Paulo Ricardo Germano](https://www.linkedin.com/in/pauloricardogermano/).

## Tecnologia e organização

O projeto é um site estático, sem bibliotecas, o mais simples possível. Dentro da pasta `JSON` existem os dados e conteúdos de quotes, que são acessados por um script de javascript vanilla que se encontra na pasta `js`.

O site também conta com um manifesto e um `service worker`, ambos simples e com foco em especial para funcionarem como uma POC de um [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app) - Progressive Web app - simplificado.

## Rodando o projeto

Para rodar localmente o projeto, você não precisa de nenhum bundler ou instalador, qualquer servidor http simples funciona.

### Sugestões de servidor HTTP simples

- Se você já tiver `python` instalado na sua máquina, dentro do diretorio do projeto rode o seguinte comando no seu terminal `python3 -m http.server -b 127.0.0.1 8080`, e o site poderá ser acessado em `http://localhost:8080`.
- Se você tem Node / NPM instalado, pode instalar um pacote global chamado [http-server](https://www.npmjs.com/package/http-server) com o comando `npm install -g http-server`, e então dentro do diretório do projeto simplesmente rodar o comando `http-server`, o site poderá ser acessado em `http://localhost:8080`.