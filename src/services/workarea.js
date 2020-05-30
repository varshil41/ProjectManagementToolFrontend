import http from '../http-common';

class workareaclass{
  getallworkarea(){
    return http.get("/workarea/");
  }
}

export default new workareaclass();
