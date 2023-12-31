import * as yup from "yup";

const formValidationSchema = (existingEmployees, currentEmployeeId) => {
  const isDuplicateEmail = value => {
    const duplicateEmail = existingEmployees.some(
      employee => employee.email === value && employee.id !== currentEmployeeId
    );
    return !duplicateEmail;
  };

  return yup.object().shape({
    firstName: yup
      .string()
      .trim()
      .max(255, "The maximum number of characters is 255")
      .required("Required"),
    surname: yup
      .string()
      .trim()
      .max(255, "The maximum number of characters is 255")
      .required("Required"),
    email: yup
      .string()
      .trim()
      .max(255, "The maximum number of characters is 255")
      .email("Invalid email address")
      .test("duplicate-email", "Duplicate email found", isDuplicateEmail)
      .required("Required"),
    birthDate: yup
      .string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format YYYY-MM-DD")
      .required("Required"),
    status: yup
      .string()
      .oneOf(["ACTIVE", "LEAVE_OF_ABSENCE", "TERMINATED"], "Invalid status")
      .required("Required"),
    jobTitle: yup
      .string()
      .trim()
      .matches(/^[A-Za-z ]*$/, "Only text characters are allowed")
      .max(255, "The maximum number of characters is 255")
      .required("Required"),
  });
};

export default formValidationSchema;
