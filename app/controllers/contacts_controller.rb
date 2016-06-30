class ContactsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def home
    render :home
  end

  def index
    contacts = Contact.all
    render json: contacts.to_json(include: :phones)
  end

  def destroy
    contact = Contact.find(params[:id])
    contact.destroy!
  end

  def create
    contact = Contact.new(name: params[:name], email: params[:email])
    # phone = Phone.new(label: params[:phones][0][:label], number: params[:phones][0][:number])
    if contact.save!
      # phone.save!
      render json: contact.to_json#(include: :phones)
    end
  end
end
