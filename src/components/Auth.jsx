const axios = require("axios");

export const isAuthenticated = () => {
    const key = localStorage.getItem("token");
    if (key) return true;
    else return false;
  };
  
  export const isAdmin = () => {
    const admin = localStorage.getItem("admin");
    if (admin) return true;
    else return false;
  };
  
  export const login = async (password, email) => {
    try {
      const { data } = await axios.post(`http://localhost:9000/auth/local`, {
          password,
          email
        });
      const userData = await axios.get(`http://localhost:9000/api/users/me`, {
        headers: {
          authorization: `Bearer ${data.token}`
        }
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: userData.data.email,
          userID: data.userID
        })
      );
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };
  
  export const logOut = ({history}) => {
    console.log('history: ', history);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    history.push("/login");
  };
  