$(function(){

  function buildMessage(message){
    image = message.image.url ? `<img src=${message.image.url}>` : "";
    let html = `<div class="message__upper-info__talker">
                ${message.user_name}
                </div>
                <div class="message__upper-info__date">
                ${message.created_at}
                </div>
                <p class="message__text">
                ${message.content}
                </p>
                ${image}`
                
    return html;
  }

 $('#new_message').on('submit', function(e){
  e.preventDefault();
   let formData = new FormData(this);
   let url = $(this).attr('action');
   
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
    $('#message_content')[0].reset();
    $('.submit-btn').removeAttr('disabled');
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight},300);
  })
  .fail(function(){
    alert('エラー');
  })
 })
});

