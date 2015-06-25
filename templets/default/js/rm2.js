/*//////////////////////////////////

更新：2013.12.09  
by: ken

*//////////////////////////////////

document.createElement("header");
document.createElement("nav");
document.createElement("article");
document.createElement("footer");
document.createElement("time");
document.createElement("section");
document.createElement("hgroup");
document.createElement("figure");
document.createElement("video");

var column=true;
var ONsetInterval = 0;//是否处于滚动状态
if (!page) var page = {};
page.id= 0;////默认栏目
page.column = [{"column": true },{"column": true},{"column": true},{"column": true},{"column": true},{"column": true}];



//////////////////////////////////////////////////////滚动窗口
function Buffer( aa ){

	var bbb;
	ONsetInterval =1;
	var hcY = $(document).scrollTop();
	var foo = function(){
		var y = foo.cc;
		if ( hcY < y ){
			hcY +=  Math.ceil(0.2*( y - hcY ));
			hcY = (Math.abs(y - hcY) <2 )? y : hcY;
			to = "下";
		}
		if( hcY > y ){
			hcY +=( y - hcY )/ 5;
			hcY = (Math.abs(y - hcY) <2 )? y : hcY;
			to = "上" ;
		}
		if ( hcY == y) {
			clearInterval( bbb );
			ONsetInterval = 0;
		}
		$(document).scrollTop( hcY );
	};
	foo.cc = aa;
	bbb = setInterval( foo, 20);
}

///////////////////////////////////////////////////显示栏目
var windowH, windowW, documentH
function showPage( n ){
	
	//n = n-1;
	windowH = $(window).height();
	windowW = $(window).width();
	
	var toY = n * windowH;
	if ( ONsetInterval == 0 ) {
		Buffer(toY);
	}
	//alert( "显示第 "+ n +" 页" );
	//$(document).scrollTop(y);
	showMenu( page.id = n );
	columnShow( n );
}
///////////////////////////////////////////////////END
function closeNotSupport(){//低版本IE显示的提示信息点击关闭
	var c = $(".NotSupport");
	c.click(function(){
		$(this).fadeOut();
	});
}
///////////////////////////////////////////////////显示菜单
function showMenu( p ){
	//alert("显示菜单："+ p);
	var navLink = $(".menuUl").find(".nava");
	$( navLink ).each(function(i, val ){
		var menuLink = $(this);//String()
		if ( i == ( p ) ){
			menuLink.addClass("navover");
		}else{
			menuLink.removeClass("navover");
		}
	});
	
	$(".columnlia").each(function(index, element) {
		if ( p == index ){
			$(this).addClass("columnliaover");
		}else{
			$(this).removeClass("columnliaover");
		}
	});
}


///////////////////////////////////////////////////显示当前所处栏目
function CalculateN( ) {
	var windowH = $(window).height();//滚动条位置
	var scrollTop = $(window).scrollTop();//窗口高度
	documentH = $(document).height();//文档高度
	var onClass = Math.floor(scrollTop/windowH);
	showMenu( onClass );
}
$(window).scroll(function () { 
	CalculateN();
	var scrollTop = $(window).scrollTop();
	//alert( "当前页数="+ onClass + "    scrollTop:"+scrollTop+"  windowH:"+windowH)
	//菜单置顶
	if ( scrollTop > 58) { 
	  $("#nav").addClass("fixed");
	}else if( scrollTop < 58){
	  $("#nav").removeClass();
	}; 
	//END
	//showPage( x )
});

///////////////////////////////////////////////////右边点点点状态
function columnShow( p ){
	var column = $(".column");
	$.each( page.column, function( i, v) {
		if (i == p){
			if ( page.column[i].column == false ){
				//alert( "p = "+ p +"  hide="+ hide+  "  目前状态："+ columnarr[ p ].column )
				column.stop().animate({opacity:0}, 600,function(){
					$(this).css({"display":"none"});
				});//
			}else{
				column.css({"display":"block"});
				column.stop().animate({opacity:1}, 600);//
			}
			//alert( "p = "+ p +"  hide="+ hide+  "  目前状态："+ columnarr[ p ].column )
		}
	});
}


