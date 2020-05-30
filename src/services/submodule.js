import http from '../http-common';

class submoduleclass{
    getSubModuleByModuleId(moduleid){
      return http.get("/submodule/" + moduleid)
    }
    addSubModule(item){
      return http.post("/submodule/",item);
    }
    getSubModuleByModuleIdAndStatus(moduleId,status){
      return http.get("/submodule/" + moduleId + "/" + status);
    }
    updatestatus(status,id){
      return http.put("/submodule/" + status + "/" + id);
    }
    getsubmodulebymoduleid(moduleid){
      return http.get("/submodulebymodule/" + moduleid);
    }
    deletesubmodulebyid(submoduleid){
      return http.delete("/submodulebymodule/" + submoduleid);
    }
    getSubmoduleBySubmoduleId(submoduleid){
      return http.get("/submodulebysubmoduleid/" + submoduleid);
    }
}

export default new submoduleclass();
