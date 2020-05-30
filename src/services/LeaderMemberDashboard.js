import http from '../http-common.js';
class dashboardclass{
  getProjectDeatailsCOUNT(id,status){
    return http.get("/memberleader/" + id+"/"+status);
  }
  getongoingProjectDeatails(id,status){
    return http.get("/memberleader1/" + id+"/"+status);
  }

  getHighpriorityIssueCount(id,status,priority){
    return http.get("/memberleaderissue/"+id+"/"+status+"/"+priority);
  }

  getPendingissueCount(id,status){
    return http.get("/memberleaderissue/"+id+"/"+status);
  }
  getHighpriorityIssueDETAILS(id,status,priority){
    return http.get("/memberleaderissue1/"+id+"/"+status+"/"+priority);
  }
}

export default new dashboardclass();
