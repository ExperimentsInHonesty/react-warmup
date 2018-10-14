const validateFieldsForLength = (value, min, max) => {
  return {
    validStatus: value.length >= min && value.length <= max,
    notValidMessage: `must have at least ${min} and no more than ${max} characters`
  };
};
const validateFieldNumberOnly = value => {
  console.log("validateFieldNumberOnly", value);
  console.log("parseInt", parseInt(value));
  console.log(parseInt(value) === value);
  return {
    // validStatus: typeof parseInt(value) === "number" ? true : false,
    validStatus:
      Number.isInteger(parseInt(value)) && parseInt(value) > -1 ? true : false,
    notValidMessage: `This field is not required.  If provided it must be a number greater than -1`
  };
};
const validateFieldForUrl = (value, min) => {
  return {
    validStatus:
      value.match(/https?:\/\//) && value.length >= min ? true : false,
    notValidMessage: `must start with http: or https: and have a valid domain and image name with extention`
  };
};
const validateFieldForSkills = (value, min) => {
  return {
    validStatus: value.length >= min && value.match(/[,]/g) ? true : false,
    notValidMessage: `Skills should be one word (or hyphenated e.g., baking-deserts) and seperated by commas`
  };
};
const validateAllFields = (typeOfItem, valueOfItem) => {
  console.log("validateAllFields", typeOfItem);
  const minNumber = 2;
  const minNumforImage = 17;
  const title = 120;
  const bio = 700;
  const summary = 255;
  const headline = 80;
  const slug = 100;
  let maxNumber = 0;

  if (typeOfItem === "inputTitle") {
    maxNumber = title;
  } else if (typeOfItem === "inputBio") {
    maxNumber = bio;
  } else if (typeOfItem === "inputSummary") {
    maxNumber = summary;
  } else if (typeOfItem === "inputHeadline") {
    maxNumber = headline;
  } else if (typeOfItem === "inputSlug") {
    maxNumber = slug;
  } else if (typeOfItem === "inputImage") {
    return validateFieldForUrl(valueOfItem, minNumforImage);
  } else if (typeOfItem === "inputStatusId") {
    return validateFieldNumberOnly(valueOfItem);
  } else if (typeOfItem === "inputSkills") {
    return validateFieldForSkills(valueOfItem, minNumber);
  } else {
    return {
      validStatus: true,
      notValidMessage: ""
    };
  }
  return validateFieldsForLength(valueOfItem, minNumber, maxNumber);
};

export default validateAllFields;
