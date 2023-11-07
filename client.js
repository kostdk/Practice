// Создаем websocket соединение
const ws = new WebSocket('ws://localhost:8080');

// Присваеваем переменной элемент "статус" с нашего html
const status_client = document.getElementById('status');

// Функция для отображения статуса коннекта
function setStatus(value) {
  status_client.innerHTML = value;
}

// При установке соединения передаем функции setstatus значение "онлайн" 
ws.onopen = ()=> setStatus('ONLINE');

// При появлении сообщения от сервера запускаем функцию и парсим это сообщение.  
ws.onmessage = function(event) {
  console.log(key)
  const fetchcon = JSON.parse(event.data);
  // let storkey = String(key + " " + new(Date)) 
  // console.log(storkey)
  localStorage.setItem(key,fetchcon)
  showStor(key)
  };
  
// При отключении клиента меняем статус
ws.onclose = ()=> setStatus('DISCONNECTED');

let keyword = null;
// Функция ввода ключевых слов и передача значения на сервер ws
function sendUrls() {
  const keyword = document.getElementById('keywordInput').value;
  ws.send(keyword);
  key = keyword
  return key;
}


function showStor(key){
   if (key===null){
    errmsg = document.createElement('div');
    errmsg.innerHTML = 'No storkey';}
    
   else{
    storekeyInput = document.getElementById('storkeyInput').value;
    key = storekeyInput;
    const ifr = document.createElement('iframe');
    ifr.srcdoc = localStorage.getItem(key);
    document.body.appendChild(ifr);
   } 
    
  

}

