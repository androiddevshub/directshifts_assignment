class UserReferralMailer < ApplicationMailer
  def send_referral_mail
    mail(from: "me@you.com", to: "shubjain440@gmail.com", subject: "Test subject")
  end
end
