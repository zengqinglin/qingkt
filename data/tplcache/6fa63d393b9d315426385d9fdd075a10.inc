<div class="AList">
   {dede:type}
         <h3><a href="[field:typelink /]">>> [field:typename /]</a></h3>
   {/dede:type}
   <ul>
        {dede:arclist row="8" titlelen='100'}
            <li><span>[field:pubdate function="MyDate('Y/m/d',@me)"/]</span><a href="[field:arcurl /]" title="[field:title function='html2text(@me)'/]">[field:title function=' ( strlen("@me")>40 ? cn_substr("@me",40): "@me" ) '/]</a></li>
        {/dede:arclist}
   </ul>
   </div>