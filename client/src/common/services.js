import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://aijaz-ahmad-portfolio.vercel.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${localStorage.getItem('token')}`
  },
});

const appEndPoints = {
  user: '/admin',
  about: '/about',
  intro: '/intro',
  contact: '/contact',
  portfolio: '/portfolio',
  experience: '/experience',
  project: '/project',
  certification: '/certification',
  contactMe: '/contact-me',
};
export const userApis = {
  refreshAccessToken: async (refreshAccessToken) => {
    try {
      const response = await Axios.post(`${appEndPoints.user}/refresh-token`, {
        headers: `Bearer ${refreshAccessToken}`,
      });
      const accessToken = response?.data?.data?.accessToken;
      localStorage.setItem('accessToken', accessToken);
      return accessToken;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //login
  login: async (userData) => {
    try {
      const response = await Axios.post(`${appEndPoints.user}/login`, userData);
      const accessToken = response?.data?.data?.accessToken;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', response?.data?.data?.refreshToken);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //logout
  logout: async () => {
    try {
      const response = await Axios.post(`${appEndPoints.user}/logout`);
      localStorage.clear();
      return response?.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //auth
  auth: async () => {
    try {
      const response = await Axios.get(`${appEndPoints.user}/auth`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //get-me
  getMe: async () => {
    try {
      const response = await Axios.get(`${appEndPoints.user}/profile`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  //change-password
  changePassword: async (password) => {
    try {
      const response = await Axios.post(
        `${appEndPoints.user}/change-password`,
        password
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //forgotPassword
  forgotPassword: async (email) => {
    console.log(email);
    try {
      const response = await Axios.post(
        `${appEndPoints.user}/forgot-password`,
        email
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //resetPassword
  resetPassword: async (token,password) => {
    try {
      const response = await Axios.post(
        `${appEndPoints.user}/reset-password?token=${token}`,
        password
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //contact-me
};
Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.request.use(
  (response) => {
    // Handle request success
    return response;
  },
  async (error) => {
    let originRequest = error.config;
    if (error.response.status === 401 && !originRequest.retry) {
      originRequest.retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        const newAccessToken = await userApis.refreshAccessToken(refreshToken);
        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);
          originRequest.headers.Authorization = `Bearer ${newAccessToken.accessToken}`;
          return Axios(originRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);

export const aboutApi = {
  getAbout: async () => {
    try {
      const response = await Axios.get(`${appEndPoints.about}`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //update about
  updateAbout: async (aboutId, aboutData) => {
    try {
      const response = await Axios.put(
        `${appEndPoints.about}/update/${aboutId}`,
        aboutData
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
};

export const introApis = {
  getIntro: async () => {
    try {
      const response = await Axios.get(`${appEndPoints.intro}`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //update intro
  updateIntro: async (introId, introData) => {
    try {
      const response = await Axios.put(
        `${appEndPoints.intro}/update/${introId}`,
        introData
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
};

export const contactApis = {
  getContact: async () => {
    try {
      const response = await Axios.get(`${appEndPoints.contact}`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
};

export const portfolioApis = {
  getPortfolio: async () => {
    try {
      const response = await Axios.get(`${appEndPoints.portfolio}`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
};

//experience api methods
export const experienceApis = {
  getAllExperience: async () => {
    try {
      const response = await Axios.get(`${appEndPoints.experience}`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //add experience
  addExperience: async (experienceData) => {
    try {
      const response = await Axios.post(
        `${appEndPoints.experience}/add`,
        experienceData
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //update experience
  updateExperience: async (experienceId, experienceData) => {
    try {
      const response = await Axios.put(
        `${appEndPoints.experience}/update/${experienceId}`,
        experienceData
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //delete experience
  deleteExperience: async (experienceId) => {
    try {
      const response = await Axios.delete(
        `${appEndPoints.experience}/delete/${experienceId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
};
//project api methods
export const projectApis = {
  getAllProjects: async () => {
    try {
      const response = await Axios.get(`${appEndPoints.project}`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //add project
  addProject: async (formData) => {
    try {
      const response = await Axios.post(
        `${appEndPoints.project}/add`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  //delete project
  deleteProject: async (projectId) => {
    try {
      const response = await Axios.delete(
        `${appEndPoints.project}/delete/${projectId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //update project
  updateProject: async (projectId, formData) => {
    try {
      const response = await Axios.put(
        `${appEndPoints.project}/update/${projectId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
};

//contact api methods
export const contactApi = {
  //update contact
  updateContact: async (contactId, contactData) => {
    try {
      const response = await Axios.put(
        `${appEndPoints.contact}/update/${contactId}`,
        contactData
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
};

//certification api methods
export const certificationApis = {
  //add certificates
  addCertifications: async (formData) => {
    try {
      const response = await Axios.post(
        `${appEndPoints.certification}/add`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //update certifications
  updateCertifications: async (certificationId, formData) => {
    try {
      const response = await Axios.put(
        `${appEndPoints.certification}/update/${certificationId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //delete certifications
  deleteCertifications: async (certificationId) => {
    try {
      const response = await Axios.delete(
        `${appEndPoints.certification}/delete/${certificationId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
};
//contactme api methods
export const contactMeApi = {
  //send contact me message
  sendContactMeMessage: async (contactMeData) => {
    try {
      const response = await Axios.post(
        `${appEndPoints.contactMe}/add`,
        contactMeData
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //get contact me messages
  getContactMeMessages: async () => {
    try {
      const response = await Axios.get(`${appEndPoints.contactMe}`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //delete contact me message
  deleteContactMeMessage: async (contactMeId) => {
    try {
      const response = await Axios.delete(
        `${appEndPoints.contactMe}/delete/${contactMeId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
};
