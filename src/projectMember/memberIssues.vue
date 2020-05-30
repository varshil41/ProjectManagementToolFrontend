<template>
<div>
  <membermenu></membermenu>
   <div id="main-content" class="profilepage_1">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2><a href="javascript:void(0);"></a>View Issues</h2>
                            <ul class="breadcrumb">

                            <li style="margin-top:5px;" class="breadcrumb-item"><router-link to="/memberDashboard"><i class="icon-home"></i></router-link>

                            <li style="margin-top:5px;" class="breadcrumb-item">Project</li>
                            <li style="margin-top:5px;" class="breadcrumb-item active">View Projects</li>
                            <li style="margin-top:5px;" class="breadcrumb-item active">Project Details</li>
                            <li style="margin-top:5px;" class="breadcrumb-item active">View Modules</li>
                            <li style="margin-top:5px;" class="breadcrumb-item active">View Issues</li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div class="row clearfix">
                    <div class="col-lg-12 col-md-12">
                        <div class="card">

                            <div class="btnclass"><center><button v-if="issueflag && modulestatus!='Ready to deploy'" @click="issuebtn" class="btn btn-sm btn-outline-warning" style="border-radius:10px;height:40px;width:30%;font-size:20px;"><i style="font-size:20px;" class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;<b>Have a Issue ?</b></button></center></div>
                            <div class="row clearfix">

                    <div class="body">
                             <div class="row clearfix" v-if="addissueflag">
                                  <div class="col-md-5 col-sm-12">
                                      <div class="form-group">
                                            <input @input="ontitle" autocomplete="off" v-model="issueArr.issueTitle" id="title" type="text" class="form-control" placeholder="Enter Issue Title...">
                                      </div>
                                  </div>
                                   <div class="col-md-5 col-sm-12">
                                      <div class="form-group">
                                            <select
                                            class="form-control show-tick"
                                            id="pclient"
                                            @change="onselectsubmodule"
                                          >
                                            <option value="0">Select SubModule Name</option>
                                            <option
                                              v-bind:value="item.subModuleId"
                                              v-for="(item, id) in submoduleArr"
                                              v-bind:key="id"
                                              >{{ item.subModuleName}}</option
                                            >
                                          </select>
                                          <p style="color:red;" v-if="submoduleflag">You have to select submodule *</p>
                                      </div>
                                  </div>
                                   <div class="col-sm-12">
                                    <div class="form-group">

                                    <vue-dropzone id="pfile" style="width:1000px;" @vdropzone-removed-file="onfilecancel"
                                   @vdropzone-file-added="onfile" ref="myVueDropzone" :options="dropzoneOptions" :useCustomSlot=true>
                                                <div class="dropzone-custom-content">
                                                    <h3 class="dropzone-custom-title">Drag and drop to upload file!</h3>
                                                    <div class="subtitle">...or click to select a file from your computer</div>
                                                </div>
                                    </vue-dropzone>
                                    <p v-if="extflag" style="color:red;">File Type is not valid *</p>
                                    </div>
                                  </div>
                                  <div class="col-md-12">
                                        <div class="form-group">
                                            <textarea style="width:1000px;" @input="ondata" v-model="issueArr.issueData" placeholder="Enter Issue Description here..." id="content1" class="form-control" col="8" rows="9"></textarea>
                                            <br>
                                            <input @click="onpriority" type="radio" id="color-1" name="color" value="low" v-model="issueArr.issuePriority">&nbsp; Low &nbsp;&nbsp;&nbsp;&nbsp;
                                            <input @click="onpriority" type="radio" id="color-1" name="color" value="medium" v-model="issueArr.issuePriority">&nbsp; Medium &nbsp;&nbsp;&nbsp;&nbsp;
                                            <input @click="onpriority" type="radio" id="color-1" name="color" value="high" v-model="issueArr.issuePriority">&nbsp; High &nbsp;&nbsp;&nbsp;&nbsp;
                                            <div id="priority" class="error-message"></div>

                                        </div>

                                    </div>

                                    <div class="col-12" >
                                          <button style="width:100%;font-size:20px;" class="btn btn-sm btn-outline-danger" @click="addissue" type="submit"><b>Raise Your Issue</b></button>
                                    </div>

                                 </div>


                       </div>
                        </div>
                            <div class="body">
                                <h5>Ongoing issues </h5>
                                <br>
                                <td v-if="pendingissues.length==0" style="font-size:20px; text-align:center;color:red;font-family: serif;">No Ongoing issues ...</td>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-6 col-sm-12" v-for="(item,id) in pendingissues" v-bind:key="id">
                                        <div class="card border">
                                            <div class="body text-left pro-img">
                                                <img style="height:150px;width:180px;" class="mx-auto d-block mb-3" src="../assets/images/projects/issue.png"
                                                    alt="">
                                                <h6 class="project-title text-primary mb-3" ><span style="color:red;">{{item.issueTitle}}</span></h6>
                                                <p style="font-family:san serif;font-size:15px;">SubModule :-<span style="font-family:serif;color:blue;">{{item.subModuleName}}</span> </p>

                                                <p v-if="item.empId == empId" style="font-family:san serif;font-size:15px;">Issue raised by :-<span style="font-family:serif;color:blue;">You</span> </p>
                                                <p v-else style="font-family:san serif;font-size:15px;">Issue raised by :-<span style="font-family:serif;color:blue;">{{item.empFirstName}}  {{item.empLastName}}</span> </p>
                                                <p v-if="item.issuePriority == 'high'" style="font-family:san serif;font-size:15px;">Issue Priority:-<span style="font-family:serif;color:blue;color:red;">{{item.issuePriority}}</span> </p>
                                                <p v-else style="font-family:san serif;font-size:15px;">Issue Priority:-<span style="font-family:serif;color:blue;;">{{item.issuePriority}}</span> </p>

                                                <button @click="onresolved(item.issueId)" v-if="empId == item.empId" class="btn btn-sm btn-outline-danger" style="height:40px;width:50%;border-radius:5px;"><i style="font-size:20px" class="fa fa-check-circle"></i>&nbsp;Resolved</button>
                                                <router-link v-bind:disabled="modulestatus=='Ready to deploy'" v-bind:to="'/memberissuechat/'+item.issueId"><button class="btn btn-sm btn-outline-warning" style="height:40px;width:45%;border-radius:5px;"><i style="font-size:20px;color:orange;" class="fa fa-comments" aria-hidden="true"></i><span>&nbsp;Chat</span></button></router-link>
                                            </div>
                                        </div>
                                    </div>

                                   </div>


                            </div>

                    </div>
                        </div>
                </div>


                <div class="row clearfix">
                    <div class="col-lg-12 col-md-12">
                        <div class="card">
                            <div class="body">
                                <h5>Resolved Issues</h5>
                                <br>
                                <td v-if="resolvedissues.length==0" style="font-size:20px; text-align:center;color:red;font-family: serif;">No Resolved issues ...</td>

                                <div class="row clearfix">

                                    <div class="col-lg-3 col-md-6 col-sm-12" v-for="(item,id) in resolvedissues" v-bind:key="id">
                                        <div disabled class="card border">
                                            <div class="body text-left pro-img">
                                                <img style="height:150px;width:180px;" class="mx-auto d-block mb-3" src="../assets/images/projects/issue.png"
                                                    alt="">
                                                <h6 class="project-title text-primary mb-3" ><span style="color:red;">{{item.issueTitle}}</span></h6>
                                                <p style="font-family:san serif;font-size:15px;">SubModule :-<span style="font-family:serif;color:blue;">{{item.subModuleName}}</span> </p>

                                                <p v-if="item.empId == empId" style="font-family:san serif;font-size:15px;">Issue raised by :-<span style="font-family:serif;color:blue;">You</span> </p>
                                                <p v-else style="font-family:san serif;font-size:15px;">Issue raised by :-<span style="font-family:serif;color:blue;">{{item.empFirstName}}  {{item.empLastName}}</span> </p>
                                                <p v-if="item.issuePriority == 'high'" style="font-family:san serif;font-size:15px;">Issue Priority:-<span style="font-family:serif;color:blue;color:red;">{{item.issuePriority}}</span> </p>
                                                <p v-else style="font-family:san serif;font-size:15px;">Issue Priority:-<span style="font-family:serif;color:blue;;">{{item.issuePriority}}</span> </p>
                                                <button class="btn btn-sm btn-outline-warning" style="height:40px;width:100%;border-radius:5px;"><i style="font-size:20px;color:orange;" class="fa fa-comments" aria-hidden="true"></i><span>&nbsp;Chat</span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
