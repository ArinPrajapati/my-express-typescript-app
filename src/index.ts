import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";

const app = express();
const port = process.env.PORT || 4003;
app.use(bodyParser.json());
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/api`);
});
