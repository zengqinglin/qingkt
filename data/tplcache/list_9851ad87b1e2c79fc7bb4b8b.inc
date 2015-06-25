<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();

echo '<'.'?xml version="1.0" encoding="UTF-8" ?'.">\r\n";
?>
<!DOCTYPE wml PUBLIC '-//WAPFORUM//DTD WML 1.1//EN' 'http://www.wapforum.org/DTD/wml_1.1.xml'>
<wml>
<card id='main' title='<?php echo $typename; ?>'>

<p><img src='<?php echo $cfg_templeturl; ?>/wap/logo.gif' alt='<?php echo $cfg_webname; ?>' /></p>

<p>
<a href='<?php echo $cfg_cmspath; ?>/wap.php'>主页</a> &gt;&gt; <?php echo $typename; ?>：
</p>

<p><img src='<?php echo $cfg_templeturl; ?>/wap/hr.gif' alt='sp line' /></p>

<p>
<?php
$atts = array();
$atts['tagname'] = 'datalist';
$blockValue = $this->refObj->GetArcList($atts,$this->refObj,$fields); 
if(is_array($blockValue)){
foreach( $blockValue as $key=>$fields )
{

if(eregi('^gb',$cfg_soft_lang)) $fields['title'] = gb2utf8($fields['title']);
?>
<a href='wap.php?action=article&amp;id=<?php echo $fields['id']; ?>'><?php echo ConvertStr($fields['title']); ?></a> [<?php echo MyDate("m-d",$fields['pubdate']); ?>]<br />
<?php
}
}?>
</p>

<p><img src='<?php echo $cfg_templeturl; ?>/wap/hr.gif' alt='sp line' /></p>

<p> <?php
$atts = array();
$atts['tagname'] = 'pagelist';
$atts['listsize'] = '2';
 echo $this->refObj->GetPageList($atts,$this->refObj,$fields); 
?>
 </p>

<p><img src='<?php echo $cfg_templeturl; ?>/wap/hr.gif' alt='sp line' /></p>

<p> 相关分类：<?php echo $channellistnext; ?> </p>

<p><img src='<?php echo $cfg_templeturl; ?>/wap/hr.gif' alt='sp line' /></p>

<p>
<a href='http://www.dedecms.com/wap.php'>Power by DedeCms</a> 
Now Time: <?php echo $curtime; ?>
</p>
</card>
</wml>