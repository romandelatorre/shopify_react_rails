module Api::V1
  class CommercesController < ApplicationController
    before_action :set_commerce, only: [:show, :update, :destroy]

    # GET /commerces
    def index
      @commerces = Commerce.all

      render json: @commerces
    end

    # GET /commerces/1
    def show
      render json: @commerce
    end

    # POST /commerces
    def create
      @commerce = Commerce.new(commerce_params)

      if @commerce.save
        render json: @commerce, status: :created, location: @commerce
      else
        render json: @commerce.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /commerces/1
    def update
      if @commerce.update(commerce_params)
        render json: @commerce
      else
        render json: @commerce.errors, status: :unprocessable_entity
      end
    end

    # DELETE /commerces/1
    def destroy
      @commerce.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_commerce
        @commerce = Commerce.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def commerce_params
        params.require(:commerce).permit(:product, :description, :price, :image, :department, :color)
      end
  end
end