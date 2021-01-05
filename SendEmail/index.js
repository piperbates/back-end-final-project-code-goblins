const { sendEmail } = require("./sendEmail");
var emailToSend = {
  from: "piperbates42@gmail.com", //Anonymous / use goblin email address
  to: "piperbates42@gmail.com", //Goes to SOC inbox or pick the coach you want it to go to and it autofills their email
  subject: "New feedback on your lecture", //Leave as is
  text: "That was easy!", //Taken from the user form
};
sendEmail(emailToSend);
