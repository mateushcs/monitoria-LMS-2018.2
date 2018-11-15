$('.button').click(function() {
  sendItem();
})

$(document.body).on('click', '.delete', function() { //precisa usar o document.body pois o itens são dinâmicos (não são carregados na página, só depois)
  deleteItem($(this).parent());
})

$.ajaxSetup({
  xhrFields: {
      withCredentials: true //necessário para o rem-rest-api aceitar
  }});

$(function() { //realiza assim que a página é carregada
    getItens();
});

function sendItem() {
  let inputValue = $('.input');
  let jsonValue = {
    todo: inputValue.val(),
  }

  $.post(
    "http://rem-rest-api.herokuapp.com/api/mat/",
    JSON.stringify(jsonValue), function() {
      console.log('oi')
      getItens();
})

inputValue.val("");
}

function addItens(itens) {
  itens = itens.data

  for (i = 0; i < itens.length; i++) {
    $('.content').append(
    "<div class='container' id=" + itens[i].id + "> <div class='value'>" + itens[i].todo + "</div> <div class='delete'> <i class='material-icons'>close</i></div></div>"
    );
  }
}

function getItens() {
  $('.content').html("<div class='lds-ring'><div></div><div></div><div></div><div></div></div>");

  $.get(
    "http://rem-rest-api.herokuapp.com/api/mat/",
    function(data){
      addItens(data);
  });
}

function deleteItem(item) {
  $.ajax({
    url: "http://rem-rest-api.herokuapp.com/api/mat/" + item[0].id,
    type: "DELETE",
  }).done(function() {
    getItens();
  });
}
