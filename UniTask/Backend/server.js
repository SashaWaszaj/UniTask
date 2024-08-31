const express = require("express");
const cors = require("cors");
const projectRoutes = require("./routes/project.routes");
const courseRoutes = require("./routes/course.routes");
const examRoutes = require("./routes/exam.routes");
const subjectRoutes = require('./routes/subject.routes');
const GradeRoutes = require('./routes/grade.routes');

require("./config/config.mongoose");

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

app.use("/project", projectRoutes);
app.use("/course", courseRoutes);
app.use("/exam", examRoutes);
app.use("/subject", subjectRoutes);
app.use("/grade", GradeRoutes);

app.listen(port, () => console.log(`Conection succesfull at port ${port}`));