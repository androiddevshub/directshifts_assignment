class UserReferralMailer < ApplicationMailer
  def send_referral_mail(name, email)
    @name = name
    mail(to: email, subject: "Referral invite")
  end
end
