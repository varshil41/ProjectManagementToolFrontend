<template>
    <div>
      <membermenu></membermenu>
      <div id="main-content" class="taskboard">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2><a href="javascript:void(0);"></a>Announcements</h2>
                            <ul class="breadcrumb">
                                <li style="margin-top:5px;" class="breadcrumb-item"><router-link to="/memberDashboard"><i class="icon-home"></i></router-link>
                                </li>
                                <li style="margin-top:5px;" class="breadcrumb-item active">Announcements</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row clearfix">

                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="card">

                            <div class="body">
                                  <div class="row clearfix">
                                  <div class="col-md-4 col-sm-12">
                                        <div class="form-group">
                                        <input type="text" id="searchdate" v-bind:value="date | moment('YYYY-MM-DD')" data-provide="datepicker" data-date-autoclose="true"
                                                class="form-control" placeholder="Search Date">
                                        </div>
                                  </div>

                                  <div class="col-md-2 col-sm-12">
                                          <button @click="onsearch" type="submit" class="btn btn-primary">Search</button>
                                  </div>


                                  </div>
                                  <div class="table-responsive">

                                    <table class="table m-b-0 table-hover">

                                        <thead>
                                            <tr>
                                                <th>Announcement Title</th>
                                                <th>Announcement Content</th>
                                                <th>Announcement Date</th>
                                                <th>Announcement Time</th>
                                            </tr>
                                        </thead>

                                        <tbody v-if="flag">
                                            <tr v-for="(item,id) in announcementArr" v-bind:key="id">
                                                 <td class="project-title">
                                                  {{item.announcementTitle}}
                                                </td>
                                                <td class="project-title">
                                                    <a @click="onviewmessage(item.announcementMessage)" href="javascript:void(0);" data-toggle="modal" data-target="#addcontact">View Content</a></td>
                                                <td>
                                                  {{item.announcementTime | moment("MM/DD/YYYY")}}
                                                </td>
                                                <td>
                                                  {{item.announcementTime | moment("HH:mm:ss")}}
                                                </td>
                                            </tr>
                                        </tbody>

                                        <tbody v-else><br>
                                         <p style="font-size:15px;color:red;"><b><i style="font-size:15px;" class="fa fa-bell-slash" aria-hidden="true"></i>&nbsp; No Announcements for today ...</b></p>

                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row clearfix">

                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="card">

                            <div class="body">
                                  <div class="row clearfix">
                                  <div class="col-md-4 col-sm-12">
                                        <div class="form-group">
                                        <input type="text" id="searchdate1" v-bind:value="date1 | moment('YYYY-MM-DD')" data-provide="datepicker" data-date-autoclose="true"
                                                class="form-control" placeholder="Search Date">
                                        </div>
                                  </div>

                                  <div class="col-md-2 col-sm-12">
                                          <button @click="onsearch1" type="submit" class="btn btn-primary">Search</button>
                                  </div>


                                  </div>
                                  <div class="table-responsive">

                                    <table class="table m-b-0 table-hover">

                                        <thead>
                                            <tr>
                                                <th>Project Name</th>
                                                <th>ProjectAnnouncement Title</th>
                                                <th>ProjectAnnouncement <br>Content</th>
                                                <th>ProjectAnnouncement Date</th>
                                                <th>ProjectAnnouncement Time</th>
                                            </tr>
                                        </thead>

                                        <tbody v-if="flag1">
                                            <tr v-for="(item,id) in projectannArr" v-bind:key="id">
                                                <td>{{item.projectName}}</td>
                                                <td class="project-title">
                                                  {{item.projectAnnouncementTitle}}
                                                </td>
                                                <td class="project-title">
                                                    <a @click="onviewmessage(item.projectAnnouncementMessage)" href="javascript:void(0);" data-toggle="modal" data-target="#addcontact">View Content</a></td>
                                                <td>
                                                  {{item.projectAnnouncementTime | moment("MM/DD/YYYY")}}
                                                </td>
                                                <td>
                                                  {{item.projectAnnouncementTime | moment("HH:mm:ss")}}
                                                </td>
                                            </tr>
                                        </tbody>

                                        <tbody v-else><br>
                                                <p style="font-size:15px;color:red;"><b><i style="font-size:15px;" class="fa fa-bell-slash" aria-hidden="true"></i>&nbsp; No project announcements for today ...</b></p>

                                        </tbody>


                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
<div class="modal fade" id="addcontact" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h6 class="title" id="defaultModalLabel">Message</h6>
            </div>
            <div class="modal-body">
                <div class="row clearfix">
                      <p style="margin-left:10px;">{{message}}</p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">CLOSE</button>
            </div>
        </div>
    </div>
</div>

    </div>
</template>
<script>
import announcement from '../services/Announcement'
import projectann from '../services/projectAnnouncement'
export default {
    data:function(){
      return{
        date:'',
        date1:'',
        announcementArr:[{}],
        projectannArr:[{}],
        message:'',
        flag:true,
        flag1:true,
     }
    },
    created(){
       this.date = new Date();
       this.date1 = new Date();
       var count = 0;
       announcement.getAllannouncement().then(doc=>{
          count=0;
          for(let i=doc.data.length-1;i>=0;i--){
              var dat = new Date(doc.data[i].announcementTime);
              if(this.date.getDate() == dat.getDate() && this.date.getMonth() == dat.getMonth() && this.date.getFullYear() == dat.getFullYear()){
                    this.announcementArr.push(doc.data[i]);
                    count++;
              }
        }
       if(count == 0)this.flag = false;
       })
       this.announcementArr.splice(0,1);

       count = 0;
       projectann.getAnnounceByProjectByEmpId(localStorage.getItem('empId')).then(doc=>{
          count=0;
          for(let i=doc.data.length-1;i>=0;i--){
              var dat = new Date(doc.data[i].projectAnnouncementTime);
              if(this.date1.getDate() == dat.getDate() && this.date1.getMonth() == dat.getMonth() && this.date1.getFullYear() == dat.getFullYear()){
                    this.projectannArr.push(doc.data[i]);
                    count++;
              }
        }
       if(count == 0)this.flag1 = false;
       })
       this.projectannArr.splice(0,1);


    },
    methods:{
      onviewmessage:function(message){
        this.message = message;
      },

      onsearch:function(){
          var count = 0;
          this.announcementArr = [{}]
          this.date = new Date($("#searchdate").datepicker().val());
          announcement.getAllannouncement().then(doc=>{
          count=0;
          for(let i=doc.data.length-1;i>=0;i--){
              var dat = new Date(doc.data[i].announcementTime);
              if(this.date.getDate() == dat.getDate() && this.date.getMonth() == dat.getMonth() && this.date.getFullYear() == dat.getFullYear()){
                    this.announcementArr.push(doc.data[i]);
                    count++;
              }
        }
       if(count == 0)this.flag=false;
       else this.flag = true;
       })
        this.announcementArr.splice(0,1);
      },

      onsearch1:function(){
          var count = 0;
          this.projectannArr = [{}]
          this.date1 = new Date($("#searchdate1").datepicker().val());
          projectann.getAnnounceByProjectByEmpId(localStorage.getItem('empId')).then(doc=>{
          count=0;
          for(let i=doc.data.length-1;i>=0;i--){
              var dat = new Date(doc.data[i].projectAnnouncementTime);
              if(this.date1.getDate() == dat.getDate() && this.date1.getMonth() == dat.getMonth() && this.date1.getFullYear() == dat.getFullYear()){
                    this.projectannArr.push(doc.data[i]);
                    count++;
              }
        }
       if(count == 0)this.flag1=false;
       else this.flag1 = true;
       })
        this.projectannArr.splice(0,1);
      },


    }
}
</script>

<style scoped>

</style>
