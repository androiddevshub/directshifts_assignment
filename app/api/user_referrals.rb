class UserReferrals < Api

  namespace :user_referrals, desc: "User Referral Related Operations" do

    get "/" do
      authenticate!

      { status: true, data: current_user.user_referrals }
    end

    post "/" do
      authenticate!
      if UserReferral.find_by(email: params[:email])
        error!({ status: false, message: "Already sent" }, 400)
      else
        if current_user.user_referrals.create(email: params[:email]) && UserReferralMailer.send_referral_mail(current_user.name, params[:email]).deliver_now
          { status: true, data: current_user.user_referrals, message: "Referral email sent" }
        end
      end
    end

  end
end
    