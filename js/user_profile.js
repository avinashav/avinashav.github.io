var htmlCodeWrapper = function () {
    var code = {
        'accountPage': '<i class="flaticon-avatar"></i>  Personal Area',
        'exit': '<i class="flaticon-logout"></i> Exit'
    };
    return {
        code: code
    }
};

var userWrapper = AccountWrapper();

jQuery(document).ready(function ($) {
    if (!!Cookies.get(userWrapper.properties.userCookieName)) {

        var codeWrapper = htmlCodeWrapper();

        var data = Cookies.getJSON(userWrapper.properties.userCookieName);
        $('#name').text("Name: " + data.family_name + " " + data.common_name);
        $('#login').text("Login: " + data.username);
        $('#email').text("Email: " + data.email);
        $('#phone_number').text("Phone Number: " + data.phone_number);

        //Load current booking
        userWrapper.findActiveBooking();

        //Add event listener for canceling current booking
        $('#cancel_current_order').click(function () {
            if ($('.options__current_order').find('p.current_order_id').html() !== "") {
                userWrapper.cancelCurrentOrder($('.options__current_order>p.current_order_id').html());
            }
        });
        //Add event listener to a table header (booking history)
        $('#history_link').click(function () {
            return userWrapper.findBookingHistory();
        });
        //Add event listener to a table header (generate report)
        $('#order_link').click(function () {
            return userWrapper.generateReport();
        });

        $('.auth>a:last').html(codeWrapper.code.exit).attr("href", " ").click(function () {
            var logoutWrapper = LogoutWrapper();
            logoutWrapper.logout();
            return false;
        });
    }
    else {
        window.location.href = userWrapper.properties.loginLink;
    }
});