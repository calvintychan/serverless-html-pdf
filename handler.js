'use strict';

const fs = require('fs');
const path = require('path');
const execFile = require('child_process').execFile;

module.exports.print = (event, context, callback) => {
  console.log(event);
  const body = JSON.parse(event.body);
  const phantomjs = path.resolve('bin/phantomjs-linux');
  const rasterize = path.resolve('lib/rasterize.js');
  const outputPDF = '/tmp/output.pdf';
  const url = body.url;

  if (!url) {
    const err = 'url parameter is undefined';
    return callback(err, {
      statusCode: 500,
      body: JSON.stringify({ 'error': err })
    });
  }

  execFile(phantomjs, [rasterize, url, outputPDF, "A4", 0.68], (err, stdout, stderr) => {
    console.log('execute phantomjs');
    if (err) {
      console.log(err);
      callback(err, {
        statusCode: 500,
        body: JSON.stringify({
          'error': err
        }),
      });
    }
    const output = fs.readFileSync(outputPDF);
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: output.toString('base64')
    });
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
