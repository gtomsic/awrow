module.exports = {
  htmlRegister: (data) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ucups blog</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <style>
        *,
*::after,
*::before {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}

body {
  font-family: 'Roboto', 'Courier New', Courier, monospace;
}

header {
  font-size: 24px;
  background-color: #0e7490;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  height: 70px;
  color: #f1f5f9;
}

header#logo {
  width: 50px;
  border: 2px solid white;
}

.main {
  min-height: calc(100vh - 140px);
  max-width: 600px;
  padding: 3rem 0;
  margin: 0 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
}

.main-title {
  height: 70px;
  color: #fdba74;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  font-size: 20px;
}

.main p {
  padding: 2rem;
}

.main .btn,
.main :active,
.main :visited {
  text-decoration: none;
  color: #f1f5f9;
  background-color: #0e7490;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
}

footer {
  background-color: #18181b;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  height: 70px;
  color: #f1f5f9;
}
/*# sourceMappingURL=main.css.map */
        </style>
      </head>
      <body>
        <div class="container">
          <header>
          <img
          src="${process.env.SERVER_HOST}/images/1defaults/awrow.png"
          alt="awrow logo"
          width="50px"
        /></header>
          <main class="main">
            <div class="main-title">Hi ${data.name}! This is your mail verification.</div>
            <p>${data.message}</p>
            <a href="${data.link}" class="btn">Verify Here</a>
          </main>
          <footer><p>&copy; www.awrow.com 2022</p></footer>
        </div>
      </body>
    </html>
    `;
  },
};
