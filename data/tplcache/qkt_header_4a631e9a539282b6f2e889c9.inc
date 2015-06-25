<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?>
<!--[if lt IE 9]>
        <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
      <![endif]-->
<nav class="navbar navbar-inverse navbar-fixed-top" id="header">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"> <span class="sr-only">轻课</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
      <a class="navbar-brand" href="#">轻课堂</a> </div>
    <div id="navbar" class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">课程</a></li>
        <li><a href="#">计划</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right hidden-sm">
        <li>
          <div class="search-area">
            <form id="search" action="" name="search-form" method="get">
              <input class="search-input" placeholder="搜索课程、问答" type="text" autocomplete="off" name="words" value="">
              <input type="button" class="btn_search js-btn-search">
            </form>
          </div>
          <!---登录--> 
        </li>
      	<ul id="_userlogin" class="nav navbar-nav navbar-right" >
        <li><a href=""   data-toggle="modal" data-target=".signin">登录</a></li>
        <li><a href="" class="link-register"  data-toggle="modal" data-target=".signin">注册</a></li>
        </ul>
      </ul>
    </div>
    <!--/.nav-collapse --> 
  </div>
</nav>
<script src="<?php echo $GLOBALS['cfg_templets_skin']; ?>/js/jquery.min.js"></script> 
<script src="<?php echo $GLOBALS['cfg_templets_skin']; ?>/js/bootstrap.min.js"></script> 
<!--模块-->

<div class="modal fade signin " tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
        <h4 class="modal-title" id="myModalLabel"> <span class="active-title">登录</span> <span>注册</span> </h4>
      </div>
      <div class="modal-body">
        <div class="singIn">
          <form class="logIn"  action="<?php echo $GLOBALS['cfg_memberurl']; ?>/index_do.php" method="POST">
          <input type="hidden" name="fmdo" value="login">
        <input type="hidden" name="dopost" value="login">
            <div class="form-group">
              <label for="exampleInputEmail1" class="sr-only">用户名：</label>
              
              <input type="text" class="form-control ipt ipt-emall" id="exampleInputEmail1" name="userid" size="20"  placeholder="请输入邮箱">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1" class="sr-only">密码：</label>
              <input type="password" class="form-control ipt ipt-pwd" id="exampleInputPassword1"   name="pwd" size="20" placeholder="请输入密码">
            </div>
             
          
            <?php
if(preg_match("#2#", $safe_gdopen))
        {
        echo '
        <div class="form-group clearfix" >
       
         <input type="text" name="vdcode" size="8" class="ipt ipt-verify l" placeholder="请输入验证码" />
           <a href="javascript:void(0)" class="verify-img-wrap js-verify-refresh"> <img id="vdimgck" align="absmiddle" onClick="this.src=this.src+\'?\'" style="cursor:pointer;margin-left:0px;text-transform:uppercase;" alt="看不清？点击更换" src="'.$cfg_cmspath.'/include/vdimgck.php" width="100"/>
           </a><span class="verify-extra r"> 看不清<br>
         <a href="javascript:void(0)"  onclick="changeAuthCode();"  class="js-verify-refresh">换一张</a> </span>
            <p class="rlf-tip-wrap"> <span style="display: none;">请输入右侧图片内容</span> </p>
         </div> 
        ';
        }
