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

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'privado', 'index.html'))
})

// Endpoint p cadastro de engenheiros
app.post('/engenheiro', (req, res) => {
  const { nome_engenheiro } = req.body;
  db.query('INSERT INTO tb_engenheiros (nome_engenheiro) VALUES (?)',
    [nome_engenheiro],
    (erro, resultado) => {
      if (erro) { return res.json({ msg: "Falha ao cadastrar" + erro.message }) }
      return res.json({ msg: "Cadastrar com sucesso" })

    })
})

// Endpoint p consultar engenheiros
app.get('/engenheiros', (req, res) => {
  db.query('SELECT * FROM tb_engenheiros', (erro, resultado) => {
    if (erro) { return res.json({ msg: 'Falha ao consultar os  engeheiros' + erro.message }) }
    return res.json(resultado)
  })
})

// Página de gerenciamento de projetos
app.get('/projetos', (req, res) => {
  res.sendFile(path.join(__dirname, 'privado', 'projetos.html'))
})

// Endpoint p cadastro de projetos
app.post('/projetos', (req, res) => {
  const { nome_projeto, fk_id_engenheiro, situacao, descricao } = req.body;
  db.query(
    'INSERT INTO tb_projetos (nome_projeto, fk_id_engenheiro, situacao, descricao) VALUES (?,?,?,?)',
    [nome_projeto, fk_id_engenheiro, situacao, descricao],
    (erro, resultado) => {
      if (erro) {
        return res.json({ msg: 'Falha ao cadastrar o projeto: ' + erro.message });
      }
      return res.json({ msg: 'Cadastrado com sucesso!' });
    }
  );
});

// Endpoint p consulta de projetos pendentes
app.get('/projetos_pendentes', (req, res) => {
  db.query(`SELECT * FROM vw_proj_eng WHERE situacao='Pendente'`,
    (erro, resultado) => {
      if (erro) { return res.json({ msg: "Falha ao consultar!" + erro.message }) }
      if (resultado.length == 0) { return res.json({ msg: "Não há projetos pendentes" }) }
      return res.json(resultado)
    })
})

// Endpoint p consulta de projetos em andamento
app.get('/projetos_em_andamento', (req, res) => {
  db.query(`SELECT * FROM vw_proj_eng WHERE situacao='Em andamento'`,
    (erro, resultado) => {
      if (erro) { return res.json({ msg: "Falha ao consultar!" + erro.message }) }
      if (resultado.length == 0) { return res.json({ msg: "Não há projetos em andamento" }) }
      return res.json(resultado)
    })
})

// Endpoint p consulta de projetos finalizados
app.get('/projetos_finalizados', (req, res) => {
  db.query(`SELECT * FROM vw_proj_eng WHERE situacao='Finalizado'`,
    (erro, resultado) => {
      if (erro) { return res.json({ msg: "Falha ao consultar!" + erro.message }) }
      if (resultado.length == 0) { return res.json({ msg: "Não há projetos finalizados" }) }
      return res.json(resultado)
    })
})

// Endpoint p editar um projeto
app.put('/alterar_projeto', (req, res) => {
  const { id_projeto, nome_projeto, fk_id_engenheiro, situacao, descricao } = req.body;
  db.query(`UPDATE tb_projetos SET nome_projeto=?, fk_id_engenheiro=?, situacao=?, descricao=? WHERE id_projeto=?`,
    [nome_projeto, fk_id_engenheiro, situacao, descricao, id_projeto],
    (erro, resultado) => {
      if (erro) { return res.json({ msg: "Falha ao atualizar!" + erro.message }) }
      if (resultado.affectedRows == 0) { return res.json({ msg: "Nada alterado!" }) }
      return res.json({ msg: "Atualizado com sucesso!" })
    })
})

// Endpoint p deletar projetos
app.delete('/deletar_projeto/:id_projeto', (req, res) => {
  const { id_projeto } = req.params;
  db.query(`DELETE FROM tb_projetos WHERE id_projeto=?`, [id_projeto],
    (erro, resultado) => {
      if (erro) { return res.json({ msg: "Falha ao deletar!" + erro.message }) }
      if (resultado.affectedRows == 0) { return res.json({ msg: "Nada alterado!" }) }
      return res.json({ msg: "Deletado com sucesso!" })
    })
})

// Endpoint p fazer login
app.post('/fazer_login', (req, res) => {
  const { username, password } = req.body;
  db.query(`SELECT * FROM tb_usuario WHERE username=? AND password=?`,
    [username, password], (erro, resultado) => {
      if (erro) { return res.send("Falha no login!" + erro.message) }
      if (resultado.length >= 1) {
        req.session.usuarioLogado = "Sim"
        res.redirect('/')
      } else {
        res.send('Usuario e/ou senha incorretos')
      }
    })
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});