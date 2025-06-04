const db = require('./conexao');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Diz ao Express para servir arquivos da pasta 'publico'
app.use(express.static(path.join(__dirname, 'publico')));

app.use(session({
  secret: '46feb3e2fec47e6d6cd7bc44bfe1aef9',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 15 * 60 * 1000 }
}));

// Pagina principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'privado', 'index.html'))
})

app.get('/engenheiros', (req, res) => {
  db.query('SELECT * FROM tb_engenheiros', (erro, resultado) => {
    if (erro) { return res.json({ msg: 'Falha ao consultar os engenheiros' }) }
    return res.json(resultado)
  })
})

// Endpoint p cadastro
app.post('/projetos', (req, res) => {
  const { nome_projeto, fk_id_engenheiro, situacao, descricao } = req.body;
  db.query(`INSET INTO tb_projetos 
  (nome_projeto, fk_id_engenheiro, situacao, descricao) VALUES (?, ?, ?, ?)`,
    [nome_projeto, fk_id_engenheiro, situacao, descricao],
    (erro, resultado) => {
      if(erro){return res.json({msg:"Falha ao cadastrar"+erro.message})}
      return res.json({msg:"Cadastrado com"})
    })
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});