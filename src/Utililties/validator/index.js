import Validator from "validator";

export const validate = (fields, validationRules) => {
  let errors = {},
  isValid = true;
  validationRules.forEach((obj) => {
    const { field, validations } = obj;
    for (let i = 0; i < validations.length; i++) {
      const rule = validations[i].split(":");
      switch (rule[0]) {
        case "numeric":
          if (
            fields[field] &&
            !Validator.isEmpty("" + fields[field]) &&
            !Validator.isNumeric("" + fields[field])
          ) {
            errors[field] = `${obj.name} must be numeric.`;
            isValid = false;
            continue;
          }
          break;
        case "alpha":
          if (
            !Validator.isEmpty("" + fields[field]) &&
            !Validator.isAlpha("" + fields[field])
          ) {
            errors[field] = `${obj.name} must be alphabetic.`;
            isValid = false;
            continue;
          }
          break;
        case "alphaSpace":
          if (
            !Validator.isEmpty("" + fields[field]) &&
            !Validator.isAlpha("" + fields[field], "en-US", { ignore: "s" })
          ) {
            errors[field] = `${obj.name} must be alphabetic.`;
            isValid = false;
            continue;
          }
          break;
        case "email":
          if (
            fields[field] &&
            !Validator.isEmpty("" + fields[field]) &&
            !Validator.isEmail("" + fields[field])
          ) {
            errors[field] = `${obj.name} is not a valid email.`;
            isValid = false;
            continue;
          }
          break;
        case "digit":
          const numOfDigits = 10;
          if (
            fields[field] &&
            !Validator.isEmpty("" + fields[field]) &&
            !Validator.isLength("" + fields[field], {
              min: numOfDigits,
              max: numOfDigits,
            })
          ) {
            errors[field] = `${obj.name} must be of ${numOfDigits} digits.`;
            isValid = false;
            continue;
          }
          break;
        case "accdigit":
          const numOfaccDigits = 16;
          if (
            fields[field] &&
            !Validator.isEmpty("" + fields[field]) &&
            !Validator.isLength("" + fields[field], {
              min: 16,
              max: 16,
            })
          ) {
            errors[field] = `${obj.name} must be of ${numOfaccDigits} digits.`;
            isValid = false;
            continue;
          }
          break;
        case "cvv":
          const cvvDigits = 16;
          if (
            fields[field] &&
            !Validator.isEmpty("" + fields[field]) &&
            !Validator.isLength("" + fields[field], {
              min: 3,
              max: 4,
            })
          ) {
            errors[field] = `${obj.name} must be of ${cvvDigits} digits.`;
            isValid = false;
            continue;
          }
          break;
        case "password":
          if (!Validator.isEmpty("" + fields[field])) {
            if (
              !Validator.isLength("" + fields[field], { min: 8 }) ||
              !Validator.isLength("" + fields[field], { max: 15 })
            ) {
              errors[field] = `${obj.name} must have atleast 8-15 characters`;
              isValid = false;
              continue;
            }
          }
          break;
        case "confirm":
          if (
            !Validator.equals(
              "" + fields[field],
              "" + fields[field + "Confirm"]
            )
          ) {
            errors[field] = `${obj.name} did not match`;
            isValid = false;
            continue;
          }
          break;
        case "Expiry":
          if (Validator.isEmpty("" + fields[field])) {
            errors[field] = `${obj.name} is missing.`;
            isValid = false;
            continue;
          }
          break;
        case "alphanumeric":
          if (
            !Validator.isEmpty("" + fields[field]) &&
            !Validator.isAlphanumeric("" + fields[field])
          ) {
            errors[field] = `${obj.name} must be alpha numeric.`;
            isValid = false;
            continue;
          }
          break;
        case "required":
        default:
          if (Validator.isEmpty("" + fields[field]) && !fields[field]) {
            errors[field] = `${obj.name} is required.`;
            isValid = false;
            continue;
          }
          break;
      }
    }
  });

  return { isValid, errors };
};
