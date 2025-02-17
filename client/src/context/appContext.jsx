import { createContext, useContext, useEffect, useState } from 'react';
import { portfolioApis, userApis } from '../common/services';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [aboutData, setAboutData] = useState({});
  const [introData, setIntroData] = useState({});
  const [contactData, setContactData] = useState({});
  const [experienceData, setExperienceData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [certificationData, setCertificationData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const response = await portfolioApis.getPortfolio();
      setContactData(response?.data?.contact);
      setAboutData(response?.data?.about);
      setIntroData(response?.data?.intro);
      setExperienceData(response?.data?.experience);
      setProjectData(response?.data?.project);
      setCertificationData(response?.data?.certification);
    } catch (error) {
      throw new Error(error?.message); 
    } finally {
      setLoading(false);
    }
  };
  const getUser = async () => {
    setLoading(true);
    try {
      const response = await userApis.auth();
      if(response.success){

          setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
      throw new Error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  //logout
  const logout =async()=>{
    setLoading(true);
    try {
      const response = await userApis.logout();
      if(response.statusCode === 200 && response.success === true){
        setIsAuthenticated(false);
      }
      
    } catch (error) {
      throw new Error(error?.message);
      
    }finally{
      setLoading(false);
      
    }
  }
  useEffect(() => {
    fetchPortfolio();
    getUser();
  }, []);
  const value = {
    fetchPortfolio,
    contactData,
    aboutData,
    introData,
    logout,
    experienceData,
    projectData,
    certificationData,
    isAuthenticated,
    setIsAuthenticated,
    loading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const UseAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
