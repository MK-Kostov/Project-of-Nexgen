import { useEffect, useState } from "react";
import { Service } from "../service/Service";

export const Main = () => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    imageUrl: "",
    country: "",
    city: "",
    street: "",
    streetNumber: "",
    message: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: JSON.stringify({
          setValues,
        }),
      });
      let resJson = await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (e) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  const minLength = (e, bound) => {
    setErrors((state) => ({
      ...state,
      [e.target.name]: values[e.target.name].length < bound,
    }));
  };

  const isPositive = (e) => {
    let number = Number(e.target.value);

    setErrors((state) => ({
      ...state,
      [e.target.name]: number < 0,
    }));
  };

  const isFormValid = !Object.values(errors).some((x) => x);

  return (
    <div className="form">
      <form onSubmit={submitHandler} id="action-submit">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First name</label>
            <div className="input-wrapper">
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Mihail"
                value={values.firstName}
                onChange={changeHandler}
                onBlur={(e) => minLength(e, 3)}
              />
            </div>
            {errors.firstName && (
              <p className="form-error">
                First name should be at least 3 characters long!
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last name</label>
            <div className="input-wrapper">
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Kostov"
                value={values.lastName}
                onChange={changeHandler}
                onBlur={(e) => minLength(e, 3)}
              />
            </div>
            {errors.lastName && (
              <p className="form-error">
                Last name should be at least 3 characters long!
              </p>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                id="email"
                name="email"
                type="text"
                placeholder="mishoka.kostov@gmail.com"
                value={values.email}
                onChange={changeHandler}
                onBlur={(e) => minLength(e, 5)}
              />
            </div>
            {errors.email && <p className="form-error">Email is not valid!</p>}
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone number</label>
            <div className="input-wrapper">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="0 359 888 60 10 84"
                value={values.phoneNumber}
                onChange={changeHandler}
                onBlur={(e) => minLength(e, 6)}
              />
            </div>
            {errors.phoneNumber && (
              <p className="form-error">Phone number is not valid!</p>
            )}
          </div>
        </div>

        <div className="form-image">
          <label className="label" htmlFor="imageUrl">
            Image Url
          </label>
          <div className="input-wrapper">
            <input
              id="imageUrl"
              name="imageUrl"
              type="text"
              placeholder="https://"
              value={values.imageUrl}
              onChange={changeHandler}
              onBlur={(e) => minLength(e, 5)}
            />
          </div>
          {errors.imageUrl && (
            <p className="form-error">ImageUrl is not valid!</p>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <div className="input-wrapper">
              <input
                id="country"
                name="country"
                type="text"
                value={values.country}
                placeholder="Bulgaria"
                onChange={changeHandler}
                onBlur={(e) => minLength(e, 2)}
              />
            </div>
            {errors.country && (
              <p className="form-error">
                Country should be at least 2 characters long!
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <div className="input-wrapper">
              <span>
                <i className="fa-solid fa-city"></i>
              </span>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="Burgas"
                value={values.city}
                onChange={changeHandler}
                onBlur={(e) => minLength(e, 3)}
              />
            </div>
            {errors.city && (
              <p className="form-error">
                City should be at least 3 characters long!
              </p>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="street">Street</label>
            <div className="input-wrapper">
              <input
                id="street"
                name="street"
                type="text"
                value={values.street}
                onChange={changeHandler}
                onBlur={(e) => minLength(e, 3)}
              />
            </div>
            {errors.street && (
              <p className="form-error">
                Street should be at least 3 characters long!
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="streetNumber">Street number</label>
            <div className="input-wrapper">
              <input
                id="streetNumber"
                name="streetNumber"
                type="text"
                value={values.streetNumber}
                onChange={changeHandler}
                onBlur={isPositive}
              />
            </div>
            {errors.streetNumber && (
              <p className="form-error">
                Street number should be a positive number!
              </p>
            )}
          </div>
        </div>
        <div className="form-message">
          <label htmlFor="message">Message</label>
          <div className="input-wrapper">
            <textarea
              name="message"
              type="text"
              value={values.message}
              onChange={changeHandler}
              onBlur={(e) => minLength(e, 3)}
              cols="30"
              rows="10"
            ></textarea>
          </div>
          {errors.message && (
            <p className="form-error">
              Message should be at least 3 characters long!
            </p>
          )}
        </div>
        <div id="form-actions">
          <input
            form="action-submit"
            className="btn"
            type="submit"
            disabled={!isFormValid}
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};
