<?php   if(!defined('DEDEINC')) exit('Request Error!');
/**
 * 指定的单个栏目的链接标签
 *
 * @version        $Id: type.lib.php 1 9:29 2010年7月6日Z tianya $
 * @package        DedeCMS.Taglib
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.dedecms.com
 */
 
/*>>dede>>
<name>指定栏目</name>
<type>全局标记</type>
<for>V55,V56,V57</for>
<description>表示指定的单个栏目的链接</description>
<demo>
{dede:type}
<a href="[field:typelink /]">[field:typename /]</a>
{/dede:type}
</demo>
<attributes>
    <iterm>typeid:指定栏目ID</iterm> 
</attributes> 
>>dede>>*/


 
function lib_type(&$ctag,&$refObj)
{//var_dump($typeid);
    global $dsql,$envs;



    $attlist='typeid|0';
    FillAttsDefault($ctag->CAttribute->Items,$attlist);
    extract($ctag->CAttribute->Items, EXTR_SKIP);
    $innertext = trim($ctag->GetInnerText());

    if($typeid==0) {
        $typeid = ( isset($refObj->TypeLink->TypeInfos['id']) ? $refObj->TypeLink->TypeInfos['id'] : $envs['typeid'] );
    }



//var_dump($refObj->Fields);
	//die("----------");
  if(empty($typeid)) return '';
  $myreid=$refObj->Fields[reid];

	  $row = $dsql->GetOne("SELECT id,typename,typedir,isdefault,ispart,defaultname,namerule2,moresite,siteurl,sitepath 
                          FROM `#@__arctype` WHERE id='$typeid' ");
	if($le==2){
    $row = $dsql->GetOne("SELECT id,typename,typedir,isdefault,ispart,defaultname,namerule2,moresite,siteurl,sitepath 
                          FROM `#@__arctype` WHERE id='$myreid' ");
	}
	if($le==1){
    $row = $dsql->GetOne("SELECT id,typename,typedir,isdefault,ispart,defaultname,namerule2,moresite,siteurl,sitepath 
                          FROM `#@__arctype` WHERE id=12 ");
	}
	if($refObj->Fields[reid]==$refObj->Fields[topid]&&$le==2){
	 $myid=$refObj->Fields[id];
	 $row = $dsql->GetOne("SELECT 

id,typename,typedir,isdefault,ispart,defaultname,namerule2,moresite,siteurl,sitepath 
                          FROM `#@__arctype` WHERE id='$myid' ");
						  	}
    if(!is_array($row)) return '';
    if(trim($innertext)=='') $innertext = GetSysTemplets("part_type_list.htm");
    
    $dtp = new DedeTagParse();
    $dtp->SetNameSpace('field','[',']');
    $dtp->LoadSource($innertext);
    if(!is_array($dtp->CTags))
    {
        unset($dtp);
        return '';
    }
    else
    {
        $row['typelink'] = $row['typeurl'] = GetOneTypeUrlA($row);
	
        foreach($dtp->CTags as $tagid=>$ctag)
        {
            if(isset($row[$ctag->GetName()])) $dtp->Assign($tagid,$row[$ctag->GetName()]);
        }
        $revalue = $dtp->GetResult();
		
	if($id==$refObj->Fields[id]||($refObj->Fields[reid]==$refObj->Fields[topid]&&$le=='2')||$le==1&&$refObj->Fields[id]==12){
		//var_dump($id);
		//die("|--------------");
				
		$revalue=str_replace("course-nav-item","course-nav-item on",$revalue);
		}
        unset($dtp);
        return $revalue;
    }
}