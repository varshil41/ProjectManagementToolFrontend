<template>
  <div>
    <menu1></menu1>
    <div id="main-content">
      <div class="container-fluid">
        <div class="block-header">
          <div class="row">
            <div class="col-lg-6 col-md-8 col-sm-12">
              <h2>Edit Project</h2>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/dashboard"
                    ><i class="icon-home"></i
                  ></router-link>
                </li>
                <li class="breadcrumb-item">Projects</li>
                <li class="breadcrumb-item active">Edit Project</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="row clearfix">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="card">
              <div class="body">
                <div class="row clearfix">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <input
                        type="text"
                        autocomplete="off"
                        @input="onpname"
                        id="pname"
                        class="form-control"
                        placeholder="Project Name "
                        v-model="project.projectName"
                      />
                      <div id="pnameerr" class="error-message"></div>
                    </div>
                  </div>

                  <div class="col-md-4 col-sm-12">
                    <!-- <label>Type</label> -->
                    <div class="form-group">
                      <select
                        class="form-control show-tick"
                        id="pdomain"
                        @change="onselectdomain"
                      >
                        <option value="0">Project Domain</option>
                        <option>Static Website </option>
                        <option>Ecommerce </option>
                        <option>Android App </option>
                        <option>IOS App </option>
                        <option>CMS </option>
                        <option>ERP System </option>
                      </select>
                    </div>
                  </div>

                  <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                      <select
                        class="form-control show-tick"
                        id="pclient"
                        @change="onselectclient"
                      >
                        <!-- To be fetched from database -->
                        <option value="0">Select Client Name</option>
                        <option
                          v-bind:value="item.clientId"
                          v-for="(item, id) in clientArr"
                          v-bind:key="id"
                          >{{ item.clientFirstName }}
                          {{ item.clientMiddleName }}
                          {{ item.clientLastName }}</option
                        >
                      </select>
                    </div>
                  </div>

                  <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                      <input
                        type="text"
                        id="receivedate"
                        data-provide="datepicker"
                        data-date-autoclose="true"
                        class="form-control"
                        placeholder="Receive Date"
                        autocomplete="off"
                      />
                    </div>
                  </div>

                  <div class="col-md-3 col-sm-12">
                    <div class="form-group">
                      <input
                        type="text"
                        id="startdate"
                        data-provide="datepicker"
                        data-date-autoclose="true"
                        class="form-control"
                        placeholder="Start Date"
                        autocomplete="off"
                      />
                    </div>
                  </div>

                  <div class="col-md-3 col-sm-12">
                    <div class="form-group">
                      <input
                        type="text"
                        id="deadline"
                        data-provide="datepicker"
                        data-date-autoclose="true"
                        class="form-control"
                        placeholder="DeadLine"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                 </div>
                 <br>
                <h5>File :-
                           <a href="javascript:void(0)" @click="flag=true">{{projectFile}}</a>
                                                    <a v-if="projectFile!=''" @click="ondelete" href="javascript:void(0);"
                                                        class="btn btn-sm btn-outline-danger"
                                                        title="Delete" data-type="confirm"><i
                                                            class="icon-trash"></i></a>
                </h5>
                <div class="row clearfix">
                  <div class="col-12">
                    <vue-dropzone
                      id="pfile"
                      @vdropzone-file-added="onfile"
                      @vdropzone-removed-file="onfilecancel"
                      ref="myVueDropzone"
                      :options="dropzoneOptions"
                      :useCustomSlot="true"
                    >
                      <div class="dropzone-custom-content">
                        <h3 class="dropzone-custom-title">
                          Drag and drop to upload file!
                        </h3>
                        <div class="subtitle">
                          ...or click to select a file from your computer
                        </div>
                      </div>

                    </vue-dropzone>
                    <label v-if="fileflag" style="color:red;">{{error}}</label>
                    <br>
                    <br>

                  </div>
                  <div class="col-sm-12">
                       <textarea @input="mdescription" v-model="project.projectDescription" id="content" class="form-control" rows="10"></textarea>
                 </div>

                  <div class="col-sm-12">
                    <div class="mt-4">
                       <!-- <p style="color:green;" v-if="updateflag">UPDATE Successfully</p> -->

                      <button
                        @click="onUpdateProject"
                        type="submit"
                        class="btn btn-primary"
                      >
                        Update
                      </button>
                      <button @click="oncancel" type="submit" class="btn btn-outline-secondary">
                        Cancel
                      </button>
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
import { VueEditor } from "vue2-editor";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import client from "../services/client";
import project from "../services/project";
import employee from "../services/employee";
export default {
  components: {
    VueEditor,
    vueDropzone: vue2Dropzone
  },
  data: function() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 200,
        addRemoveLinks: true
      },

      project: {
        projectName: "",
        projectDescription: "",
        projectDomain: "",
        projectStartDate: "",
        projectDeadline: "",
        projectReceiveDate: "",
        clientId: "",
        projectStatus: "idle",
      },
      selectedfile: File,
      projectFile:"",
      team: {
        projectId: "",
        teamSize: "",
        leaderId: ""
      },
      clientArr: [{}],
      workareaArr: [{}],
      description: "",
      workareaid: "",
      empname: "",
      empid: "",
      leaderid: "",
      teamcount: "",
      checkflag: 0,
      teamflag: true,
      i: 0,
      delflag:false,
      leader: 0,
      displayflag: true,
      leaderflag: true,
      memberflag: true,
      addflag: false,
      emparr: [{}],
      memberarr: [{}],
      membercount: 0,
      updateflag:false,
      flag:false,
      fileflag:false,
      error:""
    };
  },
  mounted() {
    client.getAllClient().then(doc => {
      this.clientArr = doc.data;
    });


    project.getprojectByID(this.$route.params.projectId).then(doc=>{
        this.project = doc.data[0];
        this.projectFile = doc.data[0].projectFile;
        document.getElementById("pdomain").value = this.project.projectDomain;
        document.getElementById("pclient").value = this.project.clientId;
        var date1 = new Date(this.project.projectReceiveDate);
        var d1 = date1.getMonth() + 1;
        document.getElementById("receivedate").value = date1.getFullYear() + "-" + d1 + "-" + date1.getDate();

        var date2 = new Date(this.project.projectStartDate);
        var d2 = date2.getMonth() + 1;
        document.getElementById("startdate").value = date2.getFullYear() + "-" + d2 + "-" + date2.getDate();

        var date3 = new Date(this.project.projectDeadline);
        var d3 = date3.getMonth() + 1;
        document.getElementById("deadline").value = date3.getFullYear() + "-" + d3 + "-" + date3.getDate();
      })
  },
  methods: {
    ondelete:function(){
      project.deletefile(this.projectFile).then(doc=>{})
      project.projectfileupdate(this.$route.params.projectId).then(doc1=>{})
      this.projectFile = "";
      this.fileflag=false;
      this.error="";
    },
    oncancel:function(){
        this.$router.push({path:'/projectview/'});
    },
    onfilecancel:function(file, error, xhr){
      this.error = "";
      this.selectedfile = File;
      this.fileflag = false;
    },
    mdescription:function(){
      document.getElementById("content").style = "border-color:lightgrey";
    },
    onUpdateProject: function() {
      var date1 = new Date(
        $("#receivedate")
          .datepicker()
          .val()
      );
      var date2 = new Date(
        $("#startdate")
          .datepicker()
          .val()
      );
      var date4 = new Date(
        $("#deadline")
          .datepicker()
          .val()
      );

      var d = date1.getMonth() + 1;
      var d1 = date2.getMonth() + 1;
      var d2 = date4.getMonth() + 1;

      this.project.projectReceiveDate =
        date1.getFullYear() + "-" + d + "-" + date1.getDate();
      this.project.projectStartDate =
        date2.getFullYear() + "-" + d1 + "-" + date2.getDate();
      this.project.projectDeadline =
        date4.getFullYear() + "-" + d2 + "-" + date4.getDate();

        if (this.project.projectName == "") {
        document.getElementById("pname").focus();
        document.getElementById("pname").style = "border-color:red;";
      } else if (document.getElementById("pdomain").value == "0") {
        document.getElementById("pdomain").focus();
        document.getElementById("pdomain").style = "border-color:red;";
      } else if (document.getElementById("pclient").value == "0") {
        document.getElementById("pclient").focus();
        document.getElementById("pclient").style = "border-color:red;";
      } else if (document.getElementById("receivedate").value == "") {
        document.getElementById("receivedate").focus();
      } else if (document.getElementById("startdate").value == "") {
        document.getElementById("startdate").focus();
      } else if (document.getElementById("deadline").value == "") {
        document.getElementById("deadline").focus();
      } else if(this.project.projectDescription == ""){
        document.getElementById("content").focus();
        document.getElementById("content").style = "border-color:red";
      } else if(this.projectFile != "" && this.selectedfile.name != "File"){
          this.error = "You can not add File because you have already added *";
          this.fileflag = true;
      } else if(this.projectFile == "" && this.selectedfile.name == "File"){
          this.error = "You have to add file *";
          this.fileflag = true;
      }
        else {
        if(this.projectFile == ""){
          const fd = new FormData();
          fd.append("projectName", this.project.projectName);
          fd.append("projectDescription", this.project.projectDescription);
          fd.append("projectDomain", this.project.projectDomain);
          fd.append("projectStartDate", this.project.projectStartDate);
          fd.append("projectDeadline", this.project.projectDeadline);
          fd.append("projectReceiveDate", this.project.projectReceiveDate);
          fd.append("clientId", this.project.clientId);
          fd.append("projectFile", this.selectedfile, this.selectedfile.name);
          fd.append("projectId",this.$route.params.projectId);
          project.updateprojectwithfile(fd).then(doc=>{
                 //this.updateflag = true;
                          this.$fire({
                                  title: "Updated successfully",
                                  type: "success",
                                  timer: 3000
                                }).then(r => {
                                  console.log(r.value);
                                });
                            this.$router.push({path:'/projectview/'});
                        })
        }
        else{
          project.updateprojectwithoutfile(this.project).then(doc=>{
                //this.updateflag = true;
                 this.$fire({
                                  title: "Updated successfully",
                                  type: "success",
                                  timer: 3000
                                }).then(r => {
                                  console.log(r.value);
                                });
                            this.$router.push({path:'/projectview/'});
          })
        }

     }
   },
    onpname: function() {
      document.getElementById("pname").style = "border-color:lightgrey;";
    },
    onselectclient: function(event) {
      document.getElementById("pclient").style = "border-color:lightgrey;";
      this.project.clientId = event.target.value;
    },
    onselectdomain: function(event) {
      document.getElementById("pdomain").style = "border-color:lightgrey;";
      this.project.projectDomain = event.target.value;
    },
    onfile: function(file) {
      this.error = "";
      this.selectedfile = file;
    },
    ondescription: function() {
      document.getElementById("contenterr").innerHTML = "";
    },
  }
};
</script>

<style scoped>
.button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 3px 4px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 2px 1px;
  transition-duration: 0.4s;
  cursor: pointer;
}

.button1 {
  background-color: white;
  color: black;
  border: 2px solid #4caf50;
}

.button1:hover {
  background-color: #4caf50;
  color: white;
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
