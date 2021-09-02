class Apartment < ApplicationRecord
  belongs_to :user
  validates :street, :city, :state, :manager, :email, :price, presence: true
end
