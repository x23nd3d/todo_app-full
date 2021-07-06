let loginForm = $('.form-container.login');
let signupForm = $('.form-container.sign-up');
let loginInfo = $('.info.login');
let signUpInfo = $('.info.sign-up');
let loginAcButton = $('#ac-login');
let signupAcButton = $('#ac-signup');
let form = $('.form');

loginAcButton.click(function(){
    showLoginForm();
})

signupAcButton.click(function(){
    showSignupForm();
})

function showLoginForm() {
    signupForm.addClass('hidden');
    loginInfo.addClass('hidden');
    signUpInfo.removeClass('hidden');
    loginForm.removeClass('hidden');
}

function showSignupForm() {
    signupForm.removeClass('hidden');
    loginInfo.removeClass('hidden');
    signUpInfo.addClass('hidden');
    loginForm.addClass('hidden');
}