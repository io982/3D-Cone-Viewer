const express = require('express');
const app = express();
const port = 3000;
const ROOT = './'

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get('/', (req, res) => {
   res.sendFile('index.html', { root: ROOT });
})

app.get('/client.js', (req, res) => {
  res.sendFile('client.js', { root: ROOT });
})

app.get('/triangulation', (req, res) => {
    const { height, radius, segments } = req.query;  
    // Compute the triangulation
    const triangles = [];
    for (let i = 0; i < segments; i++) {
      const theta = (2 * Math.PI * i) / segments;
      const nextTheta = (2 * Math.PI * (i + 1)) / segments;
  
      // Base triangle
      triangles.push([0, 0, 0]); // Apex
      triangles.push([
        radius * Math.cos(theta),
        radius * Math.sin(theta),
        0
      ]);
      triangles.push([
        radius * Math.cos(nextTheta),
        radius * Math.sin(nextTheta),
        0
      ]);
  
      // Side triangle
      triangles.push([0, 0, +height]); // Apex
      triangles.push([
        radius * Math.cos(theta),
        radius * Math.sin(theta),
        0
      ]);
      triangles.push([
        radius * Math.cos(nextTheta),
        radius * Math.sin(nextTheta),
        0
      ]);
    }    
    res.json(triangles.join().split(','));
  });
  