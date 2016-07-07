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
    if contact.save!
      render json: contact.to_json
    end
  end

  def update
    contact = Contact.find(params[:id])
    if contact.update_attributes(name: params[:name], email: params[:email])
      render json: contact.to_json
    end
  end
end
