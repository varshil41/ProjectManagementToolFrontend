import http from '../http-common';

class moduleclass{
    getModuleByProjectId(projectid){
      return http.get("/module/" + projectid)
    }
    addModule(item){
      return http.post("/module/",item);
    }
    updatestatus(status,id){
      return http.put("/module/" + status + "/" + id)
    }
    modulecalculate(projectid){
      return http.get("/modulecalculate/" + projectid)
    }
    getEmpInprogressModule(status,empid){
      return http.get("/module/"+status+"/"+empid);
    }
    deletemodule(moduleid){
      return http.delete("/module/" + moduleid);
    }
    getmodulebyid(moduleId){
      return http.get("/modulebyid/"+moduleId);
    }
    updatemodule(item){
      return http.put("/module/",item);
    }
}

export default new moduleclass();
