import http from '../http-common';
import httpCommon from '../http-common';

class projectclass{

  getprojectByID(projectId){
    return http.get("/projectbyid/"+projectId);
  }
  getprojectBystatus(status){
      return http.get("/project1/"+status);
  }
  getprojectBystatusandempid(status,empid){
    return http.get("/projectStatusEmpId/" + status + "/" + empid);
  }
  getprojectbyclientid(clientid){
    return http.get("/projectbyclientid/" + clientid);
  }
  getprojectbyclientidstatus(clientid,status){
    return http.get("/projectbyclientid/" + clientid + "/" + status);
  }
  getprojectbyempid(empid,status){
    return http.get("/projectbyempid/" + empid);
  }
  addproject(item){
    return http.post("/project/",item);
  }
  updateprojectstatusondelete(projectid){
    return http.put("/project/" + projectid);
  }
  updateprojectstatus(projectid,status){
    return http.put("/project/" + projectid + "/" + status)
  }
  updateEndDate(item){
    console.log(item);
    return http.put("/updateenddate/",item);
  }
  deletefile(filename){
    return http.delete("/project/"+filename);
  }
  projectfileupdate(id){
    return http.put("/updatefile/" + id);
  }
  updateprojectwithfile(item){
    return http.put("/project/",item);
  }
  updateprojectwithoutfile(item){
    return http.put("/updatefile/",item);
  }
}

export default new projectclass();