/////////////////////////////////////////////////窗口大小改变时
$(window).resize(function() {
		
	windowW = $(window).width();
	windowH = $(window).height();
	CalculateN();
	$(".pageBox").height( $(window).height() );
	showIn();
	about();
	page3();
	ideas();
	showPage( page.id );
	
	
	//背景图
	var bgH = $(window).height() -80;//80是下边的额外部分
	var pbg= $(".pagebg");
	var pbgW = pbg.width();
	var pbgH = pbg.height();
	var bl, a, b;
	bl = ( (a = windowW / pbgW ) > ( b = bgH / pbgH) )  ? a : b;
	pbg.width( pbgW * bl );
	pbg.height( pbgH * bl );
	
	
	//首页大图
	var ibg= $(".inCaseimgB");
	var maskH = $(window).height() - 320;//320是去掉上下的额外元素高度
	var ibgW = $(".inCaseimgB").width();
	var ibgH = $(".inCaseimgB").height();
	var inbl, c, d;
	inbl  = ( (c = windowW / ibgW) > (d = maskH / ibgH) )  ? c : d;
	ibg.width( ibgW * inbl );
	ibg.height( ibgH * inbl );
	var ibgtop = -((ibgH * inbl - maskH)/2);
	var ibgleft = -((ibgW * inbl - windowW)/2);
	ibg.css({"left": ibgleft , "top": ibgtop });
	
	//alert("windowW="+windowW+"   maskH="+maskH + "   图宽="+ ibgW+"  图高="+ ibgH +"  inbl="+ inbl +"  c="+ c +"   d="+ d+"   ibgtop="+ibgtop +"  ibgleft="+ ibgleft );	
	
});


///////////////////////////////////////////////////鼠标滚轮
function Roller(){
	var allpage = $(".nava").length; 
	function getWheelValue( e ) { 
		e = e||event; 
		return ( e.wheelDelta ? e.wheelDelta/120 : -( e.detail%3 == 0 ? e.detail/3 : e.detail ) ) ; 
	} 
	function stopEvent(e) { 
		e = e||event; 
		if( e.preventDefault )e.preventDefault(); 
		e.returnValue = false; 
	} 
	function addEvent( obj,type,fn ) { 
		var isFirefox = typeof document.body.style.MozUserSelect != 'undefined'; 
		if( obj.addEventListener ) 
		obj.addEventListener( isFirefox ? 'DOMMouseScroll' : type,fn,false ); 
		else 
		obj.attachEvent( 'on'+type,fn ); 
		return fn; 
	} 
	function delEvent( obj,type,fn ) {
		var isFirefox = typeof document.body.style.MozUserSelect != 'undefined'; 
		if( obj.removeEventListener ) 
			obj.removeEventListener( isFirefox ? 'DOMMouseScroll' : type,fn,false ); 
		else 
		obj.detachEvent( 'on'+type,fn ); 
	} 
	handler = addEvent( document,'mousewheel',function(e) { 
		stopEvent( e ); 
		var delta = getWheelValue(e);
		
		if ( !ONsetInterval ){
			var gl = page.id;
			gl = (delta <0 )? gl += 1 : gl -= 1;//把数值反过来
			//alert(" page.id ="+ page.id );
			//alert(" page ="+ page +"   delta= "+ delta +"     navLink.length="+ $(".nava").length );
			if( gl >= allpage ){ gl = allpage-1;}
			if( gl < 0 ){ gl = 0;}
			showPage( page.id = gl );
		}
	});

}
///////////////////////////////////////////////////首页大图
function showIn(){
	var openN = 0;
	var obj = ".inCaseli";
	function indexPic( n ){
	  $( obj ).each(function(i){
			var Obj = $(this);
			var Cbtn = $(this).find(".inCase_btn");
			var CInfo = $(this).find(".inCase_MoreInfo");
			Cbtn.css({display:"none",opacity:0});
			CInfo.css({display:"none",opacity:0});
		if (i != n){
			Obj.addClass("inClose");
			Obj.stop().animate({height:'70px'}, 400);
		}
		if ( i == n ){
			Obj.removeClass("inClose");
			var objHeight = $(window).height() - 100 -80 - 140;
			Obj.stop().animate({height:objHeight}, 300,function(){
				Cbtn.stop().show().animate({opacity:1}, "slow");
			});
			
			Cbtn.click(function(){
				Cbtn.stop().animate({opacity:0}, "slow");
				var t = ( $(window).height()- CInfo.height() -100 - 80 - 140 )/2;
				var l = ( $(window).width()- CInfo.width() )/2;
				
				CInfo.css({left:l,top:t});
				if($(this)==$(".inCase_btn")[0]){
					
					l=l+350;
					$(".inCase_MoreInfo:eq(0)").css({left:l,top:t});
					}
				CInfo.stop().show().animate({opacity:1}, "slow");
			});
			Obj.find(".inCase_infoClose").click(function(){
			 	Cbtn.stop().animate({opacity:1}, "slow");
				CInfo.stop().animate({opacity:0}, "fast");
			});
		  }
	  });
	}
	$( obj ).each(function(i){
	  $(this).find(".Pic_hideJT").click(function(){
			indexPic( i );
	  });
	});
	indexPic( openN );
}


