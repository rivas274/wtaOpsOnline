<template>
    <body  class="m--skin- m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--fixed m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default"  >
		<div class="m-grid m-grid--hor m-grid--root m-page">
			<div 	class="m-grid__item m-grid__item--fluid m-grid m-grid--hor m-login m-login--signin m-login--2 m-login-2--skin-3" 
					id="m_login" 
					style="background-image: url(./assets/app/media/login/login.jpg);">
				<div class="m-grid__item m-grid__item--fluid	m-login__wrapper">
					<div class="m-login__container">
						<div class="m-login__logo">
							<a href="#">
								<img src="https://wtaops.com/app/admin/pictures/thumbnail/1logo_empresa201712080920245063.png">
							</a>
						</div>
						<div class="m-login__signin">
							<div class="m-login__head">
								<h3 class="m-login__title">
									Sign In To Admin
								</h3>
							</div>
							<form class="m-login__form m-form" action="">
                                <div v-if="valid == true">
                                    <div  class="m-alert m-alert--outline alert-danger alert alert-dismissible" role="alert">
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close"></button>
                                        <span>{{ message }}</span>
                                    </div>
                                </div>
								<div class="form-group m-form__group">
									<input class="form-control m-input"   type="text" placeholder="Email" name="email" autocomplete="off" v-model.lazy="inputsData.email">
								</div>
								<div class="form-group m-form__group">
									<input class="form-control m-input m-login__form-input--last" type="password" placeholder="Password" name="password" v-model.lazy="inputsData.password">
								</div>
								
								<div class="m-login__form-action">
									<button type="button" v-on:click="validLogin" id="m_login_signin_submit" class="btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air  m-login__btn">
										Sign In
									</button>
								</div>
							</form>
						</div>
						<div class="m-login__account">
							<span class="m-login__account-msg">
								All users of our online services subject to Privacy Statement and agree to be bound by Terms of Service. Please read. © 2019 Ils. All rights reserved. Powered by ILS-D2PW Solutions
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<FormError :attribute_name="'firstname'" :errors_form="errors"> </FormError>
	</body>
</template>
<script>
    export default {
        name: 'Login',
        props: {
            msg: String
        },
        data: function () {
            return {
                inputsData: {},
                resp:{},
                valid: false,
                message: 'Test'
            }
        },
        methods : {
            validLogin : function () {
                this.axios.get('http://apilayer.net/api/historical?access_key=3da0e9a1d2bb1bee46cb1dc1b2302aa7&date=2018-09-19&source=USD&currencies=COP').then((response) => {
                    this.resp = response.data;
                     if(this.resp.quotes.USDCOP<=3030){
                        //window.location.href = 'index';
                        this.valid = true;
                        this.message = 'Error'
                        //this.$router.go('/index') 
                    }else{
                        this.valid = false;
                    }
                    console.log(status,this.resp.quotes.USDCOP);
                });
            }
        }
        
    }
</script>