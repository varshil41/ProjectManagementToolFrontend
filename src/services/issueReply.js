import http from '../http-common';

class issuereplyclass{
  addissuereply(item){
    return http.post("/issuereply/",item);
  }
  addissuereplywithoutfile(item){
    return http.post("/issuereplywithoutfile/",item);
  }
  getissuereplybyid(issueid){
    return http.get("/issuereply/"+issueid);
  }
  getissuereplybyissuereplyid(issuereplyid){
    return http.get("/issuereplywithoutfile/"+issuereplyid);
  }
}

export default new issuereplyclass();
