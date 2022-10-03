class CurrenciesController < ApplicationController
    def index
    end 
    
    def search
        # compare lowercase search paramater to lowecase one in DB 
        @currencies =  Currency.where('LOWER(name) LIKE ?',  "%#{params[:search].downcase}%")
        render json: {currencies: @currencies}
    end
    
    # Take the currency id and the amount owned to return the calculation
    def calculate
        amount = params[:amount]
        render json: {
            currency: currency, 
            current_price: currency.current_price, 
            amount: amount, 
            value: currency.calculate_value(amount) 
        }
    end 

    private 
    def currency
        @currency = Currency.find(params[:id])
    end
end 