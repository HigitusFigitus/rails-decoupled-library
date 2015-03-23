class Book < ActiveRecord::Base
  default_scope ->(){ order(id: :desc) }

  validates_presence_of :title
  validates_presence_of :author
end
