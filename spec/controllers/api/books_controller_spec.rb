require 'rails_helper'

RSpec.describe Api::BooksController, type: :controller do

  let(:valid_book_attributes) do
    {:title => 'My Title', :author => 'Author Jones'}
  end

  describe "GET #index" do
    it "assigns @books in desc ID order" do
      book1 = Book.create!(valid_book_attributes.merge(:title => 'Title 1'))
      book2 = Book.create!(valid_book_attributes.merge(:title => 'Title 2'))
      xhr :get, :index
      expect(assigns :books).to eq [book2, book1]
    end
  end

  context 'without book' do
    describe "GET #show" do
      it "returns 404" do
        xhr :get, :show, {:id => 0}
        expect(response.status).to eq(404)
      end
    end
  end

  context 'with book' do
    let(:valid_book_update) do
      {:title => 'New Title'}
    end

    let(:invalid_book_update) do
      {:title => ''}
    end

    before(:each) {
      @test_book = Book.create!(valid_book_attributes)
    }

    describe "GET #show" do
      it "assign @book with id" do
        xhr :get, :show, {:id => @test_book.to_param}
        expect(assigns :book).to eq @test_book
      end
    end

    describe "POST #update" do
      context 'valid_book_update' do
        it "updates book" do
          expect {
            xhr :post, :update, {:id => @test_book.to_param, :book => invalid_book_update}
            @test_book.reload
          }.not_to change(@test_book, :title)
        end
      end
      context 'invalid_book_update' do
        it "updates book" do
          expect {
            xhr :post, :update, {:id => @test_book.to_param, :book => valid_book_update}
            @test_book.reload
          }.to change(@test_book, :title).from(valid_book_attributes[:title]).to('New Title')
        end
      end
    end
    describe "DELETE #destroy" do
      it "remove item" do
        xhr :delete, :destroy, {:id => @test_book.to_param}
        expect { Book.find(@test_book.id) }.to raise_exception(ActiveRecord::RecordNotFound)
      end
    end

    describe "POST #readit" do
      it "returns http success" do
        expect {
          xhr :post, :readit, {:id => @test_book.to_param}
          @test_book.reload
        }.to change(@test_book, :read_count).from(0).to(1)
      end
    end
  end

end
