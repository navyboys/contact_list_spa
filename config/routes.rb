Rails.application.routes.draw do
  root to: 'contacts#home'
  resources :contacts, only: [:index, :destroy, :create]
  # get '/search' to: 'contacts#search'
end
