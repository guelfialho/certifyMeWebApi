import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 API CertifyMe rodando na porta ${PORT}`);
});
