/*//////////////////////////////////

滚动条
修改：2013.1.09

*//////////////////////////////////

if (!Scrolling) var Scrolling = {};
//滚动条(Scrollbar)的构造
Scrolling.Scrollbar = function (o, s, t) {
	//私有变量
	var self = this;
	var _components = {};
	var _dimensions = {};
	var _temporary  = {};
	var _hasTween   = t ? true : false;
	var _timer, _ratio;
	
	//公共变量
	this.onMouseDown   = function (){};
	this.onMouseUp     = function (){};
	this.onScroll      = function (){};
	this.scrollAmount  = 5;
	this.scrollSpeed   = 30;
	this.disabled      = false;
	
	//初始化
	function initialize () {
		var c = _components;
		var d = _dimensions;
		var g = s.getDimensions();
		
		c.up     = findComponent("Scrollbar-Up", o);
		c.down   = findComponent("Scrollbar-Down", o);
		c.track  = findComponent("Scrollbg", o);
		c.handle = findComponent("ScrollButton", c.track);
		
		d.trackTop     = findOffsetTop(c.track);
		d.trackHeight  = c.track.offsetHeight;
		d.handleHeight = c.handle.offsetHeight;
		d.x = 0;
		d.y = 0
		
		if (_hasTween) t.apply(self);
		
		addEvent(s.getContent(), "mousewheel", scrollbarWheel);
		addEvent(o, "mousedown", scrollbarClickPrimer);
		
		self.reset();
	};
	
	function findOffsetTop (o) {
		var t = 0;
		if (o.offsetParent) {
			while (o.offsetParent) {
				t += o.offsetTop;
				o  = o.offsetParent;
			}
		}
		return t;
	};
	
	function addEvent (o, t, f) {
		if (o.attachEvent) o.attachEvent('on'+ t, f);
		else o.addEventListener(t, f, false);
	};
	
	function removeEvent (o, t, f) {
		if (o.detachEvent) o.detachEvent('on'+ t, f);
		else o.removeEventListener(t, f, false);
	};
	
	function findComponent (c, o) {
		var kids = o.childNodes;
		for (var i = 0; i < kids.length; i++) {
			if (kids[i].className && kids[i].className.indexOf(c) >= 0) {
				return kids[i];
			}
		}
	};
	
	function scroll (y) {
		if (y < 0) y = 0;
		if (y > _dimensions.trackHeight - _dimensions.handleHeight)
			y = _dimensions.trackHeight - _dimensions.handleHeight;

		_components.handle.style.top = y +"px";
		_dimensions.y = y;
		
		s.scrollTo(0, Math.round(_dimensions.y * _ratio));
		self.onScroll();
	};
	
	function scrollbarClickPrimer (e) {
		if (self.disabled) return false;
		
		e = e?e:event;
		if (!e.target) e.target = e.srcElement;
		
		scrollbarClick(e.target.className, e);
	};
	/////////////////////////////////////////////////////////////滚动条背景点击滚动效果
	function scrollbarClick (c, e) {
		var d  = _dimensions;
		var t  = _temporary;
		var cy = e.clientY + document.body.scrollTop;
		
		if (c.indexOf("Scrollbar-Up") >= 0)
			startScroll(-self.scrollAmount);
		
		if (c.indexOf("Scrollbar-Down") >= 0) 
			startScroll(self.scrollAmount);
			
		if (c.indexOf("Scrollbar-Track") >= 0)
			if (_hasTween) self.tweenTo((cy - d.trackTop - d.handleHeight / 2) * _ratio);
			else scroll(cy - d.trackTop - d.handleHeight / 2);	
		
		if (c.indexOf("ScrollButton") >= 0) {
			t.grabPoint = cy - findOffsetTop(_components.handle);
			addEvent(document, "mousemove", scrollbarDrag, false);	
		}
		
		t.target = e.target;
		t.select = document.onselectstart;
		
		document.onselectstart = function (){ return false; };
		self.onMouseDown(e.target, c, e);
		
		addEvent(document, "mouseup", stopScroll);
	};
	/////////////////////////////////////////////////////////////滚动条拖动
	function scrollbarDrag (e) {
		e = e?e:event;
		var d = _dimensions;
		var t = parseInt(_components.handle.style.top);
		var v = e.clientY + document.body.scrollTop - d.trackTop;
		
		if (v >= d.trackHeight - d.handleHeight + _temporary.grabPoint)
			v = d.trackHeight - d.handleHeight;
			
		else if (v <= _temporary.grabPoint)
			v = 0;
			
		else v = v - _temporary.grabPoint;
			
		scroll(v);
	};
	/////////////////////////////////////////////////////////////滚动条滚轮事件
	function scrollbarWheel (e) {
		if (self.disabled) return false;
		
		e = e ? e : event;
		var dir = 0;
		if (e.wheelDelta >= 120) dir = -1;
		if (e.wheelDelta <= -120) dir = 1;

		self.scrollBy(dir * 20);
		e.returnValue = false;
	};
	
	function startScroll (y) {
		_temporary.disty = y;
		_timer = window.setInterval(function () {
			self.scrollBy(_temporary.disty);
		}, self.scrollSpeed);
	};
	/////////////////////////////////////////////////////////////停止滚动
	function stopScroll (e) {
		e = e?e:event;
		removeEvent(document, "mousemove", scrollbarDrag);
		removeEvent(document, "mouseup", stopScroll);
		document.onselectstart = _temporary.select;
		if (_timer) window.clearInterval(_timer);
		self.onMouseUp(_temporary.target, _temporary.target.className, e);
	};
	////////////////////////////////////////////////////////////////////////////////END
	//公共函数
	this.reset = function () {
		var d = _dimensions;
		var c = _components;
		var g = s.getDimensions();
		
		_ratio = (g.theight - g.vheight) / (d.trackHeight - d.handleHeight);
		
		c.handle.ondragstart = function (){ return false; };
		c.handle.onmousedown = function (){ return false; };
		c.handle.style.top   = "0px";
		d.y = 0;
		
		s.reset();
		scroll(0);
		
		if (g.theight < g.vheight) {
			this.disabled = true;
			o.className  += " Scrollbar-Disabled";
		}
	};
	/////////////////////////////////////////////////////////////滚动内容
	this.scrollTo = function (y) {
		scroll(y / _ratio);
	};
	
	this.scrollBy = function (y) {
		scroll((s.getDimensions().y + y) / _ratio);
	};
	
	this.swapContent = function (n, w, h) {
		o = n;
		s.swapContent(o, w, h);
		initialize();
	};
	
	this.disable = function () {
		this.disabled = true;
		o.className  += "Scrollbar-Disabled";
	};
	
	this.enable = function () {
		this.disabled = false;
		o.className = o.className.replace(/Scrollbar\-Disabled/, "");
	};
	
	this.getContent = function () {
		return s.getContent();
	};
	
	this.getComponents = function () {
		return _components;
	};
	
	this.getDimensions = function () {
		var d = s.getDimensions();
		d.trackHeight  = _dimensions.trackHeight;
		d.handleHeight = _dimensions.handleHeight;
		
		return d;
	};
	
	initialize();
};
///////////////////////////////////////////////////////////////////////////////////END




