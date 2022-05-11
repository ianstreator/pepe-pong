const isProduction = process.env.NODE_ENV === "production";

const API_BASE_URL = isProduction ? "/" : "http://localhost:4000/";

export default { API_BASE_URL };
