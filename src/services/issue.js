import http from '../http-common';

class issueclass{

  gettotalissueCOUNT(){
    return http.get("/issue");
  }
  getTotalIssueCOUNTbystatus(status){
    return http.get("/issue/"+status);
  }

  gettotalprojectissueCOUNT(projectId){
    return http.get("/projectissue/"+projectId);
  }
  getTotalprojectIssueCOUNTbystatus(projectId,status){
    return http.get("/projectissue/"+projectId+"/"+status);
  }
  getissuebymoduleid(moduleid){
    return http.get("/issuebymodule/" + moduleid)
  }
  updateissuestatus(issueid,status){
    return http.put("/issue/" + issueid + "/" + status)
  }
  addissue(item){
    return http.post("/issue/",item);
  }
  addissuewithoutfile(item){
    console.log(item);
    return http.post("/projectissue/",item);
  }
  highissue(empid){
    return http.get("/highissue/" + empid);
  }
  getissuebyid(issueid){
    return http.get("/issuebyid/"+issueid);
  }
  issuestatusbysubmoduleid(submoduleid){
    return http.get("/issuestatusbysubmoduleid/"+submoduleid);
  }
}

export default new issueclass();