///////////////////////////////////////////////////////////////////////////////////内容滚动
Scrolling.Scroller = function (o, w, h, t) {
	//get the container
	var list = o.getElementsByTagName("div");
	for (var i = 0; i < list.length; i++) {
		if (list[i].className.indexOf("ScrollContainer") > -1) {
			o = list[i];//找到滚动内容层
		}
	}
	//scroller  = new Scrolling.Scroller(document.getElementById('ScrollMask'), 430, 209);
	//私有变量
	var self  = this;
	var _vwidth   = w;
	var _vheight  = h;
	var _twidth   = o.offsetWidth//内容宽
	var _theight  = o.offsetHeight;//内容高
	var _hasTween = t ? true : false;
	var _timer, _x, _y;
	
	//公共变量
	this.onScrollStart = function (){};
	this.onScrollStop  = function (){};
	this.onScroll      = function (){};
	this.scrollSpeed   = 30;
	
	/////////////////////////////////////////////////内容滚动
	function setPosition (x, y) {
		if (x < _vwidth - _twidth) 
			x = _vwidth - _twidth;
		if (x > 0) x = 0;
		if (y < _vheight - _theight) 
			y = _vheight - _theight;
		if (y > 0) y = 0;
		
		_x = x;
		_y = y;
		
		o.style.left = _x +"px";
		o.style.top  = _y +"px";
	};
	
	//公共函数
	this.scrollBy = function (x, y) { //滚动内容
		setPosition(_x - x, _y - y);
		this.onScroll();
	};
	
	this.scrollTo = function (x, y) { 
		setPosition(-x, -y);
		this.onScroll();
	};
	
	this.startScroll = function (x, y) {
		this.stopScroll();
		this.onScrollStart();
		_timer = window.setInterval(
			function () { self.scrollBy(x, y); }, this.scrollSpeed
		);
	};
		
	this.stopScroll  = function () { 
		if (_timer) window.clearInterval(_timer);
		this.onScrollStop();
	};
	
	this.reset = function () {
		_twidth  = o.offsetWidth
		_theight = o.offsetHeight;
		_x = 0;
		_y = 0;
		
		o.style.left = "0px";
		o.style.top  = "0px";
		
		if (_hasTween) t.apply(this);
	};
	
	this.swapContent = function (c, w, h) {
		o = c;
		var list = o.getElementsByTagName("div");
		for (var i = 0; i < list.length; i++) {
			if (list[i].className.indexOf("ScrollContainer") > -1) {
				o = list[i];
			}
		}
		
		if (w) _vwidth  = w;
		if (h) _vheight = h;
		reset();
	};
	
	this.getDimensions = function () {
		return {
			vwidth  : _vwidth,
			vheight : _vheight,
			twidth  : _twidth,
			theight : _theight,
			x : -_x, y : -_y
		};
	};
	
	this.getContent = function () {
		return o;
	};
	
	this.reset();
};


