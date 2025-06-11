// Carregar projetos Pendentes
function carregarPendentes() {
    $('#pendente').html('<h1>Pendentes</h1>')
    $.ajax({
        url: 'http://localhost:3000/projetos_pendentes',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (resposta) {
            if (resposta.msg) {
                $("#pendente").append(resposta.msg)
                return
            }
            resposta.forEach(function (item) {
                $("#pendente").append(`
                <div class='cartoes'>
                    <b>Nº </b> <span id='id_projeto'>${item.id_projeto}</span> <br>
                    
                    Nome do projeto:
                    <span id='nome_projeto'> ${item.nome_projeto}</span> <br>
                    
                    Descrição:
                    <span id='descricao'> ${item.descricao} </span> <br>
                    
                    Situação:
                    <span id='situacao'>${item.situacao}</span> <br>
                    
                    Engenheiro Responsável:
                    <span id='nome_engenheiro'>${item.nome_engenheiro}</span> <br>
                    
                    ID do Engenheiro:
                    <span id='id_engenheiro'>${item.id_engenheiro}</span> <br>
            `)
            })
        },
        error: function () {
            alert("Falha ao acessar GET/projetos_pendentes")
        }
    })
}

// Carregar projetos em andamento
function carregarEmAndamento() {
    $('#em_andamento').html('<h1>Em andamento</h1>')
    $.ajax({
        url: 'http://localhost:3000/projetos_em_andamento',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (resposta) {
            if (resposta.msg) {
                $("#em_andamento").append(resposta.msg)
                return
            }
            resposta.forEach(function (item) {
                $("#em_andamento").append(`
                <div class='cartoes'>
                    <b>Nº </b> <span id='id_projeto'>${item.id_projeto}</span> <br>
                    
                    Nome do projeto:
                    <span id='nome_projeto'> ${item.nome_projeto}</span> <br>
                    
                    Descrição:
                    <span id='descricao'> ${item.descricao} </span> <br>
                    
                    Situação:
                    <span id='situacao'>${item.situacao}</span> <br>
                    
                    Engenheiro Responsável:
                    <span id='nome_engenheiro'>${item.nome_engenheiro}</span> <br>
                    
                    ID do Engenheiro:
                    <span id='id_engenheiro'>${item.id_engenheiro}</span> <br>
            `)
            })
        },
        error: function () {
            alert("Falha ao acessar GET/projetos_em_andamento")
        }
    })
}


// Carregar projetos finalizados
function carregarFinalizados() {
    $('#finalizado').html('<h1>Finalizados</h1>')
    $.ajax({
        url: 'http://localhost:3000/projetos_finalizados',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (resposta) {
            if (resposta.msg) {
                $("#finalizado").append(resposta.msg)
                return
            }
            resposta.forEach(function (item) {
                $("#finalizado").append(`
                <div class='cartoes'>
                    <b>Nº </b> <span id='id_projeto'>${item.id_projeto}</span> <br>
                    
                    Nome do projeto:
                    <span id='nome_projeto'>${item.nome_projeto}</span> <br>
                    
                    Descrição:
                    <span id='descricao'> ${item.descricao} </span> <br>
                    
                    Situação:
                    <span id='situacao'>${item.situacao}</span> <br>
                    
                    Engenheiro Responsável:
                    <span id='nome_engenheiro'>${item.nome_engenheiro}</span> <br>
                    
                    ID do Engenheiro:
                    <span id='id_engenheiro'>${item.id_engenheiro}</span> <br>
            `)
            })
        },
        error: function () {
            alert("Falha ao acessar GET/projetos_finalizados")
        }
    })
}

// Click nos cartões
$(document).on('click', '.cartoes', function () {
    $("#formulario_editar_projeto").show()
    $("#tela_escura").show();

    var id_projeto = $(this).find('#id_projeto').text()
    $("#caixa_cod_projeto2").val(id_projeto)

    var nome_projeto = $(this).find('#nome_projeto').text()
    $("#caixa_nome2").val(nome_projeto)

    var descricao = $(this).find('#descricao').text()
    $("#caixa_descricao2").val(descricao)

    var fk_id_engenheiro = $(this).find('#id_engenheiro').text()
    $("#caixa_engenheiro2").val(fk_id_engenheiro)


    var situacao = $(this).find('#situacao').text()
    $("#caixa_situacao2").val(situacao)
})

$("btn_fechar_editar").click(function () {
    $("#formulario_editar_projeto").hide();
    $("#tela_escura").hide();
})

// Executar acões ao abrir o site
$(document).ready(function () {
    carregarPendentes()
    carregarFinalizados()
    carregarEmAndamento()
})
