const http = require('http');
const fs = require('fs');
const url = require('url');

const replaceTemplate = require('./starter/modules/replaceTemplate');

const data = fs.readFileSync('./starter/dev-data/data.json', 'utf-8');
const tempOverview = fs.readFileSync('./starter/templates/template-overview.html', 'utf-8');
const tempCard = fs.readFileSync('./starter/templates/template-card.html', 'utf-8');
const tempProduct = fs.readFileSync('./starter/templates/template-product.html', 'utf-8');



const dataObject = JSON.parse(data);

const server = http.createServer((req,res) => {
    
    const {query, pathname} = url.parse(req.url, true);
    //OVERVIEW
    if (pathname == '/'){
        res.writeHead(200,{ 'Content-type' : 'text/html'});
        const cardsHtml = dataObject.map((el) => replaceTemplate(el,tempCard)).join('');
        const output = tempOverview.replace('{%PRODUCTCARDS%}', cardsHtml);
        res.end(output);
    }

    //PRODUCT
    else if (pathname == '/product'){
        const product = dataObject[query.id];
        console.log(product);
        const output = replaceTemplate(product, tempProduct);
        res.end(output);
    }

    //API
    else if (pathname == '/api'){
        res.writeHead(200,{ 'Content-type' : 'application/json'});
        res.end(data);
    }

    //NOT FOUND
    else {
        res.writeHead(404, {
            'Content-type' : 'text/html'
        });
        res.end('<h1>Page not found</h1>');
    }
});

server.listen(2700, '127.0.0.1', () => console.log("Server STARTED!"));