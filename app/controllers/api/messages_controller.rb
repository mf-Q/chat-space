class Api::MessagesController < ApplicationController
  def index
    group = Group.find(params[:group_id]) #ルーティングでの設定によりparamsの中にgroup_idというキーでグループのidが入るので、これを元にDBからグループを取得
    last_message_id = params[:id].to_i
    @messages = group.messages.includes(:user).where("id > #{last_message_id}") #グループ内のメッセージの中から、params[:last_id]が最も大きいid（新しいってこと）がないかMessageを検索して、@messagesに入れる。

  end
end