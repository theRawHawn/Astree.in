
(function ($) {

	var $window = $(window),
		$body = $('body');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: [null, '736px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Dropdowns.
	$('#nav > ul').dropotron({
		mode: 'fade',
		noOpenerFade: true,
		speed: 300
	});

	// Nav.

	// Toggle.
	$(
		'<div id="navToggle">' +
		'<a href="#navPanel" class="toggle"></a>' +
		'</div>'
	)
		.appendTo($body);

	// Panel.
	$(
		'<div id="navPanel">' +
		'<nav>' +
		$('#nav').navList() +
		'</nav>' +
		'</div>'
	)
		.appendTo($body)
		.panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'left',
			target: $body,
			visibleClass: 'navPanel-visible'
		});

})(jQuery);

// JavaScript for handling time input
document.addEventListener("DOMContentLoaded", function () {
	var hoursSelect = document.getElementById("hours");
	var minutesSelect = document.getElementById("minutes");
	var amPmSelect = document.getElementById("am_pm");

	for (var i = 1; i <= 12; i++) {
		var hourOption = document.createElement("option");
		hourOption.value = i < 10 ? "0" + i : i.toString();
		hourOption.textContent = hourOption.value;
		hoursSelect.appendChild(hourOption);
	}

	for (var j = 0; j <= 59; j++) {
		var minuteOption = document.createElement("option");
		var minuteValue = j < 10 ? "0" + j : j.toString();
		minuteOption.value = minuteValue;
		minuteOption.textContent = minuteValue;
		minutesSelect.appendChild(minuteOption);
	}
});

// PAYMENT GATEWAY AND DATABASE INSERTATION

function payWithRazorpay(amount) {
    var options = {
        key: 'YOUR_RAZORPAY_KEY',
        amount: amount * 100, // Convert amount to paisa (Razorpay expects amount in smallest currency unit)
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Purchase Description',
        image: 'https://your-company-logo.png',
        handler: function (response) {
            // Extract order ID from the response
            var order_id = response.razorpay_order_id;

            // Handle successful payment
            console.log(response);

            // Send AJAX request to insert data into database
            insertUserData(amount, order_id);
        },
        prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
            contact: '9876543210'
        },
        theme: {
            color: '#F37254'
        }
    };

    var rzp = new Razorpay(options);
    rzp.open();
}

function insertUserData(amount, order_id) {
    var formData = {
        order_id: order_id,
		amount: amount,
        name: document.getElementById('first_name').value,
        dob: document.getElementById('dob').value,
        birth_time: document.getElementById('hours').value + ':' + document.getElementById('minutes').value,
        AM_PM: document.getElementById('am_pm').value,
        birth_place: document.getElementById('birth_place').value,
        email: document.getElementById('user_email').value,
        phone_number: document.getElementById('phone_number').value,
        language: document.getElementById('language').value
    };

    // Send AJAX POST request to server to insert user data
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'insert_user_data.php'); // Replace 'insert_user_data.php' with your server-side script URL
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Data inserted successfully:', xhr.responseText);
        } else {
            console.error('Error inserting data:', xhr.statusText);
        }
    };
    xhr.send(JSON.stringify(formData));
}

// Attach click event listeners to the buttons
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.custom-submit').forEach(function (button) {
        button.addEventListener('click', function () {
            var amount = this.getAttribute('data-amount');
            document.getElementById('selected_amount').value = amount; // Set the selected amount in the hidden input field
            payWithRazorpay(amount); // Call the payWithRazorpay function with the selected amount
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.previousElementSibling.classList.add('active');
        });
        input.addEventListener('blur', function () {
            if (this.value === '') {
                this.previousElementSibling.classList.remove('active');
            }
        });
    });
});


