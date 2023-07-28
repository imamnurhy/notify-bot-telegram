const app = require('../api/index');
const port = process.env.PORT || 3000;

app.listen(port, async () => {
    console.info(`Server is up and Running at PORT : ${port}`)
});