$(document).ready(function(){
  // codice da clonare
  var player_data = $('#template_player_data').html();
  var template_player_data_function = Handlebars.compile(player_data);

  // quando clicco sul bottone
  $('button').click(function(){
    // svuoto il container
    $('.container').empty();
    // metto in una variabile il valore della casella di input
    var numero_card = $(this).siblings().val();
    // per un massimo di 20 card
    if(numero_card <= 20){
      $.ajax({
        url: 'https://www.boolean.careers/api/array/basket',
        method: 'get',
        data: {
          n: numero_card
        },
        success: function (data, stato) {
          console.log(data.response);
          var context;
          // per visualizzare ogni card
          for (var i = 0; i < numero_card; i++) {
            context = {
              codice: data.response[i].playerCode,
              punti: data.response[i].points,
              rimbalzi: data.response[i].rebounds,
              falli: data.response[i].fouls,
              duepunti: data.response[i].twoPoints,
              trepunti: data.response[i].threePoints,
            };
            var html = template_player_data_function(context);
            // appendo ogni card al container
            $('.container').append(html);
          };
        },
        error: function (richiesta, stato, errori) {
          alert("E' avvenuto un errore. " + errore);
        }
      });
    } else {
      // se il numero è > 20
      alert('Hai inserito un numero sbagliato');
    };
    // svuoto la casella di input
    $('input').val('');
  });
});
