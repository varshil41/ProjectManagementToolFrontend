<template>
<div>
  <menu1></menu1>
        <div id="main-content">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2>Update Announcement</h2>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard"><i class="icon-home"></i></router-link></li>
                                <li class="breadcrumb-item">Announcement</li>
                                <li class="breadcrumb-item active">Update Announcement</li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div class="row clearfix">

                    <div class="col-12">

                        <div class="card" v-if="genflag">
                            <div class="body">
                                <div class="row clearfix">
                                    <div class="col-md-4 col-sm-12">
                                        <div class="form-group">
                                            <textarea cols="100" rows="3"  placeholder="Announcement Title" v-model="ann.announcementTitle"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <textarea cols="100" rows="10"  placeholder="Write Your Announcements Here !!! *" v-model="ann.announcementMessage"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <!-- <p style="color:green;" v-if="updateflag">Update Successfully</p> -->

                                <button type="button" @click="onupdate" class="btn btn-primary">UPDATE ANNOUNCEMENT</button>
                                <button type="button" @click="onback" class="btn btn-primary">BACK</button>

                            </div>
                        </div>


                        <div class="card" v-if="proflag">
                            <div class="body">
                                <div class="row clearfix">
                                    <div class="col-md-4 col-sm-12">
                                        <div class="form-group">
                                            <textarea cols="100" rows="3"  placeholder="Announcement Title" v-model="projectann.projectAnnouncementTitle"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <textarea cols="100" rows="10"  placeholder="Write Your Announcements Here !!! *" v-model="projectann.projectAnnouncementMessage"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <!-- <p style="color:green;" v-if="updateflag">Update Successfully</p> -->

                                <button type="button" @click="onupdate" class="btn btn-primary">UPDATE ANNOUNCEMENT</button>
                                <button type="button" @click="onback" class="btn btn-primary">BACK</button>

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
      updateflag:false,
      ann:{
        announcementId:'',
        announcementTitle:"",
        announcementMessage:"",
      },
      projectann:{
          projectAnnouncementId:'',
        projectAnnouncementTitle:"",
        projectAnnouncementMessage:"",
      },
      token:0,
      genflag:false,
      proflag:false,
    }
  },
  methods:{
    onupdate:function(){
        if(this.token==1)
        {
            anceclass.updateannouncement(this.ann).then(doc=>{
            this.updateflag = true;
            this.$fire({
                    title: "Updated successfully",
                    type: "success",
                    timer: 3000
                    }).then(r => {
                    console.log(r.value);
                    });
                    this.$router.push({path:'/announcementview'});
            })
        }
        else if(this.token==2)
        {
            anceclass.updateprojectannouncement(this.projectann).then(doc=>{
            this.updateflag = true;
            this.$fire({
                    title: "Annoucment Update successfully",
                    type: "success",
                    timer: 3000
                    }).then(r => {
                    console.log(r.value);
                    });
                    this.$router.push({path:'/announcementview'});
            })
        }
        
    },
    onback:function(){
      this.$router.push({path:"/announcementview/"});
    }
  },
  created(){
      this.token=this.$route.params.token;
        console.log(this.token);
      if(this.token==1){
          this.genflag=true;
          this.proflag=false;
          this.ann.announcementId=this.$route.params.id;
          anceclass.getannouncementbyid(this.ann.announcementId).then(doc=>{
          console.log(doc);
          this.ann.announcementTitle=doc.data[0].announcementTitle;
          this.ann.announcementMessage=doc.data[0].announcementMessage;
          })
      }
      else if(this.token==2)
      {
          this.proflag=true;
          this.genflag=false;
        this.projectann.projectAnnouncementId=this.$route.params.id;
          anceclass.getprojectannouncementbyid(this.projectann.projectAnnouncementId).then(doc=>{
          console.log(doc);
          this.projectann.projectAnnouncementTitle=doc.data[0].projectAnnouncementTitle;
          this.projectann.projectAnnouncementMessage=doc.data[0].projectAnnouncementMessage;
          })
      }
      
  }
}
</script>

<style scoped>

</style>