///////////////////////////////////////////////////////////////////////////////////Tween缓冲效果
Scrolling.ScrollTween = function () {
	//私有变量
	
	/**/
	var self    = this;
	var _steps  = [0,25,50,70,85,95,97,99,100];
	var _values = [];
	var _idle   = true;
	var o, _inc, _timer;
	
	//私有函数 private functions
	function tweenTo (y) {
		if (!_idle) return false;
		
		var d = o.getDimensions();
		if (y < 0) y = 0;
		if (y > d.theight - d.vheight)
			y = d.theight - d.vheight;
			
		var dist = y - d.y;
		_inc     = 0;
		_timer   = null;
		_values  = [];
		_idle    = false;
		
		for (var i = 0; i < _steps.length; i++) {
			_values[i] = Math.round(d.y + dist * (_steps[i] / 100));
		}

		_timer = window.setInterval(function () {
			o.scrollTo(_values[_inc]); 
			if (_inc == _steps.length - 1) {
				window.clearInterval(_timer);
				_idle = true;
			} else _inc++;
		}, o.stepSpeed);
	};
	
	function tweenBy (y) {
		o.tweenTo(o.getDimensions().y + y);
	};
	function setSteps (s) {
		_steps = s;
	};
	
	//公共函数  public functions
	this.apply = function (p) {
		o = p;
		o.tweenTo   = tweenTo;
		o.tweenBy   = tweenBy;
		o.setSteps  = setSteps;
		o.stepSpeed = 30;
	};
	
};

/*

定义对象CM, 定义CM的方法：introiniScr
ScrollMask               滚动条遮罩
ScrollContainer          滚动条内容
Scroll                   滚动条
Scrollbg                 滚动条背景，滚动条活动区域
ScrollButton             滚动条按钮

调用方法：
CM.intro.start( sollmask, soll );

*/

var CM = {};
CM.intro = {
	start: function(a, b ) {
		//alert("a="+ a+"        b="+ b );
		if ( document.getElementById(a)) CM.intro.iniScr( a,b);
	}
	,
	iniScr: function( a, b ){
		var scroller  = null;
		var scrollbar = null;
		var WH = windowH - 225;
		var WW = windowW;
		scroller  = new Scrolling.Scroller(document.getElementById( a ), WH, WH );//'caseM','Scroll'
		scrollbar = new Scrolling.Scrollbar(document.getElementById( b ), scroller, new Scrolling.ScrollTween());
}
};
////////////////////  start  ////////////////////CM.intro.start();