</div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import issue from '../services/issue'
import module from '../services/module'
import moduleassign from '../services/moduleassign'
import submodule from '../services/submodule'
export default {
  components:{
        vueDropzone: vue2Dropzone,
   },
  data:function(){
    return{
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 200,
        addRemoveLinks: true
      },

        addissueflag:false,
        empId:'',
        pendingissues:[{}],
        resolvedissues:[{}],
        issueArr:{
            issueData:'',
            issueFile:'file1',
            issueStatus:'',
            empId:'',
            issueTime:'',
            projectId:'',
            issuePriority:'',
            moduleId:'',
            issueTitle:'',
            subModuleId:'',
            subModuleName:'',
        },
        submoduleArr:[{}],
        submoduleflag:false,
        issueflag:false,
        submoduleid:0,
        modulestatus:'',
        extflag:false,
        selectedfile:File

    }
  },
  created(){
        this.empId = localStorage.getItem('empId');
        this.getissues();

        module.getmodulebyid(this.$route.params.moduleid).then(doc=>{
            this.modulestatus = doc.data[0].moduleStatus;
        })

        submodule.getsubmodulebymoduleid(this.$route.params.moduleid).then(submoduledata=>{
          for(let i=0;i<submoduledata.data.length;i++){
            if(submoduledata.data[i].subModuleStatus != "Ready to deploy"){
              this.submoduleArr.push(submoduledata.data[i]);
            }
          }
          this.submoduleArr.splice(0,1);
        })

        moduleassign.getempbymoduleid(this.$route.params.moduleid).then(doc=>{
            for(let i=0;i<doc.data.length;i++){
              if(this.empId == doc.data[i].empId){
                this.issueflag = true;
              }
            }
        })

   },
  methods:{
    getissues:function(){
         this.pendingissues = [{}];
         this.resolvedissues = [{}];
         issue.getissuebymoduleid(this.$route.params.moduleid).then(doc=>{
            for(let i=0;i<doc.data.length;i++){
              if(doc.data[i].issueStatus == "resolved"){
                this.resolvedissues.push(doc.data[i]);
              }
              else{
                this.pendingissues.push(doc.data[i]);
              }
            }
        })
        this.pendingissues.splice(0,1);
        this.resolvedissues.splice(0,1);
    },
    onselectsubmodule:function(event){
      this.submoduleid = event.target.value;
      if(this.submoduleid != 0){
        this.submoduleflag = false;
        this.issueArr.subModuleId = this.submoduleid;
        submodule.getSubmoduleBySubmoduleId(this.issueArr.subModuleId).then(doc=>{
          this.issueArr.subModuleName = doc.data[0].subModuleName;
        })
      }
    },
    issuebtn:function(){
        this.addissueflag=!this.addissueflag;
    },
    onpriority:function(){
        document.getElementById("priority").innerHTML = "";
    },
    onfile:function(file){
       this.selectedfile=file;
    },
    onresolved:function(issueid){
      issue.updateissuestatus(issueid,"resolved").then(doc=>{
          this.getissues();
      })
    },
    ontitle:function(){
        document.getElementById("title").style = "border-color:lightgrey;"
    },
    ondata:function(){
        document.getElementById("content1").style = "border-color:lightgrey;"
    },
    onfilecancel:function(file, error, xhr){
      this.selectedfile = File;
      this.extflag = false;
    },
    addissue:function(){
     if(this.issueArr.issueTitle == ""){
          document.getElementById("title").focus();
          document.getElementById("title").style = "border-color:red;"
      }
      else if(this.issueArr.issueData == ""){
          document.getElementById("content1").focus();
          document.getElementById("content1").style = "border-color:red;"
      }
      else if(this.issueArr.issuePriority == ""){
        document.getElementById("priority").innerHTML = "* Please select priority"
      }
      else if(this.submoduleid == 0){
        this.submoduleflag = true;
      }
      else{
        this.issueArr.issueStatus = "pending";
        this.issueArr.empId = this.empId;
        var date = new Date();
        var month = date.getMonth() + 1;
        this.issueArr.issueTime = date.getFullYear() + "-" + month + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        this.issueArr.projectId = this.$route.params.projectid;
        this.issueArr.moduleId = this.$route.params.moduleid;
         const fd = new FormData();

       if(this.selectedfile.name!="File"){

          var index;
          for(let i=0;i<this.selectedfile.name.length;i++){
            if(this.selectedfile.name[i] == '.'){
              index = i;
            }
          }
          var ext = "";
          for(let j=(index+1);j<this.selectedfile.name.length;j++){
            ext = ext + this.selectedfile.name[j];
          }
         if(ext == "jpg" || ext == "JPG" || ext == "jpeg" || ext == "JPEG" || ext == "png" || ext == "PNG" || ext == "gif" || ext == "GIF" ||  ext == "tiff" || ext == "TIFF" || ext == "docx" || ext == "DOCX" || ext == "pdf" || ext == "PDF" ||  ext == "DOC" || ext == "doc"){
            this.extflag = false;
            fd.append("issueData",this.issueArr.issueData);
            fd.append("issueFile",this.selectedfile,this.selectedfile.name);
            fd.append("issueStatus",this.issueArr.issueStatus);
            fd.append("empId",this.issueArr.empId);
            fd.append("issueTime",this.issueArr.issueTime);
            fd.append("projectId",this.issueArr.projectId);
            fd.append("issuePriority",this.issueArr.issuePriority);
            fd.append("moduleId",this.issueArr.moduleId);
            fd.append("issueTitle",this.issueArr.issueTitle);
            fd.append("subModuleId",this.issueArr.subModuleId);


            issue.addissue(fd).then(doc=>{
            this.$fire({
                      title: "Added Successfully",
                      type: "success",
                      timer: 3000
                      }).then(r => {
                            this.addissueflag=!this.addissueflag;
                            this.getissues();
                            this.issueArr = {};
                  });
            });

         }
         else{
           this.extflag = true;
         }

        }

        else if(this.selectedfile.name == "File"){
           issue.addissuewithoutfile(this.issueArr).then(doc1=>{
           this.$fire({
                  title: "Added Successfully",
                  type: "success",
                  timer: 3000
                  }).then(r => {
                        this.addissueflag=!this.addissueflag;
                        this.getissues();
                        this.issueArr = {};

              });
        });
        }
        }
     }
    }
  }
</script>

<style scoped>

.button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 3px 4px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 10px 1px 10px 30px;
  transition-duration: 0.4s;
  cursor: pointer;
}

.button1 {
  background-color: white;
  color: black;
  border: 2px solid #4CAF50;
}
.button1:hover {
    background-color: #4CAF50;
    color: white;
  }
div[disabled=disabled] {
  pointer-events: none;
  opacity: 0.4;
}
.btnclass
{
    height: 50px;
    width:100%;
    background-color:#F8F8F8;
}

.error-message {
  color: #cc0033;
  display: inline-block;
  font-size: 12px;
  line-height: 15px;
  margin: 5px 0 0;
}
.dropzone-custom-content {

  text-align: center;
}

.dropzone-custom-title {
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}
</style>
