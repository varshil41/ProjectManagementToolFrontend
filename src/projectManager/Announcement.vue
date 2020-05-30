<template>
<div>
  <menu1></menu1>
        <div id="main-content">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2>Add Announcement</h2>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard"><i class="icon-home"></i></router-link></li>
                                <li class="breadcrumb-item">Announcement</li>
                                <li class="breadcrumb-item active">Add Announcement</li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div class="row clearfix">

                    <div class="col-12">

                        <div class="card">
                            <div class="body">
                                <div class="row clearfix">
                                    <div class="col-md-4 col-sm-12">
                                        <button @click="onclickview" class="btn btn-sm btn-outline-success"><b>VIEW All ANNOUNCEMENTS</b></button><br><br>
                                        <div class="form-group">
                                            <textarea @input="ontitle" id="title" cols="100" rows="3"  placeholder="Announcement Title" v-model="ann.announcementTitle"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <textarea @input="onmessage" cols="100" id="message" rows="10"  placeholder="Write Your Announcements Here !!! *" v-model="ann.announcementMessage"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <p style="color:green;" v-if="addflag">Added Successfully</p>
                                <button type="button" @click="onaddannouncement" class="btn btn-primary">POST ANNOUNCEMENT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import anceclass from '../services/Announcement'
export default {
  data:function(){
    return{
      ann:{
        announcementTitle:"",
        announcementMessage:"",
      },
      addflag:false
    }
  },
  methods:{
    onaddannouncement:function(){
      if(this.ann.announcementTitle === "")
      {
        document.getElementById("title").focus();
        document.getElementById("title").style = "border-color:red;"
      }
      else if(this.ann.announcementMessage == "")
      {
        document.getElementById("message").focus();
        document.getElementById("message").style = "border-color:red;"
      }
      else{
       anceclass.addannouncement(this.ann).then(doc=>{
          this.addflag = true;
          console.log(doc.data);
          this.client = '';
                  this.ann.announcementTitle = "";
          this.ann.announcementMessage = "";

        }).catch(err=>{
          alert("Something problem");
        })
      }
    },
    onclickview:function(){
        this.$router.push({path:'/announcementview/'});
    },
    ontitle:function(){
       document.getElementById("title").style = "border-color:lightgrey;"
    },
    onmessage:function(){
       document.getElementById("message").style = "border-color:lightgrey;"
    },

  }
}
</script>

<style scoped>

</style>
