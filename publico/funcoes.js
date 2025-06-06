function carregarEngenheiros() {
    $("#caixa_engenheiro").append("<option>Selecione</option>");
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

// Click no botão de fechar cadastro de projeto
$("#btn_fechar_proj").click(function () {
    $("#formulario_cad_proj").hide();
    $("#tela_escura").hide();
});

// Click no btn_cad_proj
$("#btn_cad_proj").click(function () {
    $("#tela_escura").show();
    $("#formulario_cad_proj").show();
});

// Click no btn_Cadastrar_proj
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

// Carregar /projetos na página
$("#btn_gen_proj").click(function () {
    $("#conteudo_pagina").load('/projetos')
})

// Botão de cadastro de Engenheiros
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
