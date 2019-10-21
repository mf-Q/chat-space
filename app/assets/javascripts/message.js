$(function(){
 $('#new_message').on('submit', function(e){
  e.preventDefault();
   let formData = new FormData(this);
   let url = $(this).attr('action');
   console.log(this);
   $.ajax({
     url: url,
     type: "POST",
     data: formData,
     dataType: 'json',
     processData: false,
     contentType: false
   })
  .done(function(message){
    console.log(message);  
  })
  .fail(function(){

  })
 })
});

