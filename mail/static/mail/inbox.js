document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');

  // Send JSON
    document.querySelector('#send_mail').addEventListener('click', send_data);
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#iball').style.display = 'none';
  document.querySelector('#reply_view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#iball').style.display = 'initial';
  document.querySelector('#reply_view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  document.querySelector('#iball').innerHTML = '';
  if (mailbox == 'inbox') {
  //List all emails
  fetch('/emails/inbox', {method: 'GET'})
  .then(function(response) {
    return response.json();
    })
  .then(response => {
  
  let all_mails = response;
  let count_elements = response.length;

  for (i = 0; i < count_elements; i++) {
  var inbox = all_mails[i];
  //Generate bootrstrap card

        //Card container 
        var card = document.createElement('div');
        card.className = "card";
        if (inbox.read == true) {
          card.style.backgroundColor = "#D9D9D9";
        }
        //Card header
        var card_header = document.createElement('div');
        card_header.className = "card_header";
        card.appendChild(card_header);
        var sender = document.createTextNode(inbox.timestamp);
        card_header.appendChild(sender);
        //Card body
        var card_body = document.createElement('div');
        card_body.className = "card-body";
        card.appendChild(card_body);
        //title
        var h5_title = document.createElement('h5');
        h5_title.className = "card-title";
        card_body.appendChild(h5_title); 
        var card_title = document.createTextNode(inbox.sender);
        h5_title.appendChild(card_title);
        //card text
        var card_text = document.createElement('div');
        card_body.appendChild(card_text);
        var card_txt = document.createTextNode(inbox.subject);
        card_text.appendChild(card_txt);
        //Reply btn
        var btn_reply = document.createElement('a');
        btn_reply.className = "btn btn-primary";
        btn_reply.setAttribute("id", inbox.id);
        btn_reply.setAttribute('onclick', "reply_mail("+ inbox.id +")");
        card_body.appendChild(btn_reply);
        var btn_txt = document.createTextNode("View Mail");
        btn_reply.appendChild(btn_txt);
        // Archive btn
        var btn_archive = document.createElement('a');
        btn_archive.className = "btn btn-secondary";
        card_body.appendChild(btn_archive);
        btn_archive.setAttribute('onclick', "archive("+ inbox.id +")");
        var btn_2_txt = document.createTextNode("Archive");
        btn_archive.appendChild(btn_2_txt);



  var element = document.querySelector('.inbox_all');
  element.appendChild(card)
  }
  //
  });
  }
  else if (mailbox == 'sent') {
  // List Sent Emails
  fetch('/emails/sent', {method: 'GET'})
  .then(function(response) {
    return response.json();
    })
  .then(response => {
  
  let all_mails = response;
  let count_elements = response.length;

  for (i = 0; i < count_elements; i++) {
  var inbox = all_mails[i];
  //Generate bootrstrap card

        //Card container 
        var card = document.createElement('div');
        card.className = "card";
        //Card header
        var card_header = document.createElement('div');
        card_header.className = "card_header";
        card.appendChild(card_header);
        var sender = document.createTextNode(inbox.timestamp);
        card_header.appendChild(sender);
        //Card body
        var card_body = document.createElement('div');
        card_body.className = "card-body";
        card.appendChild(card_body);
        //title
        var h5_title = document.createElement('h5');
        h5_title.className = "card-title";
        card_body.appendChild(h5_title); 
        var card_title = document.createTextNode(`to: ${inbox.recipients}`);
        h5_title.appendChild(card_title);
        //card text
        var card_text = document.createElement('div');
        card_body.appendChild(card_text);
        var card_txt = document.createTextNode(inbox.subject);
        card_text.appendChild(card_txt);
        //Reply btn
        var btn_reply = document.createElement('a');
        btn_reply.className = "btn btn-primary";
        btn_reply.setAttribute("id", inbox.id);
        btn_reply.setAttribute('onclick', "reply_mail("+ inbox.id +")");
        card_body.appendChild(btn_reply);
        var btn_txt = document.createTextNode("View Mail");
        btn_reply.appendChild(btn_txt);
        //



  var element = document.querySelector('.inbox_all');
  element.appendChild(card)
  }
  //
  });
  }
  else if (mailbox == 'archive') {
  // List archived Emails
  fetch('/emails/archive', {method: 'GET'})
  .then(function(response) {
    return response.json();
    })
  .then(response => {
  
  let all_mails = response;
  let count_elements = response.length;

  for (i = 0; i < count_elements; i++) {
  var inbox = all_mails[i];
  //Generate bootrstrap card

        //Card container 
        var card = document.createElement('div');
        card.className = "card";
        //Card header
        var card_header = document.createElement('div');
        card_header.className = "card_header";
        card.appendChild(card_header);
        var sender = document.createTextNode(inbox.timestamp);
        card_header.appendChild(sender);
        //Card body
        var card_body = document.createElement('div');
        card_body.className = "card-body";
        card.appendChild(card_body);
        //title
        var h5_title = document.createElement('h5');
        h5_title.className = "card-title";
        card_body.appendChild(h5_title); 
        var card_title = document.createTextNode(inbox.sender);
        h5_title.appendChild(card_title);
        //card text
        var card_text = document.createElement('div');
        card_body.appendChild(card_text);
        var card_txt = document.createTextNode(inbox.subject);
        card_text.appendChild(card_txt);
        //Reply btn
        var btn_reply = document.createElement('a');
        btn_reply.className = "btn btn-primary";
        btn_reply.setAttribute("id", inbox.id);
        btn_reply.setAttribute('onclick', "reply_mail("+ inbox.id +")");
        card_body.appendChild(btn_reply);
        var btn_txt = document.createTextNode("View Mail");
        btn_reply.appendChild(btn_txt);
        // Unarchive btn
        var btn_archive = document.createElement('a');
        btn_archive.className = "btn btn-secondary";
        card_body.appendChild(btn_archive);
        btn_archive.setAttribute('onclick', "unarchive("+ inbox.id +")");
        var btn_2_txt = document.createTextNode("Unarchive");
        btn_archive.appendChild(btn_2_txt);

  var element = document.querySelector('.inbox_all');
  element.appendChild(card)
  }
  //
  });
  };
}

