require 'rails_helper'

RSpec.describe "Apartments", type: :request do
  let(:user1){ User.create!({
    email: 'email@email.com',
    password: 'passwordencrypted'
  } )}
  let(:apt1){ user1.apartments.create!({
    street: '11211 E 132nd St.',
    city: 'Gresham',
    state: 'OR',
    manager: 'Shawn',
    email: 'shawn@apartmentsor.com',
    price: '$1200.00 / month',
    bedrooms: 2,
    bathrooms: 2,
    pets: 'Pets permitted with deposit'
  } )}
  let(:apt2){ user1.apartments.create!({
    street: '10398 E Washington St.',
    city: 'Portland',
    state: 'OR',
    manager: 'Shawn',
    email: 'shawn@apartmentsor.com',
    price: '$1800.00 / month',
    bedrooms: 2,
    bathrooms: 1,
    pets: 'Large animals not permitted.'
  } )}

  before do
    sign_in(user1)
    apt1
    apt2
  end

  describe 'index' do
    let(:request){ get '/apartments' }
    let(:expected_response){
      [{
        "street" => apt1.street,
        "city" => apt1.city,
        "state" => apt1.state,
        "manager" => apt1.manager,
        "email" => apt1.email,
        "price" => apt1.price,
        "bedrooms" => apt1.bedrooms,
        "bathrooms" => apt1.bathrooms,
        "pets" => apt1.pets,
        "user_id" => user1.id,
        "id" => apt1.id,
        "updated_at" => apt1.updated_at.iso8601
      }, {
        "street" => apt2.street,
        "city" => apt2.city,
        "state" => apt2.state,
        "manager" => apt2.manager,
        "email" => apt2.email,
        "price" => apt2.price,
        "bedrooms" => apt2.bedrooms,
        "bathrooms" => apt2.bathrooms,
        "pets" => apt2.pets,
        "user_id" => user1.id,
        "id" => apt2.id,
        "updated_at" => apt2.updated_at.iso8601
      }]
    }

    it 'returns a list of apartments in JSON' do
      request
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)["apartments"]).to include *expected_response
    end
  end

  describe 'create' do
    let(:request){ post '/apartments', params: {
      apartment: {
        street: apt1.street,
        city: apt1.city,
        state: apt1.state,
        manager: apt1.manager,
        email: apt1.email,
        price: apt1.price,
        bedrooms: apt1.bedrooms,
        bathrooms: apt1.bathrooms,
        pets: apt1.pets
      }
    } }
    it 'creates a new apartment listing' do
      expect{ request }.to change{ Apartment.count }.by 1
    end
    context 'params are empty' do
      let(:request){ post '/apartments', params: {
      } }
      it 'does not allow empty params' do
        expect{ :request }.to change{ Apartment.count }.by 0
      end
    end
    context 'user must be signed in' do
      let(:request){ post '/apartments', params: {
        apartment: {
          street: apt1.street,
          city: apt1.city,
          state: apt1.state,
          manager: apt1.manager,
          email: apt1.email,
          price: apt1.price,
          bedrooms: apt1.bedrooms,
          bathrooms: apt1.bathrooms,
          pets: apt1.pets
        }
      } }
      it 'does not allow unauthenticated user to create' do
        sign_out user1
        expect{ request }.to change{ Apartment.count }.by 0
      end
    end
  end

  describe 'show' do
    let(:request) { get "/apartments/#{apt2.id}" }
    let(:expected_response) { {
      street: apt2.street,
      city: apt2.city,
      state: apt2.state,
      manager: apt2.manager,
      email: apt2.email,
      price: apt2.price,
      bedrooms: apt2.bedrooms,
      bathrooms: apt2.bathrooms,
      pets: apt2.pets,
      user_id: apt2.user_id,
      id: apt2.id,
      updated_at: apt2.updated_at.iso8601
    }.to_json }
    it 'shows apartment2 in the database' do
      request
      expect(response.body).to eq expected_response
    end
  end

  describe 'update' do
    let(:request) { patch "/apartments/#{apt2.id}", params: {
      apartment: {
        street: 'updated street'
      }
    } }
    it 'updates the apartment object' do
      request
      expect(response.status).to eq 200
    end
    let(:user2){ User.create!({
      email: 'user2@email.com',
      password: 'passwordencrypted'
    } )}
    context 'wrong user' do
      it 'does not allow user to edit other peoples apartments' do
        sign_in(user2)
        request
        expect(response.status).to eq 401
      end
    end
  end

  describe 'destroy' do
    let(:request) { delete "/apartments/#{apt2.id}" }
    it 'deletes apt2 from the database' do
      expect{ request }.to change{ Apartment.count }.by -1
    end
  end
end
