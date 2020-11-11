var filterLabels = [
  'inbox'
]

var ageLimit = 90;

function deleteOldMessages()
{
  let age = new Date();
  age.setDate(age.getDate() - ageLimit);
  let purgeTime = Utilities.formatDate(age, Session.getScriptTimeZone(), "yyyy-MM-dd");
  
  filterLabels.forEach(function(label, index) {
    let searchQuery = "label: " + label + " before: " + purgeTime;
    try {
      var threads = GmailApp.search(searchQuery, 0, 100);
      for (let i = 0; i < threads.length; i++) {
        let messages = GmailApp.getMessagesForThread(threads[i]);
        for (let j = 0; j < messages.length; j++)  {
          let email = messages[j];
          if(email.getDate() < age){
            email.moveToTrash();
          }
        }
      }
    } catch(e) {}
  });
}


