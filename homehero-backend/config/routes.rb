Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/listings'  => 'listings#index' 
  # get '/businesses'  => 'businesses#' 
  # get '/homeservices'  => 'homeservices#' 

end

