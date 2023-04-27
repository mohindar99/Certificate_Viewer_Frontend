const validationRules = [
  {
    field: "first_name",
    validations: ["required", "alpha"],
    name: "First name",
  },
  {
    field: "last_name",
    validations: ["required"],
    name: "Last name",
  },
  {
    field: "organisation",
    validations: ["required"],
    name: "Organization name",
  },
  {
    field: "expDate",
    validations: ["required"],
    name: "Expiry date",
  },
  {
    field: "cerDate",
    validations: ["required"],
    name: "Certified date",
  },
  {
    field: "name",
    validations: ["required", "alpha"],
    name: "Issuer name",
  },
  {
    field: "companyName",
    validations: ["required", "alphaSpace"],
    name: "Company name",
  },
  {
    field: "mobileNo",
    validations: ["required", "numeric", "digit"],
    name: "Mobile number",
  },
  {
    field: "description",
    validations: ["required"],
    name: "Description",
  },
  {
    field: "criteria",
    validations: ["required"],
    name: "Criteria",
  },
  {
    field: "skill",
    validations: ["required"],
    name: "Skills",
  },
  {
    field: "issuer",
    validations: ["required"],
    name: "Issuer",
  },
  {
    field: "badgegraphic",
    validations: ["required"],
    name: "Badge graphic",
  },
  {
    field: "recipientname",
    validations: ["required"],
    name: "Recipient name",
  },
  {
    field: "recipientid",
    validations: ["required"],
    name: "Recipient Id",
  },
  {
    field: "badgename",
    validations: ["required"],
    name: "Badge name",
  },
  {
    field: "email",
    validations: ["required", "email"],
    name: "Email",
  },
  {
    field: "password",
    validations: ["required", "password"],
    name: "Password",
  },
  {
    field: "new_password",
    validations: ["required", "password"],
    name: "New password",
  },
  {
    field: "confirm_password",
    validations: ["required", "confirm"],
    name: "Confirm password",
  },
  {
    field: "nameReci",
    validations: ["required", "alphaSpace"],
    name: "Name",
  },
  {
    field: "company",
    validations: ["required", "alphaSpace"],
    name: "Company",
  },
  {
    field: "addressOne",
    validations: [],
    name: "Address 1",
  },
  {
    field: "addressTwo",
    validations: [],
    name: "Address 2",
  },
  {
    field: "country",
    validations: ["required", "alphaSpace"],
    name: "Country",
  },
  {
    field: "state",
    validations: ["required", "alphaSpace"],
    name: "State",
  },
  {
    field: "city",
    validations: ["required", "alphaSpace"],
    name: "City",
  },
  {
    field: "zipCode",
    validations: ["required"],
    name: "zipCode",
  },
];
export default validationRules;
