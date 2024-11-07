import { Tenant } from "@/interfaces/tenants.interface";

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
          "report_link": "https://main.d1mvra5i7l3l24.amplifyapp.com/login"
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

export async function sendUserEmail(email: string[], templateId: number, body: string, subject: string) {
  const toAddresses = Array.isArray(email) ? email.join(",") : email;

  const emailDetails = {
      "From": "admin@quaysoft.com",
      "To": toAddresses,
      "TemplateId": templateId,
      "TemplateAlias": "account-creation",
      "TemplateModel": {
          "subject": subject,
          "body": body,
          "report_link": "https://main.d1mvra5i7l3l24.amplifyapp.com/login"
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

export async function sendTenantEmail(tenantData: Tenant, due_date: string) {

  // Assuming tenantData and due_date are already defined
const templateModel = {
  name: tenantData.full_name,
  annual_cost: 0,
  facility_fee: 0,
  diesel_fee: 0,
  electricity_fee: 0,
  other_fee: 0,
  due_date: due_date,
};

// Iterate over the fees array and update the TemplateModel
tenantData.fees.forEach(fee => {
  switch (fee.type) {
    case "annual_cost":
      templateModel.annual_cost = fee.value;
      break;
    case "facility_fee":
      templateModel.facility_fee = fee.value;
      break;
    case "diesel_fee":
      templateModel.diesel_fee = fee.value;
      break;
    case "electricity":
      templateModel.electricity_fee = fee.value;
      break;
    case "other_fee":
      templateModel.other_fee = fee.value;
      break;
    default:
      // Handle any unexpected fee types if necessary
      break;
  }
});


  const emailDetails = {
      "From": "admin@quaysoft.com",
      "To": tenantData.email,
      "TemplateId": 37108876,
      "TemplateAlias": "account-creation",
      "TemplateModel": {
          "name": tenantData.full_name,
          "annual_cost": templateModel.annual_cost,
          "facility_fee": templateModel.facility_fee,
          "diesel_fee": templateModel.diesel_fee,
          "electricity_fee": templateModel.electricity_fee,
          "other_fee": templateModel.other_fee,
          "due_date": due_date
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
          "report_link": "https://main.d1mvra5i7l3l24.amplifyapp.com/login"
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
