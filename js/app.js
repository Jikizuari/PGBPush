// GCM sender id; obtainable in your own Google APIS thingy
var gcm_sender_id = "149469167081";

var application = {

	/*
	 FUNC : Processing the devicetoken
	 */
	 process_notification: function(data_parameters) {
		$.ajax( {
		 url      : "http://www.oosterlicht.nl/mobile_app.ajax.php?callback=?",
		 type     : "GET",
		 async    : false,
		 data     : data_parameters,
		 dataType : "jsonp"
	 } );
	},
};
/* ****************************************** Push notifications ****************************************** */
var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	bindEvents: function() {
		document.addEventListener( 'deviceready', this.onDeviceReady, false );
	},
	// Deviceready Event Handler
	onDeviceReady: function() {
		app.receivedEvent( 'deviceready' );
	},
	// Token handler ( this will come in handy for iOS )
	tokenHandler:function( token ) {
		alert( 'Token Handler ' + token );
	},
	// Error handler
	errorHandler:function( error ) {
		alert( 'Error handler ' + error );
	},
	// Success handler, result contains any message sent from the plugin call
	successHandler: function( result ) {
		alert( 'Success handler ' + result );
	},
	// Recieved event; updates DOM
	receivedEvent: function( id ) {
		var pushNotification = window.plugins.pushNotification;
		
		if ( device.platform == 'android' || device.platform == 'Android' ) {
			pushNotification.register( 	
				this.successHandler, 
				this.errorHandler, 
				{ 	
					"senderID"	: gcm_sender_id,
					"ecb"		: "app.onNotificationGCM"
				}
			);
		}
		console.log( 'Received event ' + id );
	},
	// Android push notifications
	onNotificationGCM: function( e ) {
		switch( e.event )
		{
			case 'registered':
			if ( e.regid.length > 0 )
				{
					alert('registration id = '+e.regid);
					application.process_notification( {
						push      : 'update',
						type      : 'android',
						device_id : e.regid,
						klas      : 'test',
						locatie   : 'test',
					} );
				}
				break;

			case 'message':
				alert( e.message );
				break;

			case 'error':
				alert( 'GCM error = ' + e.msg );
				break;

			default:
				alert( 'An unknown GCM event has occurred' );
				break;
		}
	}
};
/* **************************************** End push notifications **************************************** */

// Check if we're in a browser, if not we're in a PhoneGap application
var is_phonegap_app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;

// Only initialize if you're in a PhoneGap application
if ( is_phonegap_app )
	app.initialize();