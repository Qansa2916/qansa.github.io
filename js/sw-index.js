//Check Service Worker
      if(!('serviceWorker' in navigator)){
            console.log("Browser not supported Service Worker");
            
        }else{
            registerServiceWorker();
            requestPermission();
        }
        //Register Service Worker
        function registerServiceWorker(){
            return navigator.serviceWorker.register('/service-worker.js')
            .then(function(registration){
                console.log('Registration SW DONE!');
                return registration;
                
            })
            .catch(function(err){
                console.error('Registration SW FAILED.', err);
            });
        }
    function requestPermission(){
        if('Notification' in window){
            Notification.requestPermission().then(function(result){
                if(result === "denied"){
                    console.log("Notification NOT Allowed.");
                    return;
                    
                }else if(result === "default"){
                    console.error("User close the dialog box.");
                    return;
                }
                if (('PushManager' in window)) {
                    navigator.serviceWorker.getRegistration().then(function(registration) {
                        registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array("BCwHCzRr15sDFoQtgeYrYsc7AFSQqROr8L8ffE6lLBbtC4A8PhhyvTvSUaVoRG7T0p7YdqG_9e6MbRH4zNCAPJA")
                        }).then(function(subscribe) {
                            console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                            console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('p256dh')))));
                            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('auth')))));
                        }).catch(function(e) {
                            console.error('Tidak dapat melakukan subscribe ', e.message);
                        });
                    });
                }
            });
        }
    }

  // REQUEST API UNTUK PERTAMA KALI
  document.addEventListener("DOMContentLoaded", function() {
    getTeams();
  });
  function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}