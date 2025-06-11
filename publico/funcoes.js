function carregarEngenheiros() {
    $("#caixa_engenheiro").append("<option>Selecione</option>");
    $("#caixa_engenheiro2").append("<option>Selecione</option>");
    $.ajax({
        url: "http://localhost:3000/engenheiros",
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (dados) {
            dados.forEach(function (item) {
                $("#caixa_engenheiro").append(
                    `<option value='${item.id_engenheiro}'>${item.nome_engenheiro}</option>`
                );
                $("#caixa_engenheiro2").append(
                    `<option value='${item.id_engenheiro}'>${item.nome_engenheiro}</option>`
                );
            });
        },
        error: function () {
            alert("Falha ao acessar GET /engenheiros");
        },
    });
}

$(document).ready(function () {
    carregarEngenheiros();
    $("#tela_escura").hide();
    $("#formulario_cad_proj").hide();
    $("#formulario_cad_eng").hide();
    $("#formulario_editar_projeto").hide();
});

// Abrir cadastro de engenheiro
$("#btn_cad_eng").click(function () {
    $("#formulario_cad_eng").show();
    $("#tela_escura").show();
});

// Fechar cadastro de engenheiro
$("#btn_fechar_eng").click(function () {
    $("#formulario_cad_eng").hide();
    $("#tela_escura").hide();

})

// Botão de cadastrar Engenheiros
$("#btn_cadastrar_eng").click(function () {
    var nome_engenheiro = $("#caixa_nome_eng").val();
    if (nome_engenheiro == "") {
        alert("Preencha todos os campos")
        $("#caixa_nome_eng").css('border', '1px solid red')
        $("#caixa_nome_eng").css('box-shadow', '0px 0px 10px red')
        return
    }
    $("#formulario_cad_eng").hide();
    $("#tela_escura").hide();
    var nome_engenheiro = $("#caixa_nome_eng").val();
    $.ajax({
        url: 'http://localhost:3000/engenheiro',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ nome_engenheiro }),
        success: function (resposta) {
            alert(resposta.msg);
            window.location.href = "/";
        },
        error: function () {
            alert("Falha ao acessar POST /engenheiro");
        }
    });
});

// Abrir cadastro de projeto
$("#btn_cad_proj").click(function () {
    $("#tela_escura").show();
    $("#formulario_cad_proj").show();
});

// Fechar cadastro de projeto
$("#btn_fechar_proj").click(function () {
    $("#formulario_cad_proj").hide();
    $("#tela_escura").hide();
});

// Botão de cadastrar projeto
$("#btn_cadastrar_proj").click(function () {
    var nome_projeto = $("#caixa_nome").val();
    var descricao = $("#caixa_descricao").val();
    var fk_id_engenheiro = $("#caixa_engenheiro").val();
    var situacao = $("#caixa_situacao").val();
    $("#caixa_nome, #caixa_descricao, #caixa_engenheiro, #caixa_situacao").css('border', '');

    if (nome_projeto == "") {
        $("#caixa_nome").css('border', '1px solid red');
    }
    if (descricao == "") {
        $("#caixa_descricao").css('border', '1px solid red');
    }
    if (fk_id_engenheiro == "" || fk_id_engenheiro == "Selecione") {
        $("#caixa_engenheiro").css('border', '1px solid red');
    }
    if (situacao == "") {
        $("#caixa_situacao").css('border', '1px solid red');
    }
    if (nome_projeto == "" || descricao == "" || fk_id_engenheiro == "" || fk_id_engenheiro == "Selecione" || situacao == "") {
        alert("Preencha todos os campos!");
        return;
    }

    $("#tela_escura").hide();
    $("#formulario_cad_proj").hide();
    $.ajax({
        url: 'http://localhost:3000/projetos',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            nome_projeto,
            situacao,
            fk_id_engenheiro, descricao
        }),
        success: function (resposta) {
            alert(resposta.msg);
            window.location.href = "/"; // voltar a página inicial
        },
        error: function () {
            alert("Falha ao acessar POST /projetos");
        }
    });
});

// Fechar edição de projeto
$("#btn_fechar_editar").click(function () {
    $("#formulario_editar_projeto").hide();
    $("#tela_escura").hide();
});

// Botão de Salvar
$("#btn_salvar").click(function () {
    var id_projeto = $("#caixa_cod_projeto2").val()
    var fk_id_engenheiro = $("#caixa_engenheiro2").val()
    var nome_projeto = $("#caixa_nome2").val()
    var situacao = $("#caixa_situacao2").val()
    var descricao = $("#caixa_descricao2").val()
    
    $("#formulario_editar_projeto").hide()
    $("#tela_escura").hide()

// Alert
    $.ajax({
        url: 'http://localhost:3000/alterar_projeto/',
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ descricao, id_projeto, fk_id_engenheiro, situacao, nome_projeto }),
        success: function (resposta) {
            alert(resposta.msg);
            window.location.href = '/'
        },
        error: function () {
            alert("Falha ao acessar PUT /alterar_projeto");
        }
    });
})

// Botão p deletar projeto
$("#btn_deletar").click(function () {
    var confirmacao = confirm('Tem certeza que deseja apagar o projeto?')
    if (!confirmacao) { return; }


    var id_projeto = $("#caixa_cod_projeto2").val()
    $.ajax({
        url: 'http://localhost:3000/deletar_projeto/' + id_projeto,
        type: 'DELETE',
        dataType: 'json',
        contentType: 'application/json',
        success: function (resposta) {
            alert(resposta.msg);
            window.location.href = '/'
        },
        error: function () {
            alert("Falha ao acessar DELETE /deletar_projeto");
        }
    });
});

// Carregar /projetos na página
$("#btn_gen_proj").click(function () {
    $("#conteudo_pagina").load('/projetos')
})