///////////////////////////////////////////////////关于
function about(){
	
	//定位左边
	var arL,arT
	var aPic = new Image()
	aPic = $(".about_picli");
	var apBox = $(".about_picBox");
	var apli = $(".about_picli");
	var aPall=$(".about_picall")
	var aJT = $(".about_jt");
	var al = $(".about_leftpic")
	var ar = $(".about_right");
	var aPicW = 550;//aPic.width();
	var aPicH = 802;//aPic.height();
	var h = windowH - 80;
	ratio = h/aPicH;
	var w = ratio * aPicW;
	apBox.height(h);apBox.width(w);
	aPall.width(w);
	
	apli.height(h);apli.width(w);
	//alert("h = "+ h+"   w="+ w +"   缩放比是="+ ratio+"    aPicW="+aPicW+"    aPicH="+ aPicH+"       aPic="+ aPic);
	$(aPic).each(function(i){
		$(this).height( h );$(this).width( w );
	});
	aJT.css({right:w, bottom:0});
	ar.height(h); 
	ar.width(w);
	
	//右边
	arL =  (windowW - w- al.width())/2 ;
	arT =  (h - al.height())/2 + 50;
	
	al.css({left:arL, top:arT});
	//alert("屏幕宽="+windowW+"    w="+w +"   h"+h+"   arL = "+ arL +"   arT="+ arT +"   右边宽="+ ar.width() );
	//alert("屏幕高="+windowH+"    h="+h+"   arT="+ arT +"    右边块高="+ ar.height());
}


///////////////////////////////////////////////////滚动
///////////////////////////////////////////////////
//	Direction 方向(左右上下, 1234 )
//	mask 活动区域
//	main 活动主体
//	Arrow1 箭头左/上 
//	Arrow2 箭头右/下 
//	length 总屏数
//	position 一屏一个点 
//	positionOver 当前屏/点 
//	positiontxt 定位文字
///////////////////////////////////////////////////
function rollObj( Direction, mask, main, Arrow1, Arrow2, length, position, positionover, positiontxt ){
	var sport
	var p = 0;//当前的
	var on;
	var mainDiv = $(main);
	
	//alert( "length="+ length );
	function fy( n ){
		//alert( "n="+n +  "   page="+page);
		if (Direction == 1 ){//向左
			sport = $(mask).width();
			var toX = -(n * sport);
			$(main).stop().animate({ marginLeft:toX, opacity:1}, "slow");
		}
		if (Direction == 2 ){//向右
			sport = $(mask).width();
			var toX = -(n * sport);
			$(main).stop().animate({ marginLeft:toX, opacity:1}, "slow");
			/**/
		}
		if (Direction == 3 ){//向上
			sport = $(mask).height();
			var toX = -(n * sport);
			$(main).stop().animate({ marginTop:toX, opacity:1}, "slow");
		}
		if (Direction == 4 ){//向下
			sport = $(mask).height();
			$(main).css({marginTop:0})//CInfo.css({left:l,top:t});
			var toX = - (length * sport) + (n * sport);
			$(main).stop().animate({ marginTop:toX, opacity:1}, "slow");
		}
		if ( positiontxt ){
			var Ptxt = new String()
			Ptxt = (n+1)+"/"+ length
			$(positiontxt).html( Ptxt );
		}
		if (position){
			$(position).each(function(i, v) {
				var d = $(this);
				if ( i != n ){
					d.removeClass(positionover);
				}else{
					d.addClass(positionover);
				}
			});
		}
	}
	$(Arrow1).click(function(){
		( p > 0)? fy( p -= 1 ): fy( p = length-1 );	
	});
	$(Arrow2).click(function(){
		( p < length-1 )? fy( p += 1 ):fy( p=0 );
	});
	
	if (position){
		$(position).each(function(index, element) {
			var d = $(this);
			//alert("index="+index);
			d.removeClass(positionover);
			d.click(function(){
				p=index;
				fy( p );
			});
		});
	}
	fy( p );
}



