const express = require("express");
const cors = require("cors");


 const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const repos = {id: uuid(),title, url, techs, likes: 0 }

  repositories.push(repos);

  return response.json(repos)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;

  const reposIndex = repositories.findIndex(repos => repos.id === id);

  if(reposIndex < 0){
    return response.status(400).json({error: 'Repos not found.'});
  }

  const repos = {
    id, title, url, techs, likes: repositories[reposIndex].likes
  }


  repositories[reposIndex] = repos;

  return response.json(repos);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const reposIndex = repositories.findIndex(repos => repos.id === id);

  if(reposIndex < 0){
    return response.status(400).json({error: 'Repos not found.'});
  }

  repositories.splice(reposIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const reposIndex = repositories.findIndex(repos => repos.id === id);

  if(reposIndex < 0){
    return response.status(400).json({error: 'Repos not found.'});
  }

  const repos = repositories[reposIndex]

  repos.likes = repos.likes + 1;
  const likes = repos.likes;

  return response.json({likes});
});

module.exports = app;
