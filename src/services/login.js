import http from '../http-common';  

class loginclass{
  getEmpByEmailPassword(emailid,password){
    return http.get("/employee/" + emailid + "/" + password);
  }
  getpassword(emailid){
    return http.get("/getpassword/" + emailid);
  }
  sendmail(item){
    return http.post("/sendmail",item);
  }
  updateotp(emailid,otp){
    return http.put("/updateotp/"+emailid+"/"+otp)
  }
  getempbyemailid(emailid){
    return http.get("/updateotp/" + emailid);
  }
}

export default new loginclass();
