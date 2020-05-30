import http from '../http-common';

class dashboardclass{
  getEmpcount(){
    return http.get("/employee1/");
  }
  getClientcount(){
    return http.get("/client/");
  }
  getProjectcount(status){
    return http.get("/project1/" + status);
  }
  getAllProject(){
    return http.get("/project1");
  }
  getEmployeeType(emptypeid){
    return http.get("/teammember/" + emptypeid);
  }
  getProjectDateCount(month){
    return http.get("/datecount/" + month);
  }
}

export default new dashboardclass();