///////////////////////////////////////////////////案例
function page3(){
	 //$(window).height();
	//$(window).width();
	
	
	
	var proX = $(".proX")
	var prolist = $(".prolist");
	var page3li = $(".page3a");
	var DetailedX
	var loadObj =$("#caseC");
	var sollmask="caseM";
	var soll="caseScroll";
	
		var sollMask =$("#"+sollmask);
		var sollTrack = $("#caseBg");
		sollMask.height(windowH - 225);
		sollTrack.height(windowH - 225);
	
	function showPlist( numb ){
		//////////////////////////////////////显示列表，显示详细, sb=ture显示详细，false显示列表
		function showPx( sb ){
			
			if ( sb ){//详细页
				//////alert("DetailedX=" + DetailedX );
				page.column[ 2 ].column = false;
				columnShow( 2 );
				$(loadObj).load( DetailedX, function( a, b,c ){//"#dv_scroll_text"
					if( b =="success"){
						CM.intro.start( sollmask, soll );///////////////////自定义滚动条
						var close1 = $("#caseClose");
						close1.click(function(){
							showPx( false );
						});
					}
				});
				proX.stop().animate({ left: 0 , opacity:1}, "slow",function(){});
				prolist.stop().animate({ left: -(windowW) , opacity:0}, "slow");
			}else{
				page.column[ 2 ].column = true;
				columnShow( 2 );////
				proX.stop().animate({ left: windowW , opacity:0}, "slow");
				prolist.stop().animate({ left: 0 , opacity:1}, "slow");
			}
		}
		showPx( false );
		//////////////////////////////////////END
		page3li.each(function(i, aa){
			var aa = $( aa )
			aa.removeClass("p3over");
			if ( i > numb+10000 ){
				aa.addClass("p3over")
				var loadUrl = aa.find("a").attr("data");
				//alert( "加载："+ numb   +"   loadUrl="+ loadUrl );
				$(".prolist").load( loadUrl,function(responseTxt,statusTxt,xhr){
						if(statusTxt=="success"){//alert("外部内容加载成功！");
						  
							/////////按显示器大小改变列表图尺寸   BOX: 1080x520   PIC: 260x193
							var pBW, pBH, picw, pich
							pBW = 1080; pBH = 520;//PortfolioBox的原始尺寸
							var proBoxW = 900;//按屏幕分辨率改变宽度：1280   1366   1440   1680   1920   2560  
							proBoxW = ( windowW > 1400) ? 1050:proBoxW;
							proBoxW = ( windowW > 1600) ? 1150:proBoxW;
							proBoxW = ( windowW > 1900) ? 1260:proBoxW;
							
							var proBoxH = (proBoxW/pBW) * pBH;
							var PBox = $(".PortfolioBox");
							var proMask = $(".portfolio_workMask");
							var proLi = $(".Portfolio_li");
							var pJT1 = $("#Portfolio_jt_left");
							var pJT2 = $("#Portfolio_jt_right");
							
							var Mt = (windowH - proBoxH - 80  + 45 )/2 ;
							var proMaskw = proBoxW - 200;
							var jtTop = (proBoxH - pJT1.height() )/2
							
							picw = 260; pich = 193;
							proAW = proMaskw/4;
							imgW = proAW - 3;//图片宽
							imgH = (imgW/picw) * pich;
							proAH = imgH + 3;
							/////////////////////////////////////////////////////////////////////
							PBox.css({"width":proBoxW,"margin-top":Mt ,"height": proBoxH });//列表BOX
							proMask.css({"width":proMaskw, "height": proAH * 3 });//滚动MASK
							proLi.css({"width":proMaskw, "height":  proAH * 3 });//滚动LI
							pJT1.css({"top": jtTop });
							pJT2.css({"top":jtTop });
							
							/////////////////////////////////////////////////////////////////////
							var proA = $(".Portfolio_small");
							$( proA ).each(function(i, obj){
								obj = $(obj)
								obj.css({"width": proAW, "height": proAH });
								obj.click(function(){
									//alert("id="+id);
									DetailedX = obj.attr("data")
									//showPx( true );
								});
								var pimg = obj.find(".pimg");
								var Pback = obj.find(".PRO_back");
								pimg.css({"width":imgW, "height": imgH });//图片
								Pback.css({"width":imgW, "height": imgH });//LOGO
							});
							var pro_blank = $(".pro_blank");
							pro_blank.css({"width": proAW, "height": proAH });
							$(".pro_blank").find("h1").css({"width":imgW, "height": imgH });
						}
						/////////////////////////////////////////////////////////////////////
						//if(statusTxt=="error") //alert(loadUrl+" 加载失败");
				});
			}//END IF
		});
		//////////////////////////////////////END
	}
	//////////////////////////////////////END
	page3li.each(function(i, obj){
		var obja = $( obj );
		obja.click(function(){
			//alert(i +" = "+ obja );
			showPlist( i );
		});
	});
	showPlist( 0 );
}


