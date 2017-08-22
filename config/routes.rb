Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get '/meetings' => 'meetings#index'
      post '/meetings' => 'meetings#create'
      get '/meetings/:id' => 'meetings#show'
    end
  end

  get '/' => 'meetings#index'

  get '/meetings' => 'meetings#index'
  get '/meetings/:id' => 'meetings#show'
end
