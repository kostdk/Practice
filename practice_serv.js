const fs = require('fs');
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

const keywords = {
    'cat': ['https://catkote.net','https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D1%88%D0%BA%D0%B0','https://ngs.ru/text/animals/2022/05/03/71293085/'],
    'dog': ['https://www.sobaka.ru/','https://dog.fandom.com/ru/wiki/%D0%A1%D0%BE%D0%B1%D0%B0%D0%BA%D0%B0','https://www.proplan.ru/dog/article/breeds/'],
    'bird': ['https://cyclowiki.org/wiki/%D0%9F%D1%82%D0%B8%D1%86%D1%8B','https://eksmo.ru/test/chto-vy-za-ptitsa/','https://birdsrussia.ru/about/articles/e-d-krasnova-bolshoy-pestryy-dyatel/']};


let MAX_CONCURRENT_THREADS = 1; 

// fs.readFile('config.txt', 'utf8', function(err, data) {
//     if (!err) {
//       MAX_CONCURRENT_THREADS = Number(data);
//       console.log('MAX_CONCURRENT_THREADS set to', MAX_CONCURRENT_THREADS);
//     } else {
//       console.error('Failed to read config.txt:', err);
//     }
//   }); 

server.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('message', (message) => {
      console.log(`Received message: ${message}`);
      const urls = keywords[message];
      if (urls) {urls.forEach(url => {
        
        fetch(url)
        .then(console.log(new(Date)))
        .then(response => response.text())
        .then(data => {socket.send(JSON.stringify(data))
         
    })
    .catch(error => console.error('Ошибка при сохранении страницы:', error));
        
      });

    } else {
            
          socket.send(JSON.stringify(new String('empty')));
        }
  
        console.log('Started stream');
    });
  
    socket.on('close', () => {
      console.log('Client disconnected');
    });
  });
  
  console.log("Server started on port 8080"); 
