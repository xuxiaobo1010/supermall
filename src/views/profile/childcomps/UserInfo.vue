<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <img  class="privateImage-svg left" src="../../../assets/img/leimu.jpg" alt="">
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <img src="../../../assets/img/phone.jpg" class="icon-mobile" alt="">
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <div class="right back">
        〉
      </div>
    </a>
    
  </div>
</template>

<script>
export default {
  name: "UserInfo"
};
</script>
<style  scoped>
 #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  }

  #user-info .privateImage-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }

  .left {
    float: left;
  }

  #user-info .arrow-svg {
    width: 11px;
    height: 22px;
    margin-top: 18px;
  }

  #user-info .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
  }

  #user-info .login-info .phone {
    position: relative;

    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
  }

  #user-info .login-info .phone .icon-mobile {
    position: absolute;
    width: 12px;
    height: 18px;
    left: -15px;
    top: 0px;
  }
 .back{
   color: #fff;
   margin-top: 18px;
   font-weight: 700;
 }
</style>