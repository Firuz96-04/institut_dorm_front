class TokenService {
    getLocalRefreshToken() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.refresh;
    }
  
    getLocalAccessToken() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.access;
    }
  
    updateLocalAccessToken(token) {
      let user = JSON.parse(localStorage.getItem("user"));
      user.access = token;
      localStorage.setItem("user", JSON.stringify(user));
    }
  
    getUser() {
      return JSON.parse(localStorage.getItem("user"));
    }
  
    setUser(user) {
      const person = JSON.stringify(user)
      localStorage.setItem("user", person);
    }
  
    removeUser() {
      localStorage.removeItem("user");
    //   localStorage.removeItem('accessToken')
    //   localStorage.removeItem('refreshToken')   
    }
  }
  
  export default new TokenService();