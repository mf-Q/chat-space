$(function(){

  function buildMessage(message){
    image = message.image.url ? `<img src=${message.image.url}>` : "";
    let html = `<div class="auto clearfix" data-message-id=${message.id}>
                  <div class="message__upper-info__talker">
                  ${message.user_name}
                  </div>
                  <div class="message__upper-info__date">
                  ${message.created_at}
                  </div>
                  <p class="message__text">
                  ${message.content}
                  </p>
                  ${image}
                </div>`
                
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
    $('#new_message')[0].reset();
    $('.submit-btn').removeAttr('disabled');
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight},300);
  })
  .fail(function(){
    alert('エラー');
  })
 })

  let reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){       //グループメッセージのページだけで自動更新させる
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      let last_message_id = $('.auto:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })

    .done(function(messages) {
      let insertHTML ='';
      messages.forEach(function (message) {
      insertHTML = buildMessage(message);
      $('.messages').append(insertHTML); 
        })
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      })
    .fail(function() {
      alert('更新に失敗しました');
    });
   }
  };
  setInterval(reloadMessages, 5000);

});

