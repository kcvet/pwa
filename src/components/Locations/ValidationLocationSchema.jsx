import * as Yup from "yup";
/*eslint no-useless-escape: "off"*/

const expression = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

export default Yup.object().shape({
  name: Yup.string()
    .required("Required"),
  address: Yup.object().shape({
    city: Yup.string()
      .required("Required"),
    address1: Yup.string()
      .required("Required"),
    zipCode: Yup.number()
      .min(0, "Zipcode cannot be a negative number")
      .required("Required"),
    country: Yup.string()
      .matches(/^[a-zA-Z]+$/, "Must only contains letters")
      .required("Required"),
  }),
  geoLocation: Yup.object().shape({
    lng: Yup.number()
      .required("Required"),
    lat: Yup.number()
      .required("Required"),
  }),
  mainImageResource: Yup.object().shape({
    title: Yup.string()
      .required("Required"),
    href: Yup.string()
      .matches(expression, "Not a valid url!")
      .required("Required"),
  }),
  additionalImageResources: Yup.array().of(Yup.object().shape({
    title: Yup.string()
      .required("Reqired"),
    href: Yup.string()
      .matches(expression, "Not a valid url!")
      .required("Required"),
  })),
});
