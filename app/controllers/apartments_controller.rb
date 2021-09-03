class ApartmentsController < ApplicationController

  def index
    @apartments = Apartment.all
  end

  def create
    :authenticate_user!
    if current_user
      @apartment = current_user.apartments.create(apartment_params)
      if @apartment
        head 200
      else
        head 422
      end
    else
      head 401
    end
  end

  def show
    @apartment = Apartment.find(params[:id])
  end

  def update
    :authenticate_user!
    apartment = Apartment.find(params[:id])
    if current_user.id == apartment.user_id
      apartment.update(apartment_params)
      head 200
    else
      head 401
    end
  end

  def destroy
    :authenticate_user!
    apartment = Apartment.find(params[:id])
    if current_user.id == apartment.user_id
      apartment.delete
      head 200
    else
      head 401
    end
  end

  private
  def apartment_params
    params.require(:apartment).permit(:street, :city, :state, :manager, :email, :price, :bedrooms, :bathrooms, :pets)
  end
end
