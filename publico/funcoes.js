function carregarEngenheiros() {
    $("#caixa_engenheiro").append('<option>Selecione</option>')
    $.ajax({
        url: 'http://localhost:3000/engenheiros',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (dados) {
            dados.forEach(function (item) {
                $("#caixa_engenheiro").append(`
                    <option value='${item.id_engenheiro}'>${item.nome_engenheiro}</option>
                `)
            })
        },
        error: function () { alert('falha ao acessar GET /engenheiros') }
    })
}

// Executar ao abrir o site
$(document).ready(function () {
    carregarEngenheiros()
    $("#tela_escura").hide();
    $("formulario_cad_proj").hide();
})

//Click no botão de fechar cad de projeto
$("#btn_fechar_proj").click(function () {
    $("#tela_escura").hide();
    $("formulario_cad_proj").hide();
})

// Click no btn_cad_proj
$("#btn_cad_proj").click(function () {
    $("#tela_escura").show();
    $("formulario_cad_proj").show();
})

// Click no btn_cadastrar_proj
$("#btn_cadastrar_proj").click(function () {
    var nome_projeto = $("#caixa_nome").val();
    var descricao = $("#caixa_descricao").val();
    var fk_id_engenheiro = $("#caixa_engenheiro").val();
    var situacao = $("#caixa_situacao").val();
    $("#tela_escura").hide();
    $("formulario_cad_proj").hide();
    $.ajax({
        url: 'http://localhost:3000/projetos',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({nome_projeto, situacao, fk_id_engenheiro, descricao}),
        success: function(resposta){
            alert(resposta.msg)
            window.location.href = "/" //<-- volta a página inicial
        },
        error: function(){
            alert("Falha ao acessar POST /projetos")
        }
    })
})