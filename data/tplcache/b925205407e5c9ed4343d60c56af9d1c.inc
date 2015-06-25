{dede:field name='typename'/} 

{dede:sql sql='Select * from dede_arctype where reid=~id~  ORDER BY id '}
[field:typename/]

{/dede:sql}