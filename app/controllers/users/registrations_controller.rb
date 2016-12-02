class Users::RegistrationsController < Devise::RegistrationsController

# before_action :sign_up_params, only: [:create]
skip_before_action :require_no_authentication
# before_action :configure_account_update_params, only: [:update]
  respond_to :json

  # GET /resource/sign_up
  # def new
  # end

  # POST /resource
  # end

 def create
   user = User.new(sign_up_params)
   if user.save
     render :json=> user.as_json(:auth_token=>user.authentication_token, :email=>user.email), :status=>201
     return
   else
     warden.custom_failure!
     render :json=> user.errors, :status=>422
   end
 end

  # GET /resource/edit
  # def edit
  # end

  # PUT /resource
  # def update
  # end

  # DELETE /resource
  # def destroy
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:user, :password, :password_confirmation])
  # end

  # # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:user, ])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end