function send_data() {
  // Send a POST request with JSON data
  var recipients = document.getElementById('compose-recipients').value;
  var subject = document.getElementById('compose-subject').value;
  var body = document.getElementById('compose-body').value;
  var json_str = {
    recipients: recipients,
    subject: subject,
    body: body
  };

  fetch('/emails', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type' : 'application/json;charset=utf-8'
  }, 
  body: JSON.stringify(json_str),
  })
  .then(response => response.json())
  .then(response => console.log('Success:', response));
  
  //
}

function reply_mail(get_id) {

          document.querySelector('#emails-view').style.display = 'none';
          document.querySelector('#iball').style.display = 'none';
          document.querySelector('#reply_view').style.display = 'none';
          //view email
          fetch(`/emails/${get_id}`, {method: 'GET'})
          .then(function(response){
            return response.json();
          })
          .then(response => {
            
            let sender = response.sender;
            document.querySelector('#reply_view').style.display = 'initial';
            document.querySelector('#sender').innerHTML = response.sender;
            document.querySelector('#subject').innerHTML = `Subject: ${response.subject}`;
            document.querySelector('#recipients').innerHTML = `Recipients: ${response.recipients}`;
            document.querySelector('#timestamp').innerHTML = `Time: ${response.timestamp}`;
            document.querySelector('#body').innerHTML = response.body;
            document.querySelector('#changeonreply').innerHTML = "View Email";
            console.log(response)

            });
          // Read email
          fetch(`/emails/${get_id}`, {method: 'PUT',
            body: JSON.stringify({
              read: true
            })
          });
          // Reply email
          fetch(`/emails/${get_id}`, {method: 'GET'})
          .then(function(response){
            return response.json();
          })
          .then(response => {document.getElementById('prefill_mail').addEventListener("click", () => {
            document.querySelector('#reply_view').style.display = 'none';
            reply(response);
          })
        });
          

}

function reply(response) {
  console.log(response);
  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#iball').style.display = 'none';
  document.querySelector('#reply_view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Fill composition fields
  document.querySelector('#compose-recipients').value = response.sender;
  document.querySelector('#compose-subject').value = `Re: ${response.subject}`;
  document.querySelector('#compose-body').value = `On ${response.timestamp} ${response.sender} Wrote: 
  ${response.body}
  Your reply:`;
}

function archive(get_id) {
  fetch(`/emails/${get_id}`, {
    method: 'PUT',
    body: JSON.stringify({archived: true})
  });
  document.querySelector('#iball').innerHTML = '';
  load_mailbox('inbox');
}

function unarchive(get_id) {
  fetch(`/emails/${get_id}`,{
    method: 'PUT',
    body: JSON.stringify({archived: false})
  });
  document.querySelector('#iball').innerHTML = '';
  load_mailbox('inbox');
}
