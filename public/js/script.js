let currentSendCrypto = document.querySelector('.current-crypto');
let sendCryptoList = document.querySelector('.send-cryptocurency-list');
let personalAccountNavigation = document.querySelector('.personal-account-navigation-lists');
let withdrawNavigation = document.querySelector(".choice-withdraw-navigation");
let bankWithdrawChoise = document.querySelector('.withdraw-bank-choise');
let mobileBankWithdrawChoise = document.querySelector('.mobile-withdraw-bank-choise');
let menuBtn = document.querySelector('.navbar-toggler');
let btnIcon = document.querySelector('.navbar-toggler-icon');
let choseMobileSettingCategoryBtn = document.querySelector('#chooseSettingBtn');
let navMenu = document.querySelector('.navigation-menu');

$(menuBtn).click(function () {
    if ($(menuBtn).hasClass('collapsed')) {
        $(btnIcon).addClass('close-menu-icon')
    } else {
        $(btnIcon).removeClass('close-menu-icon');
    }
})
$('#modalGetLogin').change(function(){
    if($("#modalGetLogin:checked")) {
        $('#loginContent').show();
        $('#signInContent').hide();
    }
});

$('#modalGetSign').change(function(){
    if($("#modalGetSign:checked")) {
        $('#loginContent').hide();
        $('#signInContent').show();
    }
});


//Способ пополнения
$(personalAccountNavigation).change(function () {
   if ($('#btnDepositBank').is(':checked')) {
       $('#bankDepositBlock').show();
       $('#cryptoDepositBlock').hide();
    } else if ($('#btnDepositCrypto').is(':checked')) {
       $('#cryptoDepositBlock').show();
       $('#bankDepositBlock').hide();
   }
});

$(bankWithdrawChoise).change(function () {
    if ($('#internationalBankTransferBtn').is(':checked')) {
        $('#internationalBankTransferBlock').show();
        $('#sepaTransferBlock').hide();
        chooseWithdrawBtn.textContent = "International Bank transfer";
    } else if ($('#sepaTransfer').is(':checked')) {
        $('#sepaTransferBlock').show();
        $('#internationalBankTransferBlock').hide();
        chooseWithdrawBtn.textContent = "SEPA transfer";
    }
});

function closeMobileMenu() {
    let navbarToggler = document.querySelector('.navbar-toggler');
    btnIcon.classList.remove('close-menu-icon');
    navMenu.classList.remove('show');
    navbarToggler.classList.add('collapsed');
    navbarToggler.setAttribute('aria-expanded', 'false');
}
// Mobile personal account
//Показать банковский деп (моб)

$('#mobileBankTransferBtn').click(function () {
    $('#mobileDepositBlock').show();
    $('#mobileCryptoBlock').hide();
    closeMobileMenu();
});

//Показать крипто деп (моб)

$('#mobileBtnDepositCrypto').click(function () {
    $('#mobileCryptoBlock').show();
    $('#mobileDepositBlock').hide();
    closeMobileMenu()
});

//выбор iban и sepa mobile
$(mobileBankWithdrawChoise).change(function () {
    if ($('#mobileInternationalBankTransferBtn').is(':checked')) {
        $('#mobileInternationalBankTransferBlock').show();
        $('#mobileSepaTransferBlock').hide();
        bankMobileChoose.textContent = 'International Bank transfer'
    } else if ($('#mobileSepaTransfer').is(':checked')) {
        $('#mobileSepaTransferBlock').show();
        $('#mobileInternationalBankTransferBlock').hide();
        bankMobileChoose.textContent = 'SEPA transfer'
    }
});
//Выбор в настройках
$('.setting-menu-lists').change(function () {
    if ($('#settingBankAccount').is(':checked')) {
        $('#bankAccountBlock').show();
        $('#changePasswordBlock').hide();
        $('#securityBlock').hide();
    } else if ($('#settingChangePassword').is(':checked')) {
        $('#bankAccountBlock').hide();
        $('#changePasswordBlock').show();
        $('#securityBlock').hide();
    } else if ($('#settingSecurity').is(':checked')) {
        $('#bankAccountBlock').hide();
        $('#changePasswordBlock').hide();
        $('#securityBlock').show();
    }
});
//Выбор в мобильных настройках
$('.mobile-setting-choise').change(function () {
    if ($('#mobileSettingBankAccount').is(':checked')) {
        choseMobileSettingCategoryBtn.textContent = 'Bank Account'
        $('#mobileBankAccountBlock').show();
        $('#mobileChangePassword').hide();
        $('#mobileSettingSecurityBlock').hide();
    } else if ($('#mobileSettingChangePassword').is(':checked')) {
        choseMobileSettingCategoryBtn.textContent = 'Change Password'
        $('#mobileBankAccountBlock').hide();
        $('#mobileChangePassword').show();
        $('#mobileSettingSecurityBlock').hide();
    } else if ($('#mobileSettingSecurity').is(':checked')) {
        choseMobileSettingCategoryBtn.textContent = 'Security'
        $('#mobileBankAccountBlock').hide();
        $('#mobileChangePassword').hide();
        $('#mobileSettingSecurityBlock').show();
    }
});


