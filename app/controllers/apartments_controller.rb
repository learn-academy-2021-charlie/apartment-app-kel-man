class ApartmentsController < ApplicationController

  def index
    @apartments = Apartment.all
  end

  def create
    :authenticate_user!
    if current_user
      @apartment = current_user.apartments.create(apartment_params)
    else
      head 401
    end
  end

  def show
    @apartment = Apartment.find(params[:id])
  end

  private
  def apartment_params
    params.require(:apartment).permit(:street, :city, :state, :manager, :email, :price, :bedrooms, :bathrooms, :pets)
  end
end
