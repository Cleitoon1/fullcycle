# Healthchecks \o/

criação do endpoint /healtz para demonstrar um endpoint que retornaria se aplicação está de pé

arquivo de exemplo k8s/deployment-livenessprobe.yaml
Liveness probe - resumo rapido ver os healthchecks e ver se estão funcionando, tem vários parametros de configurações e varias decições que podem ser tomadas, como reiniciar o container e consigo colocar timeout, tentativas de verificação, muito foda
tipos de probe:
 - http: executa uma requisição http
 - command: executa um comando no container
 - tcp: faz a conexão via tcp

a aplicação tem uma lógica para falhar dps de 30 segundos para conseguirmos simular os erros na probe e ver o timeout acontecendo e reiniciando o container
`kubectl apply -f k8s/deployment-livenessprobe.yaml && watch -n1 kubectl get pods` - aplicando o arquivo com a probe e dando um watch no container e vendo seus status

uma coisa legal que dando um describe no pod essas informações de falha e etc são exibidas la também

readinessProbe - é a verificação se a aplicação está pronta para receber a carga

tomar cuidado com a configuração para que um não esbarre no outro, por exemplo colocar delay para verificação no readiness e não ter no liveness e o liveness chegar na condição de matar o container antes do readiness e ficar quebrando em loop, então ter o cuidado de quanto utilizar o initialDelaySeconds ter nos 2 e tbm vale para outras configurações parecidas

startupProbe - para evitar os problemas descrito acima foi adicionado o startupProbe que vai garantir a inicialização inicial e depois as outras Probes são executadas, lembrando que ainda temos que ter o cuidado no número de falhas porque se o startup não funcionar a gente nunca vai ter o container bom deixar o numero de tentativas mais altas e com isso posso remover o initialdelayseconds das outras probes, pois o startup entregou a aplicação funcionando para os outros estágios

então o fluxo é
startup (inicia) -> readiness (verificar se está pronto) -> liveness (vrificar se continua funcionando)