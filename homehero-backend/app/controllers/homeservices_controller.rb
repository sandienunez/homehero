class HomeServicesController < ApplicationController

    def index
        homeservices = HomeService.all
        render json:  homeservices
      end
    
      def create
        new_homeservice = HomeService.create(homeservice_params)
      end

    
end 

private

  def homeservice_params
    params.require(:home_service).permit(:types)
  end
end