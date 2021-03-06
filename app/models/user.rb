class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  has_many :user_referrals

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  def user_data(token)
    {
      id: id,
      name: name,
      email: email,
      token: token,
    }
  end       
end
