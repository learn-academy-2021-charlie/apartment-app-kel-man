class ApartmentsController < ApplicationController
  before_action :authenticate_user!

  def index
    @apartments = Apartment.all
  end

  def create
    if current_user
      @apartment = current_user.apartments.create(apartment_params)
    else
      head 401
    end
  end

  private
  def apartment_params
    params.require(:apartment).permit(:street, :city, :state, :manager, :email, :price, :bedrooms, :bathrooms, :pets)
  end
end
