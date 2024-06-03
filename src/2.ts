import 'dotenv/config';
import app from '.';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});

module.exports = app;
