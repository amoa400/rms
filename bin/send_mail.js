var mail = require('nodemailer');
var fantview = require('../lib/fantview');

var transport = mail.createTransport('SMTP', {
  host: C('mail').host,
  port: C('mail').port,
  domains: [C('mail').domain],
  secureConnection: true,
  requiresAuth: true,
  auth:{
    user: C('mail').user,
    pass: C('mail').pass
  }
});

D('mail').r({_id: process.argv[2]}, null, null, function(err, doc) {
  if (err) {
    process.exit(0);
    return;
  }
  var data = {
    from: C('mail').name + ' <' + C('mail').user + '>',
    to: doc.to,
    subject: doc.subject,
    html: doc.html
  }
  transport.sendMail(data, function(err, res) {
    D('mail').d({_id: process.argv[2]});
    process.exit(0);
  });
});



