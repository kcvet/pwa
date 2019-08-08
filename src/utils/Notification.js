export default function notifyMe(msg, notify) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support system notifications");
      // This is not how you would really do things if they aren't supported. :)
    }
  
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification(msg);
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification(msg);
        }
      });
    } else if (Notification.permission === 'denied') {
        notify()
    }
  
    // Finally, if the user has denied notifications and you 
    // want to be respectful there is no need to bother them any more.
  }
  
