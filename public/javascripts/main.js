$(document).ready(function(){
  $('#search_query').val('')
  var submitForm = function(){
    var searchQuery = $('#search_query').val()
    if(searchQuery) {
      window.location.href = '/records/' + encodeURIComponent(searchQuery);
    }
    return false;
  };
  $('#search_btn').click(submitForm)
  $('#search_query').keypress(function(e){
    if (e.keyCode == 13){
      submitForm()
    }
  })
})