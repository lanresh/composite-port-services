const postmark = require('postmark');

const client = new postmark.ServerClient("b89e530c-2964-4d71-89b8-897e8cfd0fe9");

const emailDetails = {
    "From": "admin@quaysoft.com",
    "To": "admin@quaysoft.com",
    "TemplateId": 36142495,
    "TemplateAlias": "report-creation",
    "TemplateModel": {
        "report_title": "Report Created",
        "report_link": "http://compositepropertydevelopment.com/"
  },
  "TrackOpens": true
};

client.sendEmailWithTemplate(emailDetails, (error, result) => {
  if (error) {
    console.log("Unable to send via postmark: " + error.message);
    return;
  }
  console.log("email sent");
});