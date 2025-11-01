// axios instance to call other REST microservices (Assessment, Job)
import axios from "axios";
import config from "../config/index.js";

const http = axios.create({
  baseURL: config.ASSESSMENT_URL, // used by default for assessment calls
  timeout: 5000
});

// if you need to call Job service directly, use axios with JOB_URL
export { http };
