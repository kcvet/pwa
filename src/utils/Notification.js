export default function notifyMe(msg, notify) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support system notifications");
      // This is not how you would really do things if they aren't supported. :)
    }
  
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        var options = {
          body: 'Here is a notification body!',
          icon: 'images/example.png',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          }
        };
        reg.showNotification(msg, options);
      });
      // If it's okay let's create a notification
      // const notification =  Notification(msg);
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          navigator.serviceWorker.getRegistration().then(function(reg) {
            var options = {
              body: 'Here is a notification body!',
              icon: 'images/example.png',
              vibrate: [100, 50, 100],
              data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
              }
            };
            reg.showNotification(msg, options);
          });
        }
      });
    } else {
        notify(msg)
    }
  
    // Finally, if the user has denied notifications and you 
    // want to be respectful there is no need to bother them any more.
  }
  
