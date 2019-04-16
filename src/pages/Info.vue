<template>
  <div class="zong" style="height:100%;">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div class="xxzxx">
            <span class="el-icon-arrow-left" @click="back"></span>
            <div>基本信息</div>
            <span @click="submitForm('ruleForm')">保存</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="character-edit-background">
      <div class="img-container">
        <img src="../assets/3.jpg" alt>
      </div>
    </div>
    <div class="character-edit-list security-info">
      <div class="edit-list-container container container-row">
        <div>
          <!-- react-text: 322 -->
          昵称
          <!-- /react-text -->
          <!-- react-text: 323 -->
          :
          <!-- /react-text -->
        </div>
        <!-- <input class="input error-input" v-model="blueberry"> -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item style="margin-bottom:0;" prop="blueberry">
            <el-input class="ind" v-model="ruleForm.blueberry"></el-input>
          </el-form-item>
        </el-form>
        <!-- <div class="nick-invalid">昵称最大长度不能超过10个汉字或20个字符</div> -->
      </div>
      <div class="edit-list-container container container-row">
        <div>
          <!-- react-text: 327 -->
          性别
          <!-- /react-text -->
          <!-- react-text: 328 -->
          :
          <!-- /react-text -->
        </div>
        <div class="edit-sex-list">
          <a class>
            <span class="el-icon-info"></span>
          </a>
          <a class>
            <span class="el-icon-warning"></span>
          </a>
          <a class="button-yellow">
            <span class="el-icon-question"></span>
          </a>
        </div>
      </div>
      <div class="logout-container">
        <div class="logout-button" @click="out">退出</div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    this.blueberry = localStorage.getItem("name");
    return {
      ruleForm: {
        blueberry:this.blueberry
      },
      rules: {
        blueberry: [
           { required: true, message: "请输入密码", trigger: "blur" },
           { min: 3, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    out(){
      localStorage.setItem("token","")
      this.$router.push("/myperson");
    },
    back() {
      this.$router.push("/myperson");
    },
    submitForm(formName) {
      let username = localStorage.getItem("username");
      let name = this.ruleForm.blueberry
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _this = this;
          this.$axios
            .post(
              "http://47.102.102.242:3008/users/update",
              qs.stringify(
                {
                  username: username,
                  name:name
                },
                // { inputEmail:"zx",inputPassword:123 },
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
                },
                {
                  withCredentials: true
                }
              )
            )
            .then(function(res) {
              if (res.status == 200) {
                localStorage.setItem("name",name)
              } 
            })
            .catch(function(error) {
              // console.log(error);
            });
        }
      })
    }
  }
};
</script>
<style scoped>
.zong {
  height: 100%;
  display: -ms-flexbox;
  display: flex;
  box-orient: vertical;
  -ms-flex-direction: column;
  flex-direction: column;
  -moz-flex-direction: column;
  position: relative;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #333;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.xxzxx {
  display: flex;
  flex: 1;
  text-align: center;
  position: relative;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: -ms-flexbox;
  box-orient: horizontal;
  -ms-flex-direction: row;
  flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-pack: space-between;
  justify-content: space-between;
  -ms-flex-align: space-between;
  align-items: space-between;
  color: #cccccc;
}
.xxzxx span {
  padding: 0 1rem;
  font-size: 0.85rem;
}
.xxzxx div {
  font-size: 1rem;
}
.character-edit-background {
  background: url(../assets/2.jpg) no-repeat;
  background-size: cover;
  height: 13.375rem;
  display: -ms-flexbox;
  display: flex;
  box-orient: vertical;
  -ms-flex-direction: column;
  flex-direction: column;
  -moz-flex-direction: column;
}
.character-edit-background .img-container {
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 1;
  flex: 1;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
}
.character-edit-background img {
  border-radius: 50%;
  width: 3.75rem;
  height: 3.75rem;
}
.character-edit-list {
  background-color: white;
  padding-left: 1rem;
  padding-right: 1rem;
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 1;
  flex: 1;
  box-orient: vertical;
  -ms-flex-direction: column;
  flex-direction: column;
  -moz-flex-direction: column;
}
.security-info .edit-list-container {
  position: relative;
}
.character-edit-list .edit-list-container {
  padding-top: 1rem;
  padding-bottom: 1rem;
  -ms-flex-align: center;
  align-items: center;
}
.container-row {
  -ms-flex-direction: row;
  flex-direction: row;
  height: auto;
}
.container-row {
  display: -ms-flexbox;
  display: flex;
  max-height: 100%;
  width: 100%;
}
.character-edit-list .logout-container {
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 1;
  flex: 1;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: end;
  align-items: flex-end;
}
.character-edit-list .edit-list-container div {
  min-width: 3rem;
  font-size: 1rem;
  color: #666666;
}

.security-info .edit-list-container .ind{
  height: 2.5rem;
  margin-left: 0;
  padding-left: 1rem;
  width: 75%;
}
.security-info .edit-list-container .nick-invalid,
.security-info .edit-list-container .name-error {
  position: absolute;
  bottom: -1.35rem;
  color: #ff5722;
  font-size: 0.8125rem;
  margin-top: 0px;
  margin-left: 3.15rem;
}
.character-edit-list .edit-list-container div {
  min-width: 3rem;
  font-size: 1rem;
  color: #666666;
}
.character-edit-list .edit-list-container input {
  margin-left: 1rem;
  width: 100%;
  border: 0;
  font-size: 1rem;
  color: #333333;
}
.character-edit-list .edit-list-container .edit-sex-list {
  display: -ms-flexbox;
  display: flex;
  box-orient: horizontal;
  -ms-flex-direction: row;
  flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-align: center;
  align-items: center;
  margin-left: 1rem;
  height: 2rem;
}
.character-edit-list .edit-list-container .edit-sex-list a {
  margin-right: 2rem;
}
.character-edit-list .edit-list-container .edit-sex-list .iconfont {
  color: #e5e5e5;
  font-size: 2rem;
}
.character-edit-list .logout-container .logout-button {
  width: 18rem;
  height: 3rem;
  font-size: 1rem;
  border: 0.0625rem solid #666666;
  color: #666666;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 1rem;
}
</style>

