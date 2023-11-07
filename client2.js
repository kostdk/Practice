const ws = new WebSocket('ws://localhost:8080');
const status_client = document.getElementById('status');

function setStatus(value) {
    status_client.innerHTML = value;
  }

ws.onopen = ()=> setStatus('ONLINE');
ws.onclose = ()=> setStatus('DISCONNECTED');

let key = ""
function sendUrls() {
    const keyword = document.getElementById('keywordInput').value ;
    ws.send(JSON.stringify({type:'key', keyword:keyword}));
    key = keyword
    return key;
}

ws.onmessage = function(event) {
    const message = JSON.parse(event.data);
    console.log(event.data)
    if (message.type == 'url'){
        const urls = (message.content);
        console.log(message)
        const urlsList = document.getElementById('urlsList')
        urlsList.innerHTML = '';
        if (urls === 'empty') {
            const link = document.createElement('div');
            link.innerHTML = 'No links found for this keyword';
            urlsList.appendChild(link);
            console.log('No links found for this keyword');
        }
        else {
            urls.forEach((url) => {
            const container = document.createElement('div');
            container.style.marginBottom = '10px';
            const link = document.createElement('a');
            link.setAttribute('target', '_blank');
            link.href = url;
            link.innerHTML = url;
            container.appendChild(link);
            const downloadButton = document.createElement('button');
            downloadButton.innerHTML = 'Download Content';
            container.appendChild(downloadButton);
            urlsList.appendChild(container);
            downloadButton.addEventListener('click', function(getcontent) {
                ws.send(JSON.stringify({type:'tofetch',content: link.href}))
                    })
                }
            )
        }
    }       
    else if(message.type == 'content'){
        function addToStor(site){
            let sites = JSON.parse(localStorage.getItem('content')) || [];
            sites.push({content:site});
            localStorage.setItem('content', JSON.stringify(sites)); 
        }
        addToStor(message.content)
 }
}

function showStor() {
    const savedPages = JSON.parse(localStorage.getItem('content'));
    if (Array.isArray(savedPages)) {
        const iframe = document.getElementById('storage');
        iframe.innerHTML=''
        for (const page of savedPages) {
            if (page.content) {
                const tempdiv = document.createElement('div');
                tempdiv.innerHTML = page.content;
                let title = tempdiv.querySelector('title').textContent
                const container = document.createElement('div')
                container.style.margin = '10px 10px 10px 10px';
                const showButton = document.createElement('button');
                showButton.innerHTML = title;
                container.appendChild(showButton)
                const storage_div = document.getElementById('storage')
                storage_div.appendChild(container)
                showButton.addEventListener('click', function(show){
                    container.innerHTML=""
                    const newIframe = document.createElement('iframe');
                    newIframe.srcdoc = page.content;
                    iframe.appendChild(newIframe);
                })
                
                
            }
        }
    }
}
 
