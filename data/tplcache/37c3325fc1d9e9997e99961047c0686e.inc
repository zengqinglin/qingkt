{dede:field name='typename'/} 

 {dede:sql sql='Select * from #@__arctype where reid=~id~ ORDER BY id limit 0,200'}
        	<a href='[field:typedir/]' target='_blank'>[field:typename/]</a><br/>
    {/dede:sql}