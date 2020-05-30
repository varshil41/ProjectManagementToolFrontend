<template>
 <div>
   <menu1></menu1>
           <div id="main-content">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2>Announcement List</h2>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard"><i class="icon-home"></i></router-link></li>
                                <li class="breadcrumb-item">Announcements</li>
                                <li class="breadcrumb-item active">Announcement List</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="row clearfix">
                    <div class="col-lg-12 col-md-12">
                        <div class="card">
                            <div class="body project_report">
                                <div class="table-responsive">
                                    <p>General Announcement</p>
                                    <table class="table table-hover js-basic-example dataTable table-custom m-b-0">
                                            <tr>
                                                <th>Actions</th>
                                                <th>Announcement Title</th>
                                                <th>Announcement Content</th>
                                                <th>Announcement Date</th>
                                                <th>Announcement Time</th>
                                            </tr>
                                        <tbody>
                                            <tr v-for="(item,id) in  ancearr" v-bind:key="id">
                                                <td class="project-actions">
                                                    <router-link v-bind:to="'/updateannouncement/' + item.announcementId +'/'+1" class="btn btn-sm btn-outline-success"><i class="icon-pencil"></i></router-link>
                                                    <a @click="ondelete(item.announcementId)" href="javascript:void(0);"
                                                        class="btn btn-sm btn-outline-danger"
                                                        title="Delete" data-type="confirm"><i
                                                            class="icon-trash"></i></a>
                                                </td>
                                                <td class="project-title">
                                                  <b>{{item.announcementTitle}}</b>
                                                </td>
                                                <td class="project-title"><a @click="oncontent(item.announcementMessage)" href="javascript:void(0);" data-toggle="modal" data-target="#viewcontent">
                                                  Show Content</a>
                                                </td>
                                                <td>
                                                  {{item.announcementTime | moment("Do MMMM YYYY")}}
                                                </td>
                                                <td>
                                                  {{item.announcementTime | moment("HH:mm:ss")}}
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
                    <div class="col-lg-12 col-md-12">
                        <div class="card">
                            <div class="body project_report">
                                <div class="table-responsive">
                                    <p>Project Announcement</p>
                                    <table class="table table-hover js-basic-example dataTable table-custom m-b-0">
                                            <tr>
                                                <th>Actions</th>
                                                <th>Project Name</th>
                                                <th>Announcement Title</th>
                                                <th>Announcement Content</th>
                                                <th>Announcement Date</th>
                                                <th>Announcement Time</th>
                                            </tr>
                                        <tbody>
                                            <tr v-for="(item,id) in  projectancearr" v-bind:key="id">
                                                <td class="project-actions">
                                                    <router-link v-bind:to="'/updateannouncement/' + item.projectAnnouncementId+'/'+2 " class="btn btn-sm btn-outline-success"><i class="icon-pencil"></i></router-link>
                                                    <a @click="onprojectdelete(item.projectAnnouncementId)" href="javascript:void(0);"
                                                        class="btn btn-sm btn-outline-danger"
                                                        title="Delete" data-type="confirm"><i
                                                            class="icon-trash"></i></a>
                                                </td>
                                                <td>{{item.projectName}}</td>
                                                <td class="project-title">
                                                  <b>{{item.projectAnnouncementTitle}}</b>
                                                </td>
                                                <td class="project-title"><a @click="oncontentproject(item.projectAnnouncementMessage)" href="javascript:void(0);" data-toggle="modal" data-target="#viewcontentproject">
                                                  Show Content</a>
                                                </td>
                                                <td>
                                                  {{item.projectAnnouncementTime | moment("Do MMMM YYYY")}}
                                                </td>
                                                <td>
                                                  {{item.projectAnnouncementTime | moment("HH:mm:ss")}}
                                                </td>

                                            </tr>
                                       </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>


<div class="modal fade" id="viewcontent" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h6 class="title" id="defaultModalLabel">General Announcement Details</h6>
            </div>
            <div class="modal-body">
                <div class="row clearfix">
                      <p style="margin-left:10px;">{{content}}</p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">CLOSE</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="viewcontentproject" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h6 class="title" id="defaultModalLabel">Project Announcement Details</h6>
            </div>
            <div class="modal-body">
                <div class="row clearfix">
                      <p style="margin-left:10px;">{{contentproject}}</p>
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
import anceclass from '../services/Announcement'
export default {
  data:function(){
    return{
      ancearr:[{}],
      projectancearr:[{}],
      announcementId:'',
      content:'',
      contentproject:'',
    }
  },
  created(){

   anceclass.getAllannouncement().then(doc=>{
        console.log(doc);
        for(let i=0;i<doc.data.length;i++)
        {
            this.ancearr=doc.data;
            console.log(this.ancearr);
        }
    })

    anceclass.getAllprojectannouncement().then(doc=>{
        this.projectancearr=doc.data;
    })
   },
  methods:{
     oncontent:function(content){
       this.content = content;
     },
    oncontentproject:function(content){
       this.contentproject = content;
     },
     ondelete:function(id)
     {
         anceclass.deleteAnnouncement(id).then(doc=>{
             console.log(doc);
             for(let i=0;i<this.ancearr.length;i++){
                if(this.ancearr[i].announcementId == id )
                {
                    this.ancearr.splice(i,1);
                }
      }
         })
     },
     onprojectdelete:function(id)
     {
         anceclass.deleteprojectAnnouncement(id).then(doc=>{
             console.log(doc);
             for(let i=0;i<this.projectancearr.length;i++){
                if(this.projectancearr[i].projectAnnouncementId == id )
                {
                    this.projectancearr.splice(i,1);
                }
      }
         })
     }
  }
}
</script>

<style scoped>

</style>
