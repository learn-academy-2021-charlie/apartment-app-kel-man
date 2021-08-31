json.apartments @apartments do |apt|
  json.street apt.street
  json.city apt.city
  json.state apt.state
  json.manager apt.manager
  json.email apt.email
  json.price apt.price
  json.bedrooms apt.bedrooms
  json.bathrooms apt.bathrooms
  json.pets apt.pets
  json.user_id apt.user_id
  json.updated_at apt.updated_at.iso8601
end
