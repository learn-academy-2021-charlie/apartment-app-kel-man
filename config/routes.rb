Rails.application.routes.draw do
  resources :apartments
  devise_for :users
  # devise_for :users, defaults: {format: :json}, controllers: {
  # # devise_for :users, controllers: {
  #   registrations: 'users/registrations',
  #   sessions: 'users/sessions',
  #   confirmations: 'users/confirmations',
  # }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '*path', to: 'home#index', constraints: ->(request){ request.format.html? }
  root 'home#index'
end
