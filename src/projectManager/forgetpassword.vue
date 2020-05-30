<template>
   <div class="theme-orange">
        <div id="wrapper">
		<div class="vertical-align-wrap">
			<div class="vertical-align-middle auth-main">
				<div class="auth-box">
                    <div class="top">
                        <img src="../assets/images/logologin.png" style="border-radius:30px;">
                    </div>
					<div class="card">
                        <div class="header">
                            <p class="lead">Enter received OTP</p>
                        </div>
                        <div class="body">
                            <p>Please Enter OTP</p>
                            <form class="form-auth-small" name="f1" @submit.prevent="onforget">
                                <div class="form-group">
                                    <input  v-model="otp" id="otp" name="otp"  class="form-control" placeholder="Enter OTP here">
                                    <div id="emailerror" class="error-message"></div>
                                </div>
                                <button type="submit" @click="onforget" class="btn btn-primary btn-lg btn-block">RESET PASSWORD</button>
                                <div class="bottom">
                                    <span class="helper-text">Know your password? <router-link to="/">Login</router-link></span>
                                </div>
                            </form>
                        </div>
                    </div>
				</div>
			</div>
		</div>
	</div>
   </div>
</template>

<script>
import login from '../services/login'
export default {
  data:function(){
    return{
      email:'',
      otp:'',
      emparr:[{}],
    }
  },
  methods:{
    onforget:function(){
         if(this.otp==this.emparr.otp)
         {
            this.$router.push({path:'/forgetpassword1/' + this.email});
         }
         else
         {
            this.$fire({
                    title: "Incorrect OTP",
                    type: "warning",
                    timer: 3000
                    }).then(r => {
                    console.log(r.value);
            });/*
            this.$router.push({path:'/'});  */
         }
    },
  },
  created(){
    this.email=this.$route.params.email;
    login.getempbyemailid(this.email).then(doc=>{
      this.emparr=doc.data[0];
      console.log(this.emparr);
    })
  }
}
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
