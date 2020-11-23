const express = require('express');
const server = express();
const router = express.Router();
const fs = require('fs');
server.use(express.json({extended: true}))

//criar uma função de leitura de arquivo
const readFile = () => {
    const content = fs.readFileSync('./data/itens.json','utf-8');
    return (JSON.parse(content));
}

const writeFile = (content) => {
    const updateFile = JSON.stringify(content)
    fs.writeFileSync('./data/itens.json', updateFile, 'utf-8');
}

//Rota GET leitura de dados e mostrando dados
router.get('/',function(req,res){
    const content = readFile();
    res.send(content);
});

//Rota de Inserção POST
router.post('/',function(req,res){
    const currentContent = readFile();
    const {name, email, phone} = req.body;
    currentContent.push({name, email, phone});
    writeFile (currentContent);
    res.send(currentContent);
});


server.use(router);
server.listen(3000,function(){
    console.log('conectado na porta 3000');
});