var urlAnchor = window.location.hash;
if (urlAnchor !== undefined) {
    var arrUrlAnchor = urlAnchor.split('#');
    if (document.getElementById(arrUrlAnchor[1]) !== null) document.getElementById(arrUrlAnchor[1]).classList.add('show');
}

// Появление элемента на странице
// Получаем нужный элемент
var elem = document.getElementsByClassName("visElem");
var Visible = function (target) {
    // Все позиции элемента
    var targetPosition = {
        top: window.pageYOffset + target.getBoundingClientRect().top,
        left: window.pageXOffset + target.getBoundingClientRect().left,
        right: window.pageXOffset + target.getBoundingClientRect().right,
        bottom: window.pageYOffset + target.getBoundingClientRect().bottom
    },
        // Получаем позиции окна
        windowPosition = {
            top: window.pageYOffset,
            left: window.pageXOffset,
            right: window.pageXOffset + document.documentElement.clientWidth,
            bottom: window.pageYOffset + document.documentElement.clientHeight
        };

    if (targetPosition.bottom > windowPosition.top &&
        targetPosition.top < windowPosition.bottom &&
        targetPosition.right > windowPosition.left &&
        targetPosition.left < windowPosition.right) {


        target.classList.add("slideInUp")
    }
};

// Запускаем функцию при прокрутке страницы
window.addEventListener('scroll', function () {
    for (var i = 0; i < elem.length; i++) {
        Visible(elem[i])
    }
});
// Запускаем со старта загрузки страницы если элемент виден сразу
for (var i = 0; i < elem.length; i++) {
    Visible(elem[i])
}



    var wrapAccountLeftMenu = document.getElementsByClassName("money-way-menu-list");
    var urlPath =  window.location.pathname;
    var urlPathArr = urlPath.split('/');
    if(urlPathArr[2]==='Deposit'){
        wrapAccountLeftMenu[0].classList.add('money-way-menu-list_active')
    }
    else if(urlPathArr[2]==='DepositCryptocurrency'){
        document.querySelector(".money-way-menu-list").classList.remove('money-way-menu-list_active');
        wrapAccountLeftMenu[0].classList.add('money-way-menu-list_active');
    }
    else if(urlPathArr[2]==='Withdraw'){
        document.querySelector(".money-way-menu-list").classList.remove('money-way-menu-list_active');
        wrapAccountLeftMenu[1].classList.add('money-way-menu-list_active');
    }
    else if(urlPathArr[2]==='WithdrawCryptocurrency'){
        document.querySelector(".money-way-menu-list").classList.remove('money-way-menu-list_active');
        wrapAccountLeftMenu[1].classList.add('money-way-menu-list_active');
    }
    else if(urlPathArr[2]==='History'){
        document.querySelector(".money-way-menu-list").classList.remove('money-way-menu-list_active');
        wrapAccountLeftMenu[2].classList.add('money-way-menu-list_active');
    }
    else if(urlPathArr[2]==='Setting'){
        document.querySelector(".money-way-menu-list").classList.remove('money-way-menu-list_active');
        wrapAccountLeftMenu[3].classList.add('money-way-menu-list_active');
    }
    else if(urlPathArr[2]==='ChangePassword'){
        document.querySelector(".money-way-menu-list").classList.remove('money-way-menu-list_active');
        wrapAccountLeftMenu[3].classList.add('money-way-menu-list_active');
    }
    else if(urlPathArr[2]==='TwoFactorAuthentication'){
        document.querySelector(".money-way-menu-list").classList.remove('money-way-menu-list_active');
        wrapAccountLeftMenu[3].classList.add('money-way-menu-list_active');
    };
//$(".bank-account-block-btn__add").click(function(){
//    $(".international-bank-transfer_show").hide();
//    $(".international-bank-transfer_hide").show();
//})
//$('.bank-account-block-btn__cancel').click(function(){
//        $(".international-bank-transfer_show").show();
//        $(".international-bank-transfer_hide").hide();
//})






