/* eslint-disable */
let app;

if (process.env.NODE_ENV === 'production') {
  console.log('production!');
  app = require('./server/prodServer');
} else {
  console.log('development!');
  app = require('./server/devServer');
}

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), '0.0.0.0', (err) => {
  if (err) { return console.log(err); }
  return console.log('Node app is running on port', app.get('port'));
});
