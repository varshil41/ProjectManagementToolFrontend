import http from '../http-common'

class projectannouncementclass{
     addprojectAnnouncement(item){
       return http.post("/projectannouncement/",item)
     }
     getAnnounceByProjectByEmpId(empid){
       return http.get("/projectannouncement/" + empid)
     }
}

export default new projectannouncementclass();
