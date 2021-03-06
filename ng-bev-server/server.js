const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.locals.title = "Bev's Scraper";
app.use(express.json());

app.get('/', (req, resp) => {
  resp.send('Oh hello');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
