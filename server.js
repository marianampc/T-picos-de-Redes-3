const express = require("express");
const server = express(); //Colocou tadas as funcionalidade que o express me oferece

server.use(express.json()); //Aqui é um middelware global

/*Essa função server.get abaixo está com a primeira rota que criamos.
O padrão das nossas rotas será 
"server.[determinado padrão http]([objetod e requisição],[objeto de resposta])=>{[O que ele realizará]}"
*/
/*server.get("/", (req, res) => { 
    //Essa crase está como se tivessemos criado uma strig dinâmica.
    return res.send(`   
        <title>TRC3 - Aula 1</title>
        <h1> Bom dia !</h1>
    `);
});
*/

/*
Iremos criar aqui abaixo um array simples para poder salvár informações enquanto não temos um banco de dados próprio 
*/

const users = ["Paulo", "André", "Mariana"];

//Vamos criar um Middleware para mostrar todas as rotas que foram chamadas.
//middleware de log global
server.use((req,res, next) => {
    console.log(`Método: ${req.method}, URL ${req.url}`); //Se salvassemos as informação dessa variável (que está sendo impressa no console) teriamos nosso banco de log com um histórico de tudo que fissemos.
    return next(); //Aqui está falando para voltar como se nunca tivesse passado por esse middleware.
});

//Middleware Local: especializado para saber se o usuário está usando o nome. Precisamos disso somente para dois Cruds. 
function checkId(req, res, next) {
    if (!req.body.name) { //O padrão é que sempre seja mandado, logo estamos procurando quando foge do padrão
      return res
        .status(400)
        .json({ message: "É necessário informar o nome do usuário." });
    }
  
    return next();
}

/*Iremos criar um CRUD agora. Que são operações padrões
    CRUD: CREATE-READ-UPDATE-DELETES
*/

//Método para escrever
server.post("/users", checkId, (req,res) => {
    //console.log(req.body);    Aqui estavamos imprimindo o que está no body
    
    const user = req.body.name; 
    //return res.json({message: `O nome do cliente é ${req.body.name}`}); / Primeiro Exemplo
    
    // Segundo exemplo
    users.push(user); // Estava enviando para o array a informação que temos dentro do body no insomina
    
    return res.json(users);
})

//Método para ler
server.get("/users", (req, res) => { 
    return res.json({users});
});

//Método para Editar
/* ROUTE PARAMS */
server.put("/users/:id", (req, res) => {
    const {id} = req.params;
    //return res.json({id}); //Serve para ver se estamos pegando realmente o id
    //A chave e o valor tem o mesmo nome, por isso conseguimos passar somente "id"

    const {newName} = req.body;

    users[id] = newName;

    return res.json({ users });
})

//Método para deletar
server.delete("/users/:id", (req,res) =>{
    const{ id } = req.params;
    
    users.splice(id, 1) //Elemento que quer apagar e quantos elemento à frente que também queremos apagar.
    
    return res.json(users)
})


//Exemplo de como adicionar uma funcionalidade
/*
server.get("/", (req,res) => {
    const { disciplina } = req.query;
    return res.json({ disciplina });
});*/

server.listen(3000); //Temos que definir uma porta para que o nosso serviço possa rodar. (A porta 3000 não tem dono)