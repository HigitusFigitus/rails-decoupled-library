# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

200.times do 
  Book.create!(:title => Faker::Company.bs.titleize, :author => Faker::App.author, :summary => Faker::Lorem.paragraph(20))
end
