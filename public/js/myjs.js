$('#login-form').validate({
    rules: {
        'email': {
            required: true,
            email: true
        },
        'password': {
            required: true,
            // minlength: 6,
        }
    },
    messages: {
        'email': {
            required: 'Please fill email.',
            email: 'Please fill email follow format @domain.com.'
        },
        'password': {
            required: 'Please fill password.',
            // minlength: 'Password is too short.',
        }
    }
});
$('#register-form').validate({
    rules: {
        'firstname': {
            required: true,
            // firstname: true
        },
        'lastname': {
            required: true,
            // lastname: true
        },
        'address': {
            required: true,
            // address: true
        },
        'email': {
            required: true,
            email: true
        },
        'numbercmnd': {
            required: true,
            // numbercmnd: true
        },
        'password': {
            required: true,
            // minlength: 6,
        },
        'password_confirmation': {
            equalTo: '[name="password"]'
        }
    },
    messages: {
        'firstname': {
            required: 'Please fill firstname.',
        },
        'lastname': {
            required: 'Please fill lastname.',
        },
        'address': {
            required: 'Please fill address.',
        },
        'email': {
            required: 'Please fill email.',
            email: 'Please fill email follow format @domain.com.'
        },
        'numbercmnd': {
            required: 'Please fill number identity.',
        },
        'password': {
            required: 'Please fill password.',
            // minlength: 'Password is too short.',
        },
        'password_confirmation': {
            equalTo: 'Password not same.'
        }
    }
});