$(function(){

  function buildMessage(message){
    let html = `<div class="message__upper-info__talker">
                ${message.user_name}
                </div>
                <div class="message__upper-info__date">
                ${message.created_at}
                </div>
                <p class="message__text">
                ${message.content}
                </p>`
    return html;
  }

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
    let html = buildMessage(message);
    $('.messages').append(html)
    $('#message_content').val('')
    $('#.submit-btn').removeAttr('disabled');
  })
  .fail(function(){
    alert('エラー');
    

  })
 })
});

