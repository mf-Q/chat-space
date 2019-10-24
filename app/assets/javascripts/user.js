$(document).on('turbolinks:load', function(){

  let search_list = $("#user-search-result");
  let add_list = $(".user");

  function buildUserresult(user){
    let html =`<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${user.name}</p>
              <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
              </div>`
    search_list.append(html);
  }
  
  function addMember_remove(user_id, user_name) {
    let html = `<div class='chat-group-user clearfix js-chat-member', id="chat-group-user-${ user_id }">
                  <input name='group[user_ids][]' type='hidden' value='${ user_id }' >
                  <p class='chat-group-user__name'>${ user_name }</p>
                  <p class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</p>
                </div>`
    add_list.append(html);
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
    let group_id = $('.chat__group_id').val();
    // いまいるユーザーの配列の箱をつくる

    //配列にユーザーをあたいを入れる

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input, group_id: group_id },
       //配列のぱらむすを渡す
      dataType: 'json'    
     })

    .done(function(users){
    if(input.length == 0){
      $('#user-search-result').empty();
    }
    else {
      if(input.length !== 0){
      $('#user-search-result').empty();
      users.forEach(function(user){
        if(user.name !== $('.chat-group-user__name').val())         // 一度検索された人を出さないようにする。
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

  $(document).on("click", ".user-search-add", function () {
    let user_id = $(this).data("user-id");
    let user_name = $(this).data("user-name");
    $(this).parent().remove();
    addMember_remove(user_id, user_name);
  })

  $(document).on("click", ".user-search-remove", function () {
    $(this).parent().remove();
  })

});

