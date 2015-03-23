require "rails_helper"

RSpec.feature "User Views Library", :type => :feature, :js => true do
  scenario "User Views Library" do
    book = Book.create!(:title => 'Title of Book is This', :author => 'Author', :summary => 'Some long story')
    visit "/"
    expect(page).to have_text(book.title)
    find('[data-book-id="' + book.id.to_s + '"] .read-book').click
    expect(find('#book-featured')).to have_text(book.summary)
  end
end
