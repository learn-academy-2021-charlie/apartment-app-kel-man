# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = [
  {
    email: 'shawn@users.com',
    password: 'user1password!'
  },
  {
    email: 'jason@users.com',
    password: 'user2password!'
  }
]

users.each do |attr|
  User.create attr
  p "creating user #{attr}"
end

apartments = [
  {
    street: '11211 E 132nd St.',
    city: 'Gresham',
    state: 'OR',
    manager: 'Shawn',
    email: 'shawn@apartmentsor.com',
    price: '$1200.00 / month',
    bedrooms: 2,
    bathrooms: 2,
    pets: 'Pets permitted with deposit'
  },
  {
    street: '10398 E Washington St.',
    city: 'Portland',
    state: 'OR',
    manager: 'Shawn',
    email: 'shawn@apartmentsor.com',
    price: '$1800.00 / month',
    bedrooms: 2,
    bathrooms: 1,
    pets: 'Large animals not permitted.'
  },
  {
    street: '1400 W 142nd St.',
    city: 'Beaverton',
    state: 'OR',
    manager: 'Jason',
    email: 'jason@apartmentsor.com',
    price: '$1400.00 / month',
    bedrooms: 2,
    bathrooms: 2,
    pets: 'Pets permitted with deposit'
  },
  {
    street: '16390 W 86th St.',
    city: 'Tigard',
    state: 'OR',
    manager: 'Jason',
    email: 'jason@apartmentsor.com',
    price: '$1600.00 / month',
    bedrooms: 3,
    bathrooms: 2,
    pets: 'Pets permitted with deposit'
  }
]

shawn = User.where(email: 'shawn@users.com').first
jason = User.where(email: 'jason@users.com').first

apartments.each_with_index do |attr, index|
  if index < 2
    shawn.apartments.create attr
    p "creating apartment #{attr}"
  else
    jason.apartments.create attr
    p "creating apartment #{attr}"
  end
end
