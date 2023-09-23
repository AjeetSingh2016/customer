import axios from "axios";

export const postRegister = (formData) => {
  console.log(formData);
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post("/user/register", formData, config);
      window.location.href = "/home";
      console.log(response.data);
      localStorage.setItem("userData", JSON.stringify(response));
    } catch (error) {
      console.log(error);
    }
  };
};

export const postLogin = (formData) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(config);
    try {
      const response = await axios.post("/user/login", formData);

      window.location.href = "/home";
      console.log(response.data);
      localStorage.setItem("userData", JSON.stringify(response));
    } catch (error) {
      console.log(error);
    }
  };
};
