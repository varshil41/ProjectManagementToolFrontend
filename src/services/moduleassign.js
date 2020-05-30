import http from '../http-common';

class moduleassignclass{
    addModuleAssign(item){
      return http.post("/moduleassign/",item);
    }
    getempbymoduleid(moduleid){
      return http.get("/moduleassign/" + moduleid);
    }
    deletemember(moduleid,empid){
      return http.delete("/deletemember/" + moduleid + "/" + empid);
    }
    getdatebymoduleidandempid(empid,moduleid){
      return http.get("/moduleassign/" + empid + "/" + moduleid);
    }
}

export default new moduleassignclass();
