$(document).ready(function(){
  $('#search_btn').click(function(){
    var searchQuery = $('#search_query').val()
    if(searchQuery) {
      window.location.replace('/records/' + encodeURIComponent(searchQuery));
    }
    return false;
  })
})