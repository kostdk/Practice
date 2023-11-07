const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

const keywords = {
    'cat': ['https://catkote.net','https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D1%88%D0%BA%D0%B0','https://ngs.ru/text/animals/2022/05/03/71293085/'],
    'dog': ['https://www.sobaka.ru/','https://dog.fandom.com/ru/wiki/%D0%A1%D0%BE%D0%B1%D0%B0%D0%BA%D0%B0','https://www.proplan.ru/dog/article/breeds/'],
    'bird': ['https://cyclowiki.org/wiki/%D0%9F%D1%82%D0%B8%D1%86%D1%8B','https://eksmo.ru/test/chto-vy-za-ptitsa/','https://birdsrussia.ru/about/articles/e-d-krasnova-bolshoy-pestryy-dyatel/']};


server.on('connection', (socket)=>{
    console.log('Client connected');
    socket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data)
        console.log(message)
        if (message.type == 'key'){
            if ((Object.keys(keywords).indexOf(`${message.keyword}`)!=-1)){
                 const urls = keywords[message.keyword];
                 console.log(urls)
                 console.log(message.keyword)
                 socket.send(JSON.stringify({type:'url',content:urls}));}
                 else {
                    socket.send(JSON.stringify({type:'error', content:'empty'}));   
                    }
                }
        else if (message.type == 'tofetch'){
            const url = message.content
            console.log(message.content)
            fetch(url)
            .then(response => response.text())
            .then(data => {socket.send(JSON.stringify({type:'content', content:data}))})

        }
            }
        )
    }
)













//     socket.on('message', (message) => {
//         console.log(`Recieved message: ${JSON.parse(message)}`);
//         // if ((Object.keys(keywords)).indexOf(`${message}`)!=-1){
//         //     const urls = keywords[message];
//         //     socket.send(JSON.stringify(urls));
//         //     console.log('we sending urls to client')}
//         // else if (message.includes('http')){
//         //     url = message;
//         //     fetch(url)
//         //     .then(console.log("качаю ссылку"))
//         //     .then(response => response.text())
//         //     .then(data => {socket.send(JSON.stringify({type :'content', content : data}))})
            
//         // }     
//         // else {
//         //     socket.send(JSON.stringify(new String('empty')));
//         //     }
//         }
//     )}
// )


