import http from '../http-common';

class teamMemberClass{
  addteamMember(tid,eid){
    return http.post("/teammember/" + tid + "/" + eid);
  }
  getteambyteamid(teamid){
    return http.get("/teambyteamid/"+teamid);
  }
  deleteteammember(id){
    return http.delete("/teammember/" + id);
  }
}

export default new teamMemberClass();
