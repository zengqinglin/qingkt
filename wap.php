<?php
require_once (dirname(__FILE__) . "/include/common.inc.php");
header("Content-Type: text/html; charset=utf-8");
//header("Content-Type: application/json; charset=utf-8");
//header("Content-type:text/vnd.wap.wml");
require_once(dirname(__FILE__)."/include/wap.inc.php");
if(empty($action)) $action = 'index';
$cfg_templets_dir = $cfg_basedir.$cfg_templets_dir;
$channellist = '';
$newartlist = '';
$channellistnext = '';

//顶级导航列表
$dsql->SetQuery("Select id,typename From `#@__arctype` where reid=0 And channeltype=1 And ishidden=0 And ispart<>2 order by sortrank");
$dsql->Execute();
$items = array();
while($row=$dsql->GetObject())
	
{
	 array_push($items, $row);
 //$channellist .= "<a href='wap.php?action=list&amp;id={$row->id}'>{$row->typename}</a> ";
 //$channellist.="{\"link\":\"wap.php?action=list&amp;id={$row->id}\",\"linkname\":\"{$row->typename}\"},";
	
}

//当前时间
$curtime = strftime("%Y-%m-%d %H:%M:%S",time());

$cfg_webname = ConvertStr($cfg_webname);

 
//主页
/*------------
function __index();
------------*/

function search(){
	global $items;
	$jsonp = $_GET["callback"];
	
	$result = $jsonp.'({"success":true,"msg":'.json_encode($items).'})';
	//$result = $jsonp.'({"success":true,"msg":"22"})';
	
	echo $result;
 
	exit();

	}
if ($_SERVER["REQUEST_METHOD"] == "GET"&&$_GET["nav"]=="main") {
	search();
	 
} 
if($_GET["list"]=="news"){
	//最新文章
	$dsql->SetQuery("Select id,title,litpic,click,pubdate,writer,description,pubdate From `#@__archives` where channel=1 And typeid=8 And arcrank = 0 order by id desc limit 0,10");
	$dsql->Execute();
	$newartlist= array();
	while($row=$dsql->GetObject())
	
	{
		$row->pubdate = strftime("%y-%m-%d %H:%M:%S",$row->pubdate);
		 array_push($newartlist,$row);
		//$newartlist .= "<a href='wap.php?action=article&amp;id={$row->id}'>".ConvertStr($row->title)."</a> [".date("m-d",$row->pubdate)."]<br />";
		
	}
	
	$jsonp = $_GET["callback_news"];
	$result = $jsonp.'({"success":true,"msg":'.json_encode($newartlist).'})';
	//$result = $jsonp.'({"success":true,"msg":"22"})';
	
	echo $result;
	
	//$dsql->Close();
	//echo $pageBody;
	exit();
	
	}
else if($action=='index')
{
	//最新文章
	$dsql->SetQuery("Select id,title,pubdate From `#@__archives` where channel=1 And arcrank = 0 order by id desc limit 0,10");
	$dsql->Execute();
	while($row=$dsql->GetObject())
	{
		$newartlist .= "<a href='wap.php?action=article&amp;id={$row->id}'>".ConvertStr($row->title)."</a> [".date("m-d",$row->pubdate)."]<br />";
	}
	//显示WML
	include($cfg_templets_dir."/wap/index.wml");
	$dsql->Close();
	echo $pageBody;
	exit();
}
/*------------
function __list();
------------*/
//列表
else if($action=='list')
{
	$needCode = 'utf-8';
	$id = ereg_replace("[^0-9]", '', $id);
	if(empty($id)) exit('Error!');
	require_once(dirname(__FILE__)."/include/datalistcp.class.php");
	$row = $dsql->GetOne("Select typename,ishidden From `#@__arctype` where id='$id' ");
	if($row['ishidden']==1) exit();
	$typename = ConvertStr($row['typename']);
	//当前栏目下级分类
	$dsql->SetQuery("Select id,typename From `#@__arctype` where reid='$id' And channeltype=1 And ishidden=0 And ispart<>2 order by sortrank");
	$dsql->Execute();
	while($row=$dsql->GetObject())
	{
		$channellistnext .= "<a href='wap.php?action=list&amp;id={$row->id}'>".ConvertStr($row->typename)."</a> ";
	}
	//栏目内容(分页输出)
	$sids = GetSonIds($id,1,true);
	$varlist = "cfg_webname,typename,channellist,channellistnext,cfg_templeturl";
	ConvertCharset($varlist);
	$dlist = new DataListCP();
	$dlist->SetTemplet($cfg_templets_dir."/wap/list.wml");
	$dlist->pageSize = 10;
	$dlist->SetParameter("action","list");
	$dlist->SetParameter("id",$id);
	$dlist->SetSource("Select id,title,pubdate,click From `#@__archives` where typeid in($sids) And arcrank=0 order by id desc");
	$dlist->Display();
	exit();
}
//文档
/*------------
function __article();
------------*/
else if($action=='article')
{
	//文档信息
		$arc= array();
	$query = "
	  Select tp.typename,tp.ishidden,arc.typeid,arc.title,arc.arcrank,arc.pubdate,arc.writer,arc.click,addon.body From `#@__archives` arc 
	  left join `#@__arctype` tp on tp.id=arc.typeid
	  left join `#@__addonarticle` addon on addon.aid=arc.id
	  where arc.id='$id'
	";
	$row = $dsql->GetOne($query,MYSQL_ASSOC);
	foreach($row as $k=>$v) {$$k = $v;
	 array_push($arc,$row);
	}
	unset($row);
	$pubdate = strftime("%y-%m-%d %H:%M:%S",$pubdate);
	if($arcrank!=0) exit();
	$title = ConvertStr($title);
	$body = html2wml($body);
	
	
		


	$jsonp = $_GET["callback_article"];
	$result = $jsonp.'({"success":true,"msg":'.json_encode($arc).'})';
	//$result = $jsonp.'({"success":true,"msg":"22"})';
	
	echo $result;
	//if($ishidden==1) exit();
	//当前栏目下级分类
	//$dsql->SetQuery("Select id,typename From `#@__arctype` where reid='$typeid' And channeltype=1 And ishidden=0 order by sortrank");
	//$dsql->Execute();
	//while($row=$dsql->GetObject()){
		//$channellistnext .= "<a href='wap.php?action=list&amp;id={$row->id}'>".ConvertStr($row->typename)."</a> ";
	//}
	//栏目内容(分页输出)
	//include($cfg_templets_dir."/wap/article.wml");
	//$dsql->Close();
	//echo $pageBody;
	exit();
}
//错误
/*------------
function __error();
------------*/
else
{
	ConvertCharset($varlist);
	include($cfg_templets_dir."/wap/error.wml");
	$dsql->Close();
	ConvertCharset($varlist);
	echo $pageBody;
	exit();
}
?>
