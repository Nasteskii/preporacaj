import apiRequestService from "./apiRequest.service";

class AuthService {
  async signup(registerProfileDTO: any) {
    const response = await apiRequestService.post(
      "/auth/signup",
      registerProfileDTO,
    );
    const token = response.data.token;
    localStorage.setItem("jwtToken", token);
    return token;
  }

  async login(loginProfileDTO: any) {
    const response = await apiRequestService.post(
      "/auth/login",
      loginProfileDTO,
    );
    const token = response.data.token;
    localStorage.setItem("jwtToken", token);
    return token;
  }

  async logout(): Promise<void> {
    try {
      await apiRequestService.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        },
      );

      localStorage.removeItem("jwtToken");
      sessionStorage.removeItem("jwtToken");

      window.location.href = "/home";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
}

export default new AuthService();
