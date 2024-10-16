O que é ?:

Na teoria de controle, a observabilidade é definida como uma medida de quão bem os estados internos de um sistema podem ser inferidos a partir conhecimento das saídas externas desse sistema. Simpleficando, observabilidade é quão bem você pode entender seu sistema complexo.

Resumo: é conseguir ver como o está o meu sistema

Qual a diferença entre Observabilidade e Monitoramento ?
 - Monitoramento nos mostra que há algo errado, se baseia em saber com antecedência quais sinais você deseja monitorar (o que é critico e o que não é, conseguir ver os sinais antes de acontecer)
 - Observabilidade nos permite perguntar o porquê, como conseguir entender o que está acontecendo na aplicação

apesar de serem coisas diferente elas sempre estão juntas, mas não devemos confundir pois são coisas diferentes uma está dentro da outra, mas as utilizamos em momentos diferentes

Os 3 Pilares da Observabilidade:

 - Métricas: métrica é numero !, eu tenho 90% de CPU, tenho 10gb de memória !, tenho que ter número para medir
 - Logs: ele nos mostra o resultado de determinado evento
 - Tracing: Rastreio !, permite entender passo a passo do que foi feito, exemplo um requisição conseguir ver tudo q ela fez do começo ao fim em ordem facilitando o entedimento do que meu sistema está fazendo e em que momento