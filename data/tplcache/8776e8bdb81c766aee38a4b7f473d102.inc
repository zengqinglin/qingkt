{dede:sql sql='Select * from #@__arctype where reid=~id~ ORDER BY id limit 0,200'}
             <li class="course-nav-item ">
           
        	<a href='[field:typedir function='str_replace("{cmspath}","",@me)'/]' target='_blank'>[field:typename/]</a>
   
            </li>
           {/dede:sql}