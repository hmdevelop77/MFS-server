import axios from 'axios';

class ExampleService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/examples
  createOne = async (requestBody) => {
    return this.api.post('/api/examples', requestBody);
  }

  // GET /api/examples
  getAll = async () => {
    return this.api.get('/api/examples');
  }

  // GET /api/examples/:id
  getOne = async (id) => {
    return this.api.get(`/api/examples/${id}`);
  }

  // PUT /api/examples/:id
  updateOne = async (id, requestBody) => {
    return this.api.put(`/api/examples/${id}`, requestBody);
  }

  // DELETE /api/examples/:id
  deleteProject = async (id) => {
    return this.api.delete(`/api/examples/${id}`);
  } 
}

 const createFile = (file) => {
  return axios.post(`${process.env.REACT_APP_SERVER_URL}/file`, file, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
};

 const uploadFile = (uploadData) => {
  return axios.post(`${process.env.REACT_APP_SERVER_URL}/upload`, uploadData);
};

 const getAllPodcasts = () => {
  return axios.get(`${process.env.REACT_APP_SERVER_URL}/podcasts`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
};
const updatedBudget = () => {
  return axios.get(`${process.env.REACT_APP_SERVER_URL}/budget`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
};
const updateBudget = (budget) => {
  return axios.put(`${process.env.REACT_APP_SERVER_URL}/budget`, budget, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
};
const createComment = (comment) =>{
  return axios.post(`${process.env.REACT_APP_SERVER_URL}/podcasts/comment`, comment,{
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
} 
const getAllComments = () =>{
  return axios.get(`${process.env.REACT_APP_SERVER_URL}/podcasts/comment`,{
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
} 


// Create one instance of the service
const exampleService = new ExampleService();

export  {exampleService,createFile,uploadFile,getAllPodcasts,updateBudget,updatedBudget,createComment,getAllComments};