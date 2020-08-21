var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BCwHCzRr15sDFoQtgeYrYsc7AFSQqROr8L8ffE6lLBbtC4A8PhhyvTvSUaVoRG7T0p7YdqG_9e6MbRH4zNCAPJA",
   "privateKey": "fSQf67ZmMnHzPD066ijlgeafub-zCgnO3rpP9rPZXVc"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/esVXsJGawT4:APA91bG0q0RZqDUQmbdl8pJQsQAMgiEtVlbvKCwaZuvibviZNnFihCuQaLbXyC-wlvDxLDhEnMfLKW9JePHgx0TxupR2HKEVcpoWovrYRZJb8sqMkOWJPzn3Rt0nS2f268Q66wTjvizU",
    "keys": {
        "p256dh": "BJDdaDVvXA6jror4oxjw62bNdg0ZQ6eHAYef3j2TON/i+T1nj/WGd3CmhWm22dWBu5UZv9xeYgbQiNenVDaNL1o=",
        "auth": "AAXbeEAJfub/6ni/ndo9aw=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '865104131677',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);