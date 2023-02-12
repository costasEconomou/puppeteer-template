import fs from 'fs';
import http from 'http';
import path from 'path';

const port = 8000;
const directoryName = './src';

const types = { html: 'text/html' };

const root = path.normalize(path.resolve(directoryName));

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  const extension = path.extname(req.url).slice(1);
  const type = extension ? types[extension] : types.html;
  const supportedExtension = Boolean(type);

  if (!supportedExtension) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('404: File not found');
    return;
  }

  let fileName = req.url;
  if (req.url === '/') fileName = '/template.html';
  const filePath = path.join(root, fileName);
  const isPathUnderRoot = path
    .normalize(path.resolve(filePath))
    .startsWith(root);

  if (!isPathUnderRoot) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('404: File not found');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('404: File not found');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });

  console.log(`${filePath}`);
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