?>
            
            <div class="form-group clearfix">
            
            <button type="submit" class="btn btn-block bg-yellow yellow">提交</button>
            </div>
             <div class="form-group clearfix">
              <label for="auto-signin" class="l" hidefocus="true">
              
                <input type="checkbox" checked="checked"  value="2592000" name="keeptime" id="ra1">
                自动登录</label>
               
              <a href="<?php echo $GLOBALS['cfg_memberurl']; ?>/resetpassword.php" class="r" target="_blank" hidefocus="true">忘记密码 </a> </div>
            
          </form>
        </div>
        <div class="singUp" style="display:none;">
        <form class="logIn"  action="<?php echo $GLOBALS['cfg_cmspath']; ?>/member/reg_new.php"  id="regUser" name="form2">
          <input type="hidden" value="regbase" name="dopost"/>
          <input type="hidden" value="1" name="step"/>
          <input type="hidden" value="个人" name="mtype"/>
          
          <div class="form-group">
            <label for="exampleInputEmail1" class="sr-only">用户名：</label>
            <input type="text" class="form-control ipt ipt-emall" id="email" name="email" placeholder="请输入邮箱"/>
            <em id="_email">(每个电子邮邮箱只能注册一个帐号)</em> 
            </div>
          
            <input type="hidden" class="intxt w200" size="20" id="uname" name="uname"/>
           
          <div class="form-group">
            <label for="exampleInputPassword1" class="sr-only">密码：</label>
            <input type="password" onkeyup="setPasswordLevel(this, document.getElementById('passwordLevel'));" class="form-control ipt ipt-pwd" id="txtPassword"  name="userpwd" placeholder="请输入密码">
            <input id="passwordLevel" class="rank r2" disabled="disabled" name="Input"/>
          </div>
          <div class="form-group">
            <input type="password" id="userpwdok" name="userpwdok"  size="20" class="form-control ipt ipt-pwd" placeholder="请再次输入密码">
            <em id="_userpwdok"><font color="red"><b>×两次输入密码不一致</b></font></em> </div>
          <div class="form-group">
            <input type="text" name="userid" id="txtUsername" class=" form-control ipt ipt-nick" placeholder="请输入用户昵称">
            <em id="_userid">(可以使用中文，但禁止除[@][.]以外的特殊符号)</em> </div>
          <?php }?>
          <div class="form-group">
            <input type="text" name="vdcode"id="vdcode"   style="text-transform: uppercase;" class="ipt ipt-verify l" placeholder="请输入验证码">
            <a href="javascript:void(0)" onclick="changeAuthCode();" class="verify-img-wrap js-verify-refresh"><img class="verify-img" onclick="this.src=this.src+'?'" src="../include/vdimgck.php"  alt="看不清？点击更换" id="vdimgck"></a> <span class="verify-extra r"> 看不清<br>
            <a href="javascript:void(0)"  onclick="changeAuthCode();"  class="js-verify-refresh">换一张</a> </span>
            <p class="rlf-tip-wrap"> <span style="display: none;">请输入右侧图片内容</span> </p>
          </div>
          <?php }?>
          <button type="submit" class="btn btn-block bg-yellow yellow" id="btnSignCheck">注册</button>
        </form>
      </div>
    </div>
    <div class="modal-footer"> </div>
  </div>
  <!-- /.modal-content --> 
</div>
</div>
<script>
  $(function(){
	  $(".signin h4 span").each(function(index,value){
		var i=index;
		$(this).click(function(){
			$(".active-title").removeClass("active-title");
			$(this).addClass("active-title");
			$(".signin .modal-body>div").hide();
			$(".signin .modal-body>div:eq("+i+")").show();
			})  
		  
	  })
	  $(".link-register").click(function(){
		
		$(".active-title").removeClass("active-title");
			$(".signin h4 span:eq(1)").addClass("active-title");
			$(".signin .modal-body>div").hide();
			$(".signin .modal-body>div:eq("+1+")").show(); 
		  })
	  
	  })
	  
	 
	 
  </script> 
<script language="javascript" type="text/javascript" src="<?php echo $GLOBALS['cfg_cmsurl']; ?>/include/dedeajax2.js"></script> 
<script type="text/javascript" language="javascript" src='<?php echo $GLOBALS['cfg_cmspath']; ?>/member/templets/js/reg_new.js'></script> 
<script src='<?php echo $GLOBALS['cfg_cmspath']; ?>/member/templets/js/CheckPassStrength.js' type="text/javascript" language="javascript"></script>

<script>
function CheckLogin(){
	  var taget_obj = document.getElementById('_userlogin');
	  myajax = new DedeAjax(taget_obj,false,false,'','','');
	  myajax.SendGet2("<?php echo $GLOBALS['cfg_cmspath']; ?>/member/ajax_loginsta.php");
	  DedeXHTTP = null;
	}
</script>

  <script language="javascript" type="text/javascript">CheckLogin();</script> 
<script type="text/javascript" language="javascript">


var reMethod ='GET';
var pwdmin =<?php echo $GLOBALS['cfg_mb_pwdmin']; ?>;
function changeAuthCode() {
	var num = 	new Date().getTime();
	var rand = Math.round(Math.random() * 10000);
	num = num + rand;
	$('#ver_code').css('visibility','visible');
	if ($("#vdimgck")[0]) {
		$("#vdimgck")[0].src = "../include/vdimgck.php?tag=" + num;
	}
	return false;	
}

function hideVc()
{
	$('#ver_code').css('visibility','hidden');
}


$(document).ready(function(){ 
	$("#passwordLevel").removeClass().addClass("rank r0");
	$("#vdcode").focus(function(){
	  var leftpos = $("#vdcode").position().left;
	  var toppos = $("#vdcode").position().top - 42;
	  $('#ver_code').css('left', leftpos+'px');
	  $('#ver_code').css('top', toppos+'px');
	  $('#ver_code').css('visibility','visible');
	});
	$("input[type='password']").click(function(){
	  hideVc()
	});
	$("#txtUsername").click(function(){
	  hideVc()
	});
	$("input[type='radio']").focus(function(){
	  hideVc()
	});
	/*
	$("#vdcode").blur(function(){
		  $('#ver_code').css('visibility','hidden');
	});
	*/
})


</script>