///////////////////////////////////////////////////创意/ideas
function showIX( sb,url ){//sb=ture显示详细，false显示列表
	var idealist=$(".ideaList");
	var ideaX= $(".ideaX");
	var ideasollmask="ideaSM";
	var solldiv ="ideaScroll";
	var loadObj = $("#ideaC")
	
	
	if ( sb ){
		//////////////////////////////////////////////////////////////详细页
		page.column[ 3 ].column = false;
		columnShow( 3 );

		loadObj.load( url, function( a, b,c ){
			if( b =="success"){
				CM.intro.start( ideasollmask, solldiv );
			}
		});
		ideaX.animate({ left: 0 , opacity:1}, "slow",function(){});
		idealist.animate({ left: -(windowW) , opacity:0}, "slow");
	}else{
		page.column[ 3 ].column = true;
		columnShow( 3 );
		ideaX.animate({ left: windowW, opacity:0}, "slow");
		idealist.animate({ left: 0 , opacity:1}, "slow");
	}
}
function Viewidea( url ){
	var sollmask="ideaSM";
	var soll="ideaScroll";
	var loadObj = $("#ideaC")

	loadObj.load( url, function( a, b,c ){
			if( b =="success"){
				CM.intro.start( sollmask, soll );
			}
	});
}
//////////////////////////////////////////////////////
function ideas(){
	var idealist=$(".ideaList");
	var ideaX= $("ideaX");
	
	var sollMask =$("#ideaSM");
	var sollTrack = $("#ideaSBg");
	sollMask.height(windowH - 225);
	sollTrack.height(windowH - 225);
	
	//////////////////////////////////////
	var page4a= $(".page4a");
	function loadidealist( numb ){
		//alert( "加载："+ numb);
		showIX( false );
		page4a.each(function(i, aa){
			var aa = $( aa )
			aa.removeClass("p4over");
			
			//( i >= numb+10000){
				//aa.addClass("p4over");
				//var loadUrl = aa.find("a").attr("data");
				//idealist.load( loadUrl, function( a, b,c ){
					//if( b =="success"){
						/////////////////////////////////按显示器大小改变列表尺寸
						var iBox = $(".ideas_2");
						var iMask = $(".ideas_list");
						var iLi = $(".ideaspagebox");
						var iJT1 = $("#ideasl");
						var iJT2 = $("#ideasr");
						var ideas_li = $(".ideas_li")
						
						var pBW, pBH, blockw, blockh, iBoxW   
						pBW = 1080; pBH = 500;
						blockw = 410; blockh = 180;
						var iBoxW = 1000;// 屏幕分辨率：1280   1366   1440   1680   1920   2560  
						iBoxW = ( windowW > 1400) ? 1050:iBoxW;
						iBoxW = ( windowW > 1600) ? 1150:iBoxW;
						iBoxW = ( windowW > 1900) ? 1260:iBoxW;
						
						var iMaskw = iBoxW - 200;
						var iliW = (iMaskw- 60 )/2 ;
						var Mt = (windowH - pBH - 80  + 45 )/2 ;
												
						iBox.css({"width":iBoxW,"margin-top":Mt });//列表BOX
						iMask.css({"width":iMaskw });//滚动内容MASK
						iLi.css({"width":iMaskw });//滚动内容LI
						ideas_li.each(function(i, v){
							var ili = $(v);
							ili.css({"width":iliW,"margin-left":15,"margin-right":15, "margin-bottom":30 });
							ili.find("div").css({ "width": iliW-220 })
						});
						//////////////////////////////////////
					//}
				//});
				
			//}
		});
	}
	//////////////////////////////////////
	page4a.each(function(i, obj){
		var obja = $( obj );
		obja.click(function(){
			loadidealist( i );
		});
	});
	loadidealist( 0 );
	
}


