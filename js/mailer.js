let nameField = document.querySelector('#name');
let emailField = document.querySelector('#email');
let subjectField = document.querySelector('#subject');
let messageField = document.querySelector('#message');
let sendBtn = document.querySelector('#sendBtn');
let reset = true;

nameField.addEventListener('blur', e => {
  ValidateField(nameField);

  if(!reset) {
    sendBtn.classList.remove('s-bg-green');
    sendBtn.classList.remove('s-bg-red');
    sendBtn.classList.add('s-bg-black');
    sendBtn.innerHTML = `Message Sent <span><i class="fas fa-check"></i></span>`;

    reset = true;
  }
})

emailField.addEventListener('blur', e => {
  let isValid = ValidateEmail(emailField.value);
  
  if(isValid) {
    emailField.classList.remove('s-txt-red');
    emailField.classList.add('s-txt-green');
  } else {
    emailField.classList.remove('s-txt-green');
    emailField.classList.add('s-txt-red');
  }
})

subjectField.addEventListener('blur', e => {
  ValidateField(subjectField);
})

messageField.addEventListener('blur', e => {
  ValidateField(messageField);
})

function sendEmail() {

  sendBtn.classList.remove('s-bg-green');
  sendBtn.classList.remove('s-bg-red');
  sendBtn.classList.remove('s-bg-black');
  sendBtn.classList.add('s-bg-light-blue');
  sendBtn.innerHTML = `Sending... <span><i class="fas fa-spinner"></i></span>`;

  let name = document.querySelector('#name').value;
  let email = document.querySelector('#email').value;
  let subject = document.querySelector('#subject').value;
  let message = document.querySelector('#message').value;

  let validEmail = ValidateEmail(email);

  if(validEmail) {
    if(name && subject && message) {

      Email.send({
        Host: "smtp.gmail.com",
        Username : "dopesoulforwarder@gmail.com",
        Password : "dopeSoulisDope221",
        To : 'ted.bundymav21@gmail.com',
        From : "dopesoulforwarder@gmail.com",
        Subject : `${subject}`,
        Body : `
        You received a new message from your contact form. <br />
        <br />
        Name: ${name} <br />
        <br />
        Email: ${email} <br />
        <br />
        Subject: ${subject} <br />
        <br />
        Message: ${message}`
        })
        .then(
          message => {
            
            sendBtn.classList.remove('s-bg-light-blue');
            sendBtn.classList.add('s-bg-green');
            sendBtn.innerHTML = `Message Sent <span><i class="fas fa-check"></i></span>`;

            reset = false;
        })
        .catch(error => {
          sendBtn.classList.remove('s-bg-light-blue');
          sendBtn.classList.add('s-bg-red');
          sendBtn.innerHTML = `Message Not Sent <span><i class="fas fa-times-circle"></i></span>`;

          reset = false;
        })
    } else {
      return true;
    }
  } else {
    return true;
  }
}


function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return true;
  }
    return false;
}

function ValidateField(field) {
  let isValid = field.value.length > 0 && typeof(field.value) == 'string' ? true : false;
  
  if(isValid) {
    field.classList.remove('s-txt-red');
    field.classList.add('s-txt-green');
  } else {
    field.classList.remove('s-txt-green');
    field.classList.add('s-txt-red');
  }
}

