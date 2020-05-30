import http from '../http-common'

class empclass{
  getallemp(){
      return http.get("/employee/");
  }
  getempbyid(id){
    return http.get("/employee/" + id)
  }
  updateemp(item){
    return http.put("/employee/",item);
  }
  updateemppassword(item){
    return http.put("/employee1/",item);
  }
  getempbyworktypeid(id){
    return http.get("/employeeworkarea/" + id);
  }
  getempbymoduleid(id){
    return http.get("/moduleassign/" + id);
  }
}

export default new empclass();