///////////////////////////////////////////////////job

function closeJob(){
	var jobX = $(".jobX");
	var jobXbox = $(".jobX_box");
		jobX.stop().animate({ opacity:0}, "slow",function(){
			$(this).css("display","none");
		});
		jobXbox.stop().animate({ opacity:0}, "slow",function(){
			$(this).css("display","none");
		});
}

function page5(){
	var joba=$(".jobs_titlelink");
	var jobX = $(".jobX");
	var jobXbox = $(".jobX_box");
	
	
	joba.each(function(i, obj){
		var obja = $( obj );
		obja.click(function(){
			var url = obja.find("a").attr("data");
			//showJob( url );
			/////////////////////////////////////////////////////////////493是中间框的高度
			var bodTop = $(document).scrollTop() + (windowH - 470 )/2
			jobX.css({"display":"block","height":documentH});//
			jobXbox.css({"display":"block","top":bodTop});
			jobX.stop().animate({ opacity:1}, "slow");
			jobXbox.stop().animate({ opacity:1}, "slow");
			
			//alert( "加载："+ url+"   windowH="+ windowH +"   滚动条位置："+ $(document).scrollTop() );
			
			jobXbox.load( url );
			jobX.click( function(){
				closeJob();
			});
		});
	});
}
function Contact(){
	var weibo = $(".c_weibo");
	var weibo_p = $(".c_weibo_p");
	var weixin = $(".c_weixin");
	var weixin_p = $(".c_weixin_p");
	
	weibo.mouseover(function(){
		weibo_p.css( "display","block" )
		weibo_p.stop().animate({ opacity:1 }, 500);;
	});
	weibo.mouseout(function(){
		weibo_p.css( "display","block" )
		weibo_p.stop().animate({ opacity:0 },500,function(){
			weibo_p.css( "display","none" )
		});;
		
		
	});
	weixin.mouseover(function(){
		weixin_p.css( "display","block" )
		weixin_p.stop().animate({ opacity:1 }, 500);;
	});
	weixin.mouseout(function(){
		weixin_p.css( "display","block" )
		weixin_p.stop().animate({ opacity:0 },500,function(){
			weixin_p.css( "display","none" )
		});;
	});
	
	
}
///////////////////////////////////////////////////运行
$(function () { 
	showPage( page.id );
	closeNotSupport();
}); 
$(document).ready(function(){
	showIn();
	about();
	page3();
	ideas();
	page5();
	Roller();
	Contact();
	$(window).resize();
});
///////////////////////////////////////////////////
