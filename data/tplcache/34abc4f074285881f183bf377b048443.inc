<span><a href="{dede:field name='typeurl'/}">{dede:field name='typename' runphp='yes'} 
                   @me = preg_replace("|[a-z]|is","",@me); 
                    {/dede:typename}</a></span>
	                
                    {dede:channel type='son' noself='yes'}
	                   <span> <a href="[field:typelink/]">[field:typename/]</a></span>
                         {/dede:channel}