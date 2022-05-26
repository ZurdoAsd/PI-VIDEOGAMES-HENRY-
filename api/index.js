//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Genres } = require('./src/db.js');
const axios = require('axios');
const {API2,API_KEY} = process.env;

async function precarga() {
  const allGenres = await axios.get(`${API2}${API_KEY}`);
  const genresMa = allGenres.data.results
    const genresMap= genresMa.map((e) => { 
    const obj = {
     id: e.id, 
     name:e.name
    };
    return obj;
  });
  Genres.bulkCreate(genresMap)
}

// Syncing all the models at once.
conn.sync({ force: true }).then( async() => {
  await precarga();
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
