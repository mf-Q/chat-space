$(function() {

  let search_list = $("#user-search-result");

  function buildUserresult(user){
    let html =`<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${user.name}</p>
              <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
              </div>`
    search_list.append(html);
  }
  
  function buildErrorMsg(msg){
    let html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${msg}</p>
                </div>`
    search_list.append(html);
  }


  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    let input = $("#user-search-field").val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'    
     })

    .done(function(users){
    if(input.length == 0){
      $('#user-search-result').empty();
    }
    else {
      if(users.length !== 0){
      $('#user-search-result').empty();
      users.forEach(function(user){
        buildUserresult(user);
      });
    }
    else{
      $('#user-search-result').empty();
        buildErrorMsg('一致するユーザーが見つかりませんでした');
    }
  }
      })

    .fail(function(){
      alert('エラー');
        });

  })
});