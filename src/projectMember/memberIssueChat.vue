<template>
  <div>
    <membermenu></membermenu>
       <div id="main-content">
        <div class="container-fluid">
            <div class="block-header">
                <div class="row">
                    <div class="col-lg-6 col-md-8 col-sm-12">
                        <h2><a href="javascript:void(0);"></a>Discuss Issue</h2>
                        <ul class="breadcrumb">
                            <li style="margin-top:5px;" class="breadcrumb-item"><router-link to="/memberDashboard"><i class="icon-home"></i></router-link>
                            <li style="margin-top:5px;" class="breadcrumb-item">Project</li>
                            <li style="margin-top:5px;" class="breadcrumb-item active">View Projects</li>
                            <li style="margin-top:5px;" class="breadcrumb-item active">Project Details</li>
                            <li style="margin-top:5px;" class="breadcrumb-item active">View Modules</li>
                            <li style="margin-top:5px;" class="breadcrumb-item active">View Issues</li>
                            <li style="margin-top:5px;" class="breadcrumb-item active">Discuss Issue</li>

                           </ul>
                    </div>

                </div>
            </div>
                  <div class="row clearfix">
                    <div class="col-lg-12">
                        <div class="card single_post" style="background-color:#ececec;">
                            <div class="body">
                                <div>
                                    <h4 style="float:right;font-style:'serif';font-size:20px;"><a href="blog-details.html">Issue raised by : {{empArr.empFirstName}} {{empArr.empLastName}} </a>&nbsp;<img style="height:40px;" v-bind:src="'http://localhost:3000/images/Employees/' + empArr.empProfile" data-toggle="tooltip" data-placement="top" title="Team Lead" alt="Avatar" class="width35 rounded"></h4>
                                </div>
                                <h4 style="font-style:'serif';">
                                        Issue Title : {{issueArr.issueTitle}}
                                </h4>
                                <br>
                                <div style="font-style:'serif';">
                                    <p><b>SubModule</b> : {{issueArr.subModuleName}}</p>
                                </div>
                               <div style="font-style:'serif';">
                                    <p><b>Date</b> : {{issueArr.issueTime | moment("MMMM DD,YYYY")}}</p>
                               </div>
                               <div>
                                    <p style="font-style:'serif';"><b>Issue Priority</b>:
                                        <span v-if="issueArr.issuePriority=='high'" style="color:red;text-transform:uppercase;">{{issueArr.issuePriority}}</span>
                                        <span v-if="issueArr.issuePriority=='medium'" style="color:green;text-transform:uppercase;">{{issueArr.issuePriority}}</span>
                                        <span v-if="issueArr.issuePriority=='low'" style="color:orange;text-transform:uppercase;">{{issueArr.issuePriority}}</span>
                                    </p>
                               </div>
                                <p style="font-style:'serif';"><b >Description</b>: {{issueArr.issueData}}</p>
                                <p v-if="fileflag">
                                    <a href="javascript:void(0)" @click="flag=true">{{issueArr.issueFile}}</a>
                                    <embed style="width:0%;height:0%;" v-if="flag" v-bind:src="'http://localhost:3000/images/Issues/' + issueArr.issueFile">
                               </p>
                               <p v-if="imageflag">
                               <!--   <img style="height:200px; width:350px;"  v-bind:src="'http://localhost:3000/images/Issues/'+ issueArr.issueFile">
                                -->
                                 <img style="margin-left:20px; height:200px;width:200px;" class="image" v-for="(image, i) in images" :src="image" :key="i" @click="index = i">
                                 <vue-gallery-slideshow :images="images" :index="index" @close="index = null"></vue-gallery-slideshow>

                               </p>

                            <div class="row clearfix">
                                <div style="width:100%;" >
                                  <div class="card single_post" style="background-color:white;">
                                        <br>
                                        <label style="font-size:20px;font-family:'serif';">&nbsp;{{totalreply}}<span style="font-style:'serif';">&nbsp;Replies from team memebers&nbsp;<i class="fa fa-chevron-circle-down"></i></span></label>
                                        <br><br>
                                        <div v-if="issueReplyArr.length==0"><span style="font-size:22px;color:orange;margin-left:35%;margin-top:10%;font-family:'serif';">You are the first to respond</span></div>
                                        <div v-for="(item,id) in issueReplyArr" v-bind:key="id">
                                                  &nbsp;<img style="width:40px;height:40px;" v-bind:src="'http://localhost:3000/images/Employees/' + item.empProfile" class="rounded-circle user-photo" alt="User Profile Picture">
                                                  <b>&nbsp;{{item.empFirstName}} {{item.empLastName}}</b>
                                                  <br><br>
                                                    <div style="margin-left:10px;">
                                                        <p>{{item.issueReplyData}}</p>
                                                    </div>
                                                    <div style="margin-left:10px;">
                                                          <p v-if="filearr[id] == 2">
                                                                  <a href="javascript:void(0)" @click="flag1=true">{{item.issueReplyFile}}</a>
                                                                  <embed style="width:0%;height:0%;" v-if="flag1" v-bind:src="'http://localhost:3000/images/IssueReply/' + item.issueReplyFile">
                                                          </p>
                                                          <p v-if="filearr[id] == 1">
                                                           <!--     <img style="height:200px; width:350px;"  v-bind:src="'http://localhost:3000/images/IssueReply/'+ item.issueReplyFile">
                                                            -->


                                                         </p>
                                                    </div>
                                                <br>
                                        </div>

                                        <div class="footer">
                                            <br>
                                            <ul class="stats">
                                                <!-- <a style="float:right;margin-right:10px;" role="button" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample" class="collapsed"><button @click="onreply" type="button" class="btn btn-outline-dark"><i class="fa fa-mail-reply"></i> Response</button></a> -->
                                                <br><br>
                                                <div class="m-t-10">
                                                        <div class="well">
                                                            <form>
                                                                <div class="form-group">
                                                                    <br>
                                                                    <textarea v-model="issueReplyTempArr.issueReplyData" rows="8" class="form-control no-resize" placeholder="Give your Solution..."></textarea>
                                                                    <br>
                                                                    <input id="file" @change="onfile" type="file">
                                                                </div>
                                                                <!-- <p v-if="repliedflag" style="color:green;">Replied Successfully</p> -->
                                                                <button  v-bind:disabled="issueReplyTempArr.issueReplyData==''" @click="onsend" class="btn btn-warning" style="width:100%;margin-top:20px;"><i style="font-size:20px;" class="fa fa-paper-plane"></i><span style="font-size:20px;">&nbsp;Post your solution</span></button>
                                                            </form>
                                                        </div>
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            </div>
                            </div>
                            <br><br>
                          </div>
                    </div>
                    </div>
                </div>
        </div>

