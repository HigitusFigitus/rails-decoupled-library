class Api::BooksController < ApplicationController

  before_action only: [:show, :update, :destroy, :readit] do
    begin
      @book = Book.find(params[:id])
    rescue ActiveRecord::RecordNotFound => e
      render json: {}, :status => :not_found
    end
  end

  def index
    @books = Book.select("id, author, title, read_count").all
    render json: {books: @books}
  end

  def show
    render json: {book: @book}
  end

  def readit
    @book.increment! :read_count
    render json: {book: @book}
  end

  def update
    if @book.update(book_params)
      render json: {book: @book}
    else
      render json: {errors: @book.errors}, :status => :bad_request
    end  
  end

  def destroy
    @book.destroy
    head :no_content
  end

  private 
  def book_params
    params.require(:book).permit(:author, :title, :summary)
  end  
end
