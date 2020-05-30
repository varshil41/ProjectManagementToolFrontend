import http from '../http-common'

class clientclass{
  addclient(data){
    console.log(data);
    return http.post("/client/",data);
  }
  getAllClient(){
    return http.get("/getclient/");
  }
  getClientById(id){
    return http.get("/client/" + id);
  }
  updateclient(item){
    return http.put("/client/",item);
  }
}

export default new clientclass();
