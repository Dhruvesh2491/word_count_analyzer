import cors from "cors";

const corsOptions = {
  origin: "https://word-count-analyzer.onrender.com", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default cors(corsOptions);
