<template>
  <div>
    <menu1></menu1>
    <div id="main-content">
      <div class="container-fluid">
        <div class="block-header">
          <div class="row">
            <div class="col-lg-6 col-md-8 col-sm-12">
              <h2>Add Clients</h2>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/dashboard"
                    ><i class="icon-home"></i
                  ></router-link>
                </li>
                <li class="breadcrumb-item">Clients</li>
                <li class="breadcrumb-item active">Add</li>
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
                      <input
                        type="text"
                        @input="onfname"
                        id="fname"
                        class="form-control"
                        placeholder="First Name "
                        v-model="client.clientFirstName"
                      />
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                      <input
                        type="text"
                        id="mname"
                        class="form-control"
                        placeholder="Middle Name"
                        v-model="client.clientMiddleName"
                      />
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                      <input
                        type="text"
                        @input="onlname"
                        id="lname"
                        class="form-control"
                        placeholder="Last Name"
                        v-model="client.clientLastName"
                      />
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                      <input
                        type="email"
                        autocomplete="off"
                        @input="onemail"
                        @change="onchangeemail"
                        id="email"
                        class="form-control"
                        placeholder="Email ID "
                        v-model="client.clientEmailId"
                      />
                      <div id="emailerror" class="error-message"></div>
                    </div>
                  </div>
                  <div class="col-md-3 col-sm-12">
                    <div class="form-group">
                      <input
                        type="tel" maxlength="10" class="js-input-mobile form-control"
                        @input="oncontact"
                        id="contact"
                        placeholder="Mobile No"
                        v-model="client.clientContactNo"
                      />
                   <div id="contacterror" class="error-message"></div>

                    </div>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <input
                        type="text"
                        id="org"
                        class="form-control"
                        placeholder="Organization"
                        v-model="client.clientOrgName"
                      />
                    </div>
                  </div>
                  <div class="col-md-11 col-sm-12">
                    <div class="form-group">
                      <input
                        type="text"
                        @input="onaddress"
                        id="address"
                        class="form-control"
                        placeholder="Address"
                        v-model="client.clientAddress"
                      />
                    </div>
                  </div>
                </div>
                <p style="color:green;" v-if="addflag">Client Added</p>
                <button
                  type="button"
                  @click="onaddclient"
                  class="btn btn-primary"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clientclass from "../services/client";
export default {
  data: function() {
    return {
      client: {
        clientFirstName: "",
        clientMiddleName: "",
        clientLastName: "",
        clientEmailId: "",
        clientContactNo: "",
        clientOrgName: "",
        clientAddress: ""
      },
      emailflag:0,
      addflag:false
    };
  },
  methods: {
    onaddclient: function() {
      if (this.client.clientFirstName == "") {
        document.getElementById("fname").focus();
        document.getElementById("fname").style = "border-color:red;";
      } else if (this.client.clientLastName == "") {
        document.getElementById("lname").focus();
        document.getElementById("lname").style = "border-color:red;";
      } else if (this.client.clientEmailId == "") {
        document.getElementById("email").focus();
        document.getElementById("email").style = "border-color:red;";
      } else if (this.emailflag == 0){
        document.getElementById("emailerror").innerHTML = "Enter valid emailId";
      } else if (this.client.clientContactNo == "") {
        document.getElementById("contact").focus();
        document.getElementById("contact").style = "border-color:red;";
      } else if (this.client.clientContactNo.length != 10) {
        document.getElementById("contacterror").innerHTML = "Enter valid mobileNo";
      } else if (this.client.clientAddress == "") {
        document.getElementById("address").focus();
        document.getElementById("address").style = "border-color:red;";
      }
      else {
        clientclass
          .addclient(this.client)
          .then(doc => {
            alert("client added");
            console.log(doc.data);
            this.client = "";
            this.$router.push({path:'/viewclient'});
          })
          .catch(err => {
            this.addflag = true;
          });
      }
    },
    onfname: function() {
      document.getElementById("fname").style = "border-color:lightgrey;";
    },
    onlname: function() {
      document.getElementById("lname").style = "border-color:lightgrey;";
    },
    onemail: function() {
      document.getElementById("email").style = "border-color:lightgrey;";
    },
    oncontact: function(event) {
       $('body').on('keyup', '.js-input-mobile', function () {
    var $input = $(this),
        value = $input.val(),
        length = value.length,
        inputCharacter = parseInt(value.slice(-1));

    if (!((length > 0 && inputCharacter >= 0 && inputCharacter <= 10) || (length === 1 && inputCharacter >= 7 && inputCharacter <= 10))) {
        $input.val(value.substring(0, length - 1));
     }
    });
      if(this.client.clientContactNo.length == 10){
          document.getElementById("contacterror").innerHTML = "";
      }
      document.getElementById("contact").style = "border-color:lightgrey;";
    },
    onaddress: function() {
      document.getElementById("address").style = "border-color:lightgrey;";
    },
    onchangeemail: function() {
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          this.client.clientEmailId
        )
      ) {
        document.getElementById("emailerror").innerHTML = "";
        this.emailflag = 1;
      } else {
        this.emailflag = 0;
      }
    }
  }
};
</script>

<style scoped>
.error-message {
  color: #cc0033;
  display: inline-block;
  font-size: 12px;
  line-height: 15px;
  margin: 5px 0 0;
}
</style>
