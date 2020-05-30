<template>
  <div>
    <menu1></menu1>
    <div id="main-content">
      <div class="container-fluid">
        <div class="block-header">
          <div class="row">
            <div class="col-lg-6 col-md-8 col-sm-12">
              <h2>
                Create New Project
              </h2>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/dashboard"
                    ><i class="icon-home"></i
                  ></router-link>
                </li>
                <li class="breadcrumb-item">Projects</li>
                <li class="breadcrumb-item active">Add Project</li>
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
                        <option>Finanace </option>
                        <option>E-commerce</option>
                        <option>Insurance</option>
                        <option>Travel</option>
                        <option>Advertisement</option>
                        <option>Telecom</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                  <select
                        class="form-control show-tick"
                        id="ptype"
                        @change="onselecttype"
                        >
                        <option value="0">Project type</option>
                        <option>Web Application </option>
                        <option>Desktop Application </option>
                        <option>IOS application </option>
                        <option>Android Application</option>
                        <option>Website</option>
                      </select>
                    </div></div>
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
                        v-bind:data-date-end-date="receiveval"
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
                        v-bind:data-date-start-date="startval"
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
                        v-bind:data-date-start-date="startval"
                        data-provide="datepicker"
                        data-date-autoclose="true"
                        class="form-control"
                        placeholder="DeadLine"
                        autocomplete="off"
                      />
                    </div>
                  </div>

                  <div class="col-md-2 col-sm-12">
                    <!-- <label>Type</label> -->
                    <div class="form-group">
                      <input
                        type="tel" maxlength="2" class="js-input-mobile form-control"
                        id="teamsizeid"
                        @change="onselectteamsize"
                         @input="onselectteamsize"
                        placeholder="Team Size "
                        v-model="team.teamSize"
                      />
                      <div id="teamsizeerror" class="error-message"></div>
                    </div>
                  </div>

                  <div class="col-md-4 col-sm-12">
                    <!-- <label>Type</label> -->
                    <div class="form-group">
                      <select
                        class="form-control show-tick"
                        @change="onselectmembertype"
                        v-bind:disabled="teamflag"
                      >
                        <option value="0">Select MemberType</option>
                        <option
                          v-bind:value="item.workAreaId"
                          v-for="(item, id) in workareaArr"
                          v-bind:key="id"
                          >{{ item.workAreaType }}</option
                        >
                      </select>
                    </div>
                  </div>

                  <div class="col-md-4 col-sm-12">
                    <!-- <label>Type</label> -->
                    <div class="form-group">
                      <select
                        class="form-control show-tick"
                        id="teamleaderid"
                        @change="onselectteamleader"
                        v-bind:disabled="leaderflag"
                      >
                        <option value="Select TeamLeader"
                          >Select TeamLeader</option
                        >
                        <option
                          v-bind:value="item.empId"
                          v-for="(item, id) in emparr"
                          v-bind:key="id"
                          >{{ item.empFirstName }} {{ item.empMiddleName }}
                          {{ item.empLastName }}</option
                        >
                      </select>
                    </div>
                  </div>

                  <div class="col-md-4 col-sm-12">
                    <!-- <label>Type</label> -->
                    <div class="form-group">
                      <select
                        class="form-control show-tick"
                        id="teammemberid"
                        @change="onselectteammember"
                        v-bind:disabled="memberflag"
                      >
                        <option value="0">Select TeamMember</option>
                        <option
                          v-bind:value="item.empId"
                          v-for="(item, id) in emparr"
                          v-bind:key="id"
                          >{{ item.empFirstName }} {{ item.empMiddleName }}
                          {{ item.empLastName }}</option
                        >
                      </select>
                      <div id="membererr" class="error-message"></div>
                      <button
                        type="button"
                        @click="onaddmember()"
                        style="float:right;"
                        class="button button1"
                      >
                        Add Member
                      </button>
                    </div>
                  </div>

                  <div class="col-lg-3 col-md-4 col-sm-12"></div>
                  <div class="col-lg-4 col-md-4 col-sm-12"></div>
                  <div class="col-lg-5 col-md-6 col-sm-12" v-if="displayflag">
                    <div class="card">
                      <div class="body project_report">
                        <div class="table-responsive">
                          <table
                            class="table table-hover js-basic-example dataTable table-custom m-b-0"
                          >
                            <tr>
                              <th>MemberName</th>
                            </tr>
                            <tbody>
                              <tr
                                v-for="(item, id) in memberarr"
                                v-bind:key="id"
                              >
                                <td v-if="id != 0">
                                  {{ item.empFirstName }}
                                  {{ item.empMiddleName }}
                                  {{ item.empLastName }}
                                </td>
                                <td v-if="id != 0" class="project-actions">
                                  <a
                                    @click="onmemberdelete(item)"
                                    href="javascript:void(0);"
                                    class="btn btn-sm btn-outline-danger"
                                    title="Delete"
                                    data-type="confirm"
                                    ><i class="icon-trash"></i
                                  ></a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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
                    <label v-if="fileflag" style="color:red;">You have to Add File *</label>
                    <label v-if="extflag" style="color:red;">File type must be in .doc,.docx,.pdf*</label>

                    <br />
                  </div>
                  <div class="col-sm-12">
                      <textarea placeholder="Project Description" @input="mdescription" v-model="project.projectDescription" id="content" class="form-control" rows="10"></textarea>
                  </div>

                  <div class="col-sm-12">
                    <div class="mt-4">
                     <!-- <p style="color:green;" v-if="addflag1">Add Successfully</p> -->

                      <button
                        @click="onaddproject"
                        type="submit"
                        class="btn btn-primary"
                        style="width:49%;"
                      >
                        Create project
                      </button>
                      <button @click="oncancel" style="width:49%;" type="submit" class="btn btn-outline-secondary">
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
import workarea from "../services/workarea";
import employee from "../services/employee";
import team from "../services/Team";
import teammember from "../services/teammember";
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
        projectType:"",
        projectStartDate: "",
        /*     projectEndDate:'-',
         */ projectDeadline: "",
        projectReceiveDate: "",
        clientId: "",
        projectStatus: "idle",
        projectFile: "file1"
      },
      selectedfile: File,
      receiveval:"",
      startval:"+0d",
      team: {
        projectId: "",
        teamSize: "",
        leaderId: ""
      },
      clientArr: [{}],
      workareaArr: [{}],
      description: "",
      workareaid: "",
      extflag:false,
      empname: "",
      empid: "",
      leaderid: "",
      teamcount: "",
      checkflag: 0,
      teamflag: true,
      fileflag:false,
      i: 0,
      leader: 0,
      displayflag: false,
      leaderflag: true,
      memberflag: true,
      addflag: false,
      emparr: [{}],
      memberarr: [{}],
      membercount: 0,
      addflag1:false,
      desflag:0,
      pnameflag:0,
      extflag:false,
    };
  },
  created() {
    this.receiveval = new Date();
    client.getAllClient().then(doc => {
      this.clientArr = doc.data;
    });

    workarea.getallworkarea().then(doc => {
      this.workareaArr = doc.data;
    });

    employee.getallemp().then(doc => {
      console.log(doc.data);
      this.emparr = doc.data;
    });
  },
  methods: {
    oncancel:function(){
      this.$router.push({path:'/projectview/'});
    },
    mdescription:function(){
      for(let i=0;i<this.project.projectDescription.length;i++){
        if(this.project.projectDescription[i] == " "){
          this.desflag = 1;
        }
        else{
          this.desflag = 0;
          break;
        }
      }
      document.getElementById("content").style = "border-color:lightgrey;"
    },
    onaddproject: function() {
      var fname = this.selectedfile.name;
      var ext=fname.split('.')[1];
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
      }else if (this.pnameflag==1) {
        document.getElementById("pname").focus();
        document.getElementById("pname").style = "border-color:red;";
      }
      else if (document.getElementById("pdomain").value == "0") {
        document.getElementById("pdomain").focus();
        document.getElementById("pdomain").style = "border-color:red;";
      } else if (document.getElementById("ptype").value == "0") {
        document.getElementById("ptype").focus();
        document.getElementById("ptype").style = "border-color:red;";
      }
       else if (document.getElementById("pclient").value == "0") {
        document.getElementById("pclient").focus();
        document.getElementById("pclient").style = "border-color:red;";
      } else if (document.getElementById("receivedate").value == "") {
        document.getElementById("receivedate").focus();
      } else if (document.getElementById("startdate").value == "") {
        document.getElementById("startdate").focus();
      } else if (document.getElementById("deadline").value == "") {
        document.getElementById("deadline").focus();
      } else if (document.getElementById("teamsizeid").value == "") {
        document.getElementById("teamsizeid").focus();
        document.getElementById("teamsizeid").style = "border-color:red;";
      } else if (this.team.teamSize != this.membercount) {
        document.getElementById("teammemberid").focus();
        document.getElementById("teammemberid").style = "border-color:red;";
        document.getElementById("membererr").innerHTML =
          "You have to add members";
      }
      else if(this.project.projectDescription == ""){
        document.getElementById("content").focus();
        document.getElementById("content").style="border-color:red";
      }
      else if(this.desflag == 1){
        document.getElementById("content").focus();
        document.getElementById("content").style="border-color:red";
      }
      else if(this.selectedfile.name == "File"){
          this.fileflag = true;
      }
      else if(ext!='docx' && ext!='pdf' && ext!='doc'){
          this.extflag=true;
      }
      else {
        const fd = new FormData();
        fd.append("projectName", this.project.projectName);
        fd.append("projectDescription", this.project.projectDescription);
        fd.append("projectDomain", this.project.projectDomain);
        fd.append("projectType", this.project.projectType);
        fd.append("projectStartDate", this.project.projectStartDate);
        fd.append("projectDeadline", this.project.projectDeadline);
        fd.append("projectReceiveDate", this.project.projectReceiveDate);
        fd.append("clientId", this.project.clientId);
        fd.append("projectStatus", this.project.projectStatus);
        fd.append("projectFile", this.selectedfile, this.selectedfile.name);
        console.log(fd);
        project.addproject(fd).then(doc => {
          console.log(doc.data);
          this.team.projectId = doc.data.insertId;
          team.addteam(this.team).then(doc => {
            this.teamId = doc.data.insertId;
            teammember
              .addteamMember(this.teamId, this.memberarr[1].empId)
              .then(doc => {
                for (let i = 2; i < this.memberarr.length; i++) {
                  teammember
                    .addteamMember(this.teamId, this.memberarr[i].empId)
                    .then(doc => {
                    this.$fire({
                    title: "Project Added successfully",
                    type: "success",
                    timer: 3000
                    }).then(r => {
                    });
                    });
                    this.$router.push({path:'/projectview/'});
                }
              });
          });
          this.addflag1 = true;
        });
      }
     },
    onpname: function() {
     for(let i=0;i<this.project.projectName.length;i++){
        if(this.project.projectName[i] == " "){
          this.pnameflag = 1;
        }
        else{
          this.pnameflag = 0;
          break;
        }
      }

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
    onselecttype: function(event) {
      document.getElementById("ptype").style = "border-color:lightgrey;";
      this.project.projectType = event.target.value;
    },
    onfile: function(file) {
      this.selectedfile = file;
      this.fileflag = false;
    },
    onfilecancel:function(){
       this.selectedfile = File;
       this.extflag=false;
     },
    ondescription: function() {
      document.getElementById("contenterr").innerHTML = "";
    },
    onselectteamleader: function(event) {
      this.leader = event.target.value;
      this.empid = event.target.value;
      this.team.leaderId = event.target.value;
    },
    onselectteamsize: function(event) {
        $('body').on('keyup', '.js-input-mobile', function () {
        var $input = $(this),
        value = $input.val(),
        length = value.length,
        inputCharacter = parseInt(value.slice(-1));

    if (!((length > 0 && inputCharacter >= 0 && inputCharacter <= 10) || (length === 1 && inputCharacter >= 7 && inputCharacter <= 10))) {
        $input.val(value.substring(0, length - 1));
     }
    });

      document.getElementById("teamsizeid").style = "border-color:lightgrey;";
      if (event.target.value != "" && event.target.value <= 10) {
        this.teamflag = false;
        this.leaderflag = false;
        document.getElementById("teamsizeerror").innerHTML = "";
      }
      if (event.target.value == "") {
        this.teamflag = true;
        this.leaderflag = true;
      }
    },
    onselectteammember: function(event) {
      document.getElementById("membererr").innerHTML = "";
      document.getElementById("teammemberid").style = "border-color:lightgrey;";

      this.empid = event.target.value;
    },
    onmemberdelete: function(item) {
      if (this.leader == item.empId) this.leaderflag = false;
      else this.memberflag = false;
      for (let j = 0; j < this.memberarr.length; j++) {
        if (item.empId === this.memberarr[j].empId) {
          this.emparr.push(this.memberarr[j]);
          this.membercount--;
          this.memberarr.splice(j, 1);
        }
      }
      if (this.memberarr.length == 1) {
        this.displayflag = false;
        this.memberflag = true;
        this.teamflag = false;
      }
    },
    onaddmember: function() {
      if(document.getElementById("teamleaderid").value != "Select TeamLeader" ||  document.getElementById("teammemberid").value!="0"){
      if (this.leader != 0 && this.leaderflag == false) {
        this.memberflag = false;
        this.leaderflag = true;
      }
      if (this.teamflag == true && this.memberarr.length == 1) {
        document.getElementById("teamsizeid").focus();
      }
      if (this.leader == 0 && this.empid == 0 && this.memberflag == true);
      else if (this.empid == 0 && this.leaderflag == false);
      else {
        for (let i = 0; i < this.memberarr.length; i++) {
          if (this.empid == this.memberarr[i].empId) {
            this.checkflag = 1;
            break;
          }
        }
        if (this.checkflag == 1) {
          alert("Already added");
        } else {
          employee.getempbyid(this.empid).then(doc => {
            for(let k=0;k<this.emparr.length;k++){
              if(this.emparr[k].empId == doc.data[0].empId){
                this.emparr.splice(k,1);
              }
            }
            this.membercount++;
            this.teamflag = true;
            this.memberarr.push(doc.data[0]);
          });
          this.displayflag = true;
        }
        this.checkflag = 0;
        document.getElementById("teamleaderid").value = "Select TeamLeader";
        document.getElementById("teammemberid").value = "Select TeamMember";
        if (this.memberarr.length == this.team.teamSize) {
          this.teamflag = true;
          this.leaderflag = true;
          this.memberflag = true;
        }
      }
     }
    },
    onselectmembertype: function(event) {
      if(event.target.value != 0){
      this.workareaid = event.target.value;
      employee.getempbyworktypeid(this.workareaid).then(doc => {
        this.emparr = doc.data;
      });
      }
    }
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
