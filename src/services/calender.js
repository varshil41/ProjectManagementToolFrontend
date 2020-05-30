import http from '../http-common';

class calenderclass{
  getongoingproject(status){
      return http.get("/ongoingproject/"+status);
  }
}

export default new calenderclass();
