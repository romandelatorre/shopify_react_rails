Rails.application.routes.draw do
  post '/login',    to: 'sessions#create'
  get '/logged_in', to: 'sessions#is_logged_in?'
  delete '/logout',   to: 'sessions#destroy'

  namespace :api do
    namespace :v1 do
      resources :commerces     
    end
  end

  resources :users, only: [:create, :show, :index] do 
    resources :items, only: [:create, :show, :index, :destroy]
      post '/users',         to: 'users#create'
      get '/users/:user_id', to: 'users#show'
      get '/users',          to: 'users#index'
  end
end