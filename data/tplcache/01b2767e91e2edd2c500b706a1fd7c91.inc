{dede:field name='typename'/} 

{dede:sql sql='Select * from dede_arctype where reid=~id~  ORDER BY id limit 0,7'}
[field:typename/]

{/dede:sql}