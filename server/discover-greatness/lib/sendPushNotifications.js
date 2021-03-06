'use strict';

const config = require('config');
const gcm = require('node-gcm');

const sendPushNotifications = function(registrationToken, restaurantData){
  // Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
  const sender = new gcm.Sender("AAAAABsy6qE:APA91bEy0uEDjKw5UKSsY159CHnJbhIvDPWejuWV5hxBMMbKnt8VwLAi75WPf3F9tiveh384UMsvLELJmAWwlQYUL8BeVkTaYE62ulxEWU1HTc_eLF-gM2yShH0zZHhfniR5KIcXqpFH");
  // Prepare a message to be sent

  var message = new gcm.Message({
      collapseKey: 'demo',
      priority: 'high',
      contentAvailable: true,
      delayWhileIdle: true,
      timeToLive: 3,
      senttime_: "now",
      dryRun: false,
      name: restaurantData.name,
      address: restaurantData.address,
      offerMessage: restaurantData.offerMessage,
      expirationMessage: restaurantData.expirationMessage,
      title: "New Rewards"
  });

  // Specify which registration IDs to deliver the message to
  const regTokens = [];
  regTokens.push(registrationToken);

  sender.send(message, { registrationTokens: regTokens }, function(err, response) {
        if(err) {
            console.error(err);
        } else {
            console.log(response);
        }
  });

}
module.exports = sendPushNotifications;

