Rails.application.routes.draw do
  devise_for :users
  root to: 'welcome#index'
  mount Api => "/"
  get "/*path", to: "welcome#index", constraints: ->(request) do
                  !request.xhr?
                end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
