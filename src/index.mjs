import express from 'express';
import { createUserValidationSchema } from './utils/validationSchemas.mjs';

import router from "./routes/index.mjs"
const PORT=process.env.PORT || 3000
const app = express();
app.use(express.json());
app.use(router);


app.get("/",(request,response)=>{
    response.status(201).send("hello world!")
})

app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})