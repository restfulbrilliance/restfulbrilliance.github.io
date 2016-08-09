$(function() {

	// Get the form.
	var form = $('#contactForm');

	// Get the messages div.
	var formNotifications = $('#form-messages');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		var formAsObject = {};
		var formAsArray = $(form).serializeArray();
		$.each(formAsArray, function () {
		    if (formAsObject[this.name]) {
		        if (!formAsObject[this.name].push) {
		            formAsObject[this.name] = [o[this.name]];
		        }
		        formAsObject[this.name].push(this.value || '');
		    } else {
		        formAsObject[this.name] = this.value || '';
		    }
		});

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formAsObject,
            dataType: 'json'
		})
		.done(function(response) {
			// Make sure that the formNotifications div has the 'success' class.
			$(formNotifications).removeClass('errorMsg');
			$(formNotifications).addClass('successMsg');

			// Set the message text.
			$(formNotifications).text("Thanks for reaching out to us! You'll hear back from us shortly.");

			// Clear the form.
			$('#contactForm input[type=text]').val('');
			$('#contactForm input[type=email]').val('');
			$('#contactForm input[type=url]').val('');
			$('#contactForm textarea').val('');
		})
		.fail(function(data) {
			// Make sure that the formNotifications div has the 'error' class.
			$(formNotifications).removeClass('successMsg');
			$(formNotifications).addClass('errorMsg');

			//// Set the message text.
			//if (data.responseText !== '') {
			//	$(formNotifications).text(data.responseText);
			//} else {
				$(formNotifications).text('Oops! An error occured and your message could not be sent.');
			//}
		});

	});

});
