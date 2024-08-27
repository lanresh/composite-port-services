const postmark = require('postmark');

const client = new postmark.ServerClient("b89e530c-2964-4d71-89b8-897e8cfd0fe9");

export async function sendWelcomeEmail(email: string, templateId: number, name: string, password: string) {
  // const toAddresses = Array.isArray(email) ? email.join(",") : email;

  const emailDetails = {
      "From": "admin@quaysoft.com",
      "To": email,
      "TemplateId": templateId,
      "TemplateAlias": "account-creation",
      "TemplateModel": {
          "name": name,
          "email": email,
          "password": password,
          "report_link": "http://compositepropertydevelopment.com/login"
    },
    "TrackOpens": true
  };
  
  await client.sendEmailWithTemplate(emailDetails, (error, result) => {
    if (error) {
      console.log("Unable to send via postmark: " + error.message);
      return;
    }
    console.log("email sent");
  });
}

export default async function sendEmail(email: string[], templateId: number, staff_name: string, project_name: string) {
  const toAddresses = Array.isArray(email) ? email.join(",") : email;

  const emailDetails = {
      "From": "admin@quaysoft.com",
      "To": toAddresses,
      "TemplateId": templateId,
      "TemplateAlias": "report-creation",
      "TemplateModel": {
          "staff_name": staff_name,
          "project_name": project_name,
          "report_link": "http://compositepropertydevelopment.com/login"
    },
    "TrackOpens": true
  };
  
  await client.sendEmailWithTemplate(emailDetails, (error, result) => {
    if (error) {
      console.log("Unable to send via postmark: " + error.message);
      return;
    }
    console.log("email sent");
  });
}



  // const emailDetails = {
  //     "From": "admin@quaysoft.com",
  //     "To": "timmyadet@gmail.com, lanreshittu16@gmail.com",
  //     "TemplateId": 36142495,
  //     "TemplateAlias": "report-creation",
  //     "TemplateModel": {
  //         "report_title": "Report Created",
  //         "report_link": "http://compositepropertydevelopment.com/"
  //   },
  //   "TrackOpens": true
  // };
  
  // client.sendEmailWithTemplate(emailDetails, (error, result) => {
  //   if (error) {
  //     console.log("Unable to send via postmark: " + error.message);
  //     return;
  //   }
  //   console.log("email sent");
  // });
