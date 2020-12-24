<h1 align="center">
  <img alt="Logo" src="https://uploads-ssl.webflow.com/5f909e04066eda40d3943c21/5f90c34a4d91048e52fad31d_logo-branco.svg" width="200px">
</h1>

<h3 align="center">
  Test for Back-end Developer at LinkApi
</h3>




<p align="center">
  <a href="#about">About the challenge</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#use">Using</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

<div id="about"></div>
## 💇🏻‍♂️ About the challenge

The idea is to create an integration between the Pipedrive and Bling platforms.

This integration should look for opportunities with status equal to "earned" on Pipedrive and then insert them as requested on Bling.

Create a report to bring the consolidated data from MongoDB.


<div id="technologies"></div>
## 🚀 Technologies

Technologies that I used to develop this api

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [MongoDB](https://www.mongodb.com/)
- [Axios](https://github.com/axios/axios)
- [TypeORM](https://typeorm.io/#/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)


<div id="started"></div>
## 💻 Getting started

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Pipedrive](https://www.pipedrive.com/pt) -> Account on Pipedrive Platform (Free Trial Available)
- [Bling](https://www.bling.com.br/home) -> Account on Bling Platform (Free Trial Available)
- [MongoDB](https://www.mongodb.com/) -> Account on MongoDB Atlas interface with Database and Collection created. (Free for one cluster in use)

**Clone the project and access the folder**

```bash
$ git clone https://github.com/brualarcao/linkapi-challenge-integration.git && cd linkapi-challenge-integration
```

**Follow the steps below for install the dependencies**

```bash
# Install the dependencies
$ yarn


# When installation finish, type
$ yarn run

# Well done, project is started!
```


**Follow the steps below to configure your .env**

```bash
API_KEY_PIPE=YOUR API_KEY_PIPE_HERE
API_KEY_BLING=YOUR_API_KEY_BLING_HERE
MONGO_URL=YOUR_MONGODB_URL_HERE

```

<div id="use"></div>
## Use

### Creating the order on Bling Platform and save in MongoDB

With this command, a request is sent to get all deals with "won"status in Pipedrive platform, generating the orders in Bling Platform and saving in MongoDB.

`POST /order`

The response will be:

```json
{
  "message": "Congratulations! Data was succesfully generated."
}
```

### Listing the orders saved in MongoDB

With this command you will send a request to get all the orders saved in MongoDB.

`GET /order`

The response will be an array of orders.



## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made by Bruno Alarcão 👋 &nbsp;[See my linkedin](https://www.linkedin.com/in/bruno-alarc%C3%A3o-271253103/)
