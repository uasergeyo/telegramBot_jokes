var TelegramBot = require('node-telegram-bot-api');
let http = require('http');
var iconv  = require('iconv-lite');
var URL_Joke = 'http://rzhunemogu.ru/RandJSON.aspx?CType=1';
var URL_Adult_Joke = 'http://rzhunemogu.ru/RandJSON.aspx?CType=11';
var URL_Adult_Story = 'http://rzhunemogu.ru/RandJSON.aspx?CType=12';
var URL_Story = 'http://rzhunemogu.ru/RandJSON.aspx?CType=2';


var token = '1325246540:AAFPuhUth52aH4IGkmfW_YWE8a5qLKoptoo';
var bot = new TelegramBot(token, { polling: true });


bot.on('message', (msg) => {
    if (msg.text.toString().toLowerCase().indexOf("привет") === 0) {
        bot.sendMessage(msg.chat.id, "Привет рад видеть.");
    }
});

bot.onText(/\Анекдот/,(msg) => {

  http.get(URL_Joke, function(res) {
  var chunks = [];
  res.on('data', function(chunk) {
    chunks.push(chunk);
  });
  res.on('end', function() {
    var decodedBody = iconv.decode(Buffer.concat(chunks), 'win1251');
    bot.sendMessage(msg.chat.id,decodedBody.slice(12,-2));
  });
});

}); 
bot.onText(/\Пошлый анекдот/,(msg) => {

  http.get(URL_Adult_Joke, function(res) {
  var chunks = [];
  res.on('data', function(chunk) {
    chunks.push(chunk);
  });
  res.on('end', function() {
    var decodedBody = iconv.decode(Buffer.concat(chunks), 'win1251');
    bot.sendMessage(msg.chat.id,decodedBody.slice(12,-2));
  });
});

}); 

bot.onText(/\Смешная история/,(msg) => {

  http.get(URL_Story, function(res) {
  var chunks = [];
  res.on('data', function(chunk) {
    chunks.push(chunk);
  });
  res.on('end', function() {
    var decodedBody = iconv.decode(Buffer.concat(chunks), 'win1251');
    bot.sendMessage(msg.chat.id,`${decodedBody.slice(12,-2)}`);
  });
});

}); 

bot.onText(/\Пошлая история/,(msg) => {
  http.get(URL_Adult_Story, function(res) {
  var chunks = [];
  res.on('data', function(chunk) {
    chunks.push(chunk);
  });
  res.on('end', function() {
    var decodedBody = iconv.decode(Buffer.concat(chunks), 'win1251');
    bot.sendMessage(msg.chat.id,`${decodedBody.slice(12,-2)}`);
  });
});

}); 


bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `Привет ${msg.from.first_name} рад видеть тебя. Здесь собрано много вeселых историй и анекдотов`, {
    // bot.sendPhoto(msg.chat.id, "./1568622546_2.jpeg",{caption:`Привет ${msg.from.first_name} рад видеть тебя. Здесь собрано много вeселых историй и анекдотов`}, {
        "reply_markup": {
            "keyboard": [["Анекдот", "Смешная история"],["Пошлый анекдот","Пошлая история"]],
            "resize_keyboard":true,
        }
    });

});





