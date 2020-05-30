import http from '../http-common';

class teamclass{

  getteamByprojectID(projectId){
    return http.get("/team/"+projectId);
  }
  addteam(item){
    return http.post("/team/",item);
  }
  updateteamsize(item){
    return http.put("/team/",item);
  }
  updateleaderid(item){
    return http.put("/updateleader/",item);
  }
}

export default new teamclass();
