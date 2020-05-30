<template>
  <div>
    <menu1></menu1>
         <div id="main-content">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2>Update Client</h2>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard"><i class="icon-home"></i></router-link></li>
                                <li class="breadcrumb-item">Clients</li>
                                <li class="breadcrumb-item">View Clients</li>
                                <li class="breadcrumb-item active">Update client</li>
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
                                        <div class="form-group">
                                            <input @input="firstname" id="firstname" type="text" class="form-control" placeholder="First Name *" v-model="clientArr.clientFirstName">
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-sm-12">
                                        <div class="form-group">
                                            <input @input="middlename" id="middlename" type="text" class="form-control" placeholder="Middle Name"  v-model="clientArr.clientMiddleName">
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-sm-12">
                                        <div class="form-group">
                                            <input @input="lastname" id="lastname" type="text" class="form-control" placeholder="Last Name"  v-model="clientArr.clientLastName">
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-sm-12">
                                        <div class="form-group">
                                            <input @input="emailid" id="emailid" type="text" class="form-control" placeholder="Email ID *"  v-model="clientArr.clientEmailId">
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-12">
                                        <div class="form-group">
                                            <input @input="mobileno" id="mobileno" type="tel" maxlength="10" class="js-input-mobile form-control" placeholder="Mobile No"  v-model="clientArr.clientContactNo">
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-12">
                                        <div class="form-group">
                                            <input @input="organization" id="organization" type="text" class="form-control" placeholder="Organization"  v-model="clientArr.clientOrgName">
                                        </div>
                                    </div>
                                    <div class="col-md-11 col-sm-12">
                                        <div class="form-group">
                                            <input @input="address" id="address" type="text" class="form-control" placeholder="Address"  v-model="clientArr.clientAddress">
                                        </div>
                                    </div>



                                </div>
                                <p style="color:green;" v-if="updateflag">Update Successfully</p>

                                <button type="button" @click="Onupdate" class="btn btn-primary">Update</button>
                                <button type="button" @click="Onback" class="btn btn-primary">Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>

</template>

<script>
import client from '../services/client'
export default {
    data:function(){
      return{
        clientid:'',
        clientArr:{},
        updateflag:false
      }
    },
    created(){
      this.clientid = this.$route.params.clientid;
      client.getClientById(this.clientid).then(doc=>{
        this.clientArr = doc.data[0];
        console.log(this.clientArr);
      })
    },
    methods:{
      firstname:function(){
       document.getElementById("firstname").style = "border-color:lightgrey;"
      },
      middlename:function(){
       document.getElementById("middlename").style = "border-color:lightgrey;"
      },
      lastname:function(){
       document.getElementById("lastname").style = "border-color:lightgrey;"
      },
      emailid:function(){
       document.getElementById("emailid").style = "border-color:lightgrey;"
      },
      mobileno:function(){
        $('body').on('keyup', '.js-input-mobile', function () {
    var $input = $(this),
        value = $input.val(),
        length = value.length,
        inputCharacter = parseInt(value.slice(-1));

    if (!((length > 0 && inputCharacter >= 0 && inputCharacter <= 10) || (length === 1 && inputCharacter >= 7 && inputCharacter <= 10))) {
        $input.val(value.substring(0, length - 1));
     }
    });
       document.getElementById("mobileno").style = "border-color:lightgrey;"
      },
      organization:function(){
       document.getElementById("organization").style = "border-color:lightgrey;"
      },
      address:function(){
       document.getElementById("address").style = "border-color:lightgrey;"
      },
      Onupdate:function(){
        if(this.clientArr.clientFirstName == ""){
            document.getElementById("firstname").focus();
            document.getElementById("firstname").style = "border-color:red;"
        }
        else if(this.clientArr.clientMiddleName == ""){
            document.getElementById("middlename").focus();
            document.getElementById("middlename").style = "border-color:red;"
        }
        else if(this.clientArr.clientLastName == ""){
            document.getElementById("lastname").focus();
            document.getElementById("lastname").style = "border-color:red;"
        }
        else if(this.clientArr.clientEmailId == ""){
            document.getElementById("emailid").focus();
            document.getElementById("emailid").style = "border-color:red;"
        }
        else if(this.clientArr.clientContactNo == ""){
            document.getElementById("mobileno").focus();
            document.getElementById("mobileno").style = "border-color:red;"
        }
        else if(this.clientArr.clientOrgName == ""){
            document.getElementById("organization").focus();
            document.getElementById("organization").style = "border-color:red;"
        }
        else if(this.clientArr.clientAddress == ""){
            document.getElementById("address").focus();
            document.getElementById("address").style = "border-color:red;"
        }
        else{
        client.updateclient(this.clientArr).then(doc=>{
          console.log(doc.data);
            this.updateflag = true;
            this.$fire({
                    title: "Updated successfully",
                    type: "success",
                    timer: 3000
                    }).then(r => {
                    console.log(r.value);
                    });
                    this.$router.push({path:'/viewclient'});
            })
        }
      },
      Onback:function(){
        this.$router.push("/viewclient");
      }
    }

}
</script>
