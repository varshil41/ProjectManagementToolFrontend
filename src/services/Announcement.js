import http from '../http-common'

class anceclass{
  addannouncement(data){
    console.log(data);
    return http.post("/announcement/",data);
  }
  updateannouncement(item){
    return http.put("/announcement/",item);
  }


  getAllannouncement(){
    return http.get("/announcement/");
  }


  getAllprojectannouncement(){
    return http.get("/projectannouncement/");
  }

  updateprojectannouncement(item){
    return http.put("/projectannouncement/",item);
  }
  deleteprojectAnnouncement(id)
  {
      return http.delete("/projectannouncement/"+id);
  }

  getannouncementbyid(id){
    return http.get("/announcement/"+id);
  }

  getprojectannouncementbyid(id){
    console.log(id);
    return http.get("/projectannouncement1/"+id);
  }

  deleteAnnouncement(id)
  {
      return http.delete("/announcement/"+id);
  }
}

export default new anceclass();
