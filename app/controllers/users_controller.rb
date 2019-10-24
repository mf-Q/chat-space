class UsersController < ApplicationController

def edit
end

def index
  if params[:group_id].present?
    @group = Group.find(params[:group_id])
    @ids = @group.users.ids
    @users = User.where.not(id: @ids).where('(name LIKE(?)) and (id != ?)', "%#{params[:keyword]}%", "#{current_user.id}")
    # ↑カレントゆーざーアイディーだけでなくぜんぶノットの対象にする
  else
    @users = User.where('(name LIKE(?)) and (id != ?)', "%#{params[:keyword]}%", "#{current_user.id}")
  end
  respond_to do |format|
    format.html
    format.json
  end
end

def update
  if current_user.update(user_params)
    redirect_to root_path
  else
    render :edit
  end
end

private

def user_params
  params.require(:user).permit(:name, :email)
end

# def xxx
# あじゃっくすでわたってきた配列にカレントユーザーIDをいれて、あたらに配列を再生成する
# その再生性した配列をノットで省く
# end

end