</template>
<script>
import issue from '../services/issue'
import emp from '../services/employee'
import issuereply from '../services/issueReply'
import VueGallerySlideshow from 'vue-gallery-slideshow';

export default {
    components: {
    VueGallerySlideshow
  },

    data:function(){
      return{
        images: [],
        index: null,
        issueArr:[],
        issueReplyTempArr:{
          issueId:'',
          issueReplyData:'',
          issueReplyTime:'',
          empId:'',
          issueReplyFile:''
        },
        issueReplyArr:[{}],
        empArr:[],
        flag:false,
        flag1:false,
        repliedflag:false,
        fileflag:false,
        selectedfile:File,
        imageflag:false,
        filearr:[],
        empreplyarr:[],
        count1:0,
        issuereplyid:'',
        totalreply:0,
      }
    },
    methods:{
      onfile:function(event){
        this.selectedfile = event.target.files[0];
      },
      ongetissuereplybyid:function(id){
        issuereply.getissuereplybyissuereplyid(id).then(doc3=>{
            this.issueReplyArr.push(doc3.data[0]);
            this.totalreply++;
            if(this.issueReplyArr[this.issueReplyArr.length-1].issueReplyFile == null){
              this.filearr[this.filearr.length] = 0;
            }
            else{
            var index;
            for(let j=0;j<this.issueReplyArr[this.issueReplyArr.length-1].issueReplyFile.length;j++){
              if(this.issueReplyArr[this.issueReplyArr.length-1].issueReplyFile[j] == '.'){
                  index = j;
              }
            }
            var ext="";
            for(let q=(index+1);q<this.issueReplyArr[this.issueReplyArr.length-1].issueReplyFile.length;q++){
                ext = ext + this.issueReplyArr[this.issueReplyArr.length-1].issueReplyFile[q];
            }
            if(ext == "jpg" || ext == "JPG" || ext == "jpeg" || ext == "JPEG" || ext == "png" || ext == "PNG" || ext == "gif" || ext == "GIF" ||  ext == "tiff" || ext == "TIFF"){
              this.filearr[this.filearr.length] = 1;

            }
            else{
              this.filearr[this.filearr.length] = 2;
            }
            }
        })
      },
      onreply:function(){
        this.repliedflag = false;
      },
      onsend:function(){
        var date = new Date();
        var month = date.getMonth()+1;
        this.issueReplyTempArr.issueReplyTime = date.getFullYear() + "-" + month + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();


        if(document.getElementById("file").value == ""){
          issuereply.addissuereplywithoutfile(this.issueReplyTempArr).then(doc=>{
            this.repliedflag = true;
            this.issueReplyTempArr.issueReplyData = "";
            this.ongetissuereplybyid(doc.data.insertId);
          })
        }
        else{
            const fd = new FormData();
            fd.append("issueId",this.issueReplyTempArr.issueId);
            fd.append("issueReplyData",this.issueReplyTempArr.issueReplyData);
            fd.append("issueReplyTime",this.issueReplyTempArr.issueReplyTime);
            fd.append("empId",this.issueReplyTempArr.empId);
            fd.append("issueReplyFile",this.selectedfile,this.selectedfile.name);
            issuereply.addissuereply(fd).then(doc1=>{
              this.repliedflag = true;
              this.issueReplyTempArr.issueReplyData = "";
              document.getElementById("file").value = "";
              this.ongetissuereplybyid(doc1.data.insertId);

            })
        }
     }
    },
    created(){
      emp.getempbyid(localStorage.getItem('empId')).then(doc1=>{
        this.empreplyarr = doc1.data[0];

      })

      issuereply.getissuereplybyid(this.$route.params.issueid).then(doc2=>{
        this.issueReplyArr = doc2.data;
        this.totalreply=doc2.data.length;
        var count=0;
        for(let i=0;i<this.issueReplyArr.length;i++){
          if(this.issueReplyArr[i].issueReplyFile == null){
            this.filearr[count] = 0;
          }
          else{
            var index;
            for(let j=0;j<this.issueReplyArr[i].issueReplyFile.length;j++){
              if(this.issueReplyArr[i].issueReplyFile[j] == '.'){
                  index = j;
              }
            }
            var ext="";
            for(let q=(index+1);q<this.issueReplyArr[i].issueReplyFile.length;q++){
                ext = ext + this.issueReplyArr[i].issueReplyFile[q];
            }

            if(ext == "jpg" || ext == "JPG" || ext == "jpeg" || ext == "JPEG" || ext == "png" || ext == "PNG" || ext == "gif" || ext == "GIF" ||  ext == "tiff" || ext == "TIFF"){
              this.filearr[count] = 1;
            }
            else{
              this.filearr[count] = 2;
            }

          }
          count++;
        }
      })

      this.issueReplyTempArr.issueId = this.$route.params.issueid;
      this.issueReplyTempArr.empId = localStorage.getItem('empId');
      issue.getissuebyid(this.$route.params.issueid).then(doc=>{
        this.issueArr = doc.data[0];

        emp.getempbyid(this.issueArr.empId).then(empresult=>{
        this.empArr = empresult.data[0];
        })

        if(this.issueArr.issueFile != null){
            var index;
            for(let i=0;i<this.issueArr.issueFile.length;i++){
              if(this.issueArr.issueFile[i] == '.'){
                  index = i;
              }
            }
            var ext="";
            for(let j=(index+1);j<this.issueArr.issueFile.length;j++){
                ext = ext + this.issueArr.issueFile[j];
            }

            if(ext == "jpg" || ext == "JPG" || ext == "jpeg" || ext == "JPEG" || ext == "png" || ext == "PNG" || ext == "gif" || ext == "GIF" ||  ext == "tiff" || ext == "TIFF"){
              this.imageflag = true;
              this.images[0] = "http://localhost:3000/images/Issues/" +  this.issueArr.issueFile;

            }
            else{
              this.fileflag = true;
            }
        }

      })

    }
}
</script>
<style scoped>

</style>
