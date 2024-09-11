# Resources e HPA

HPA - Horizontal Pod AutoScalling
instalando servidor de métricas para com base em seus dados conseguirmos escalar nossa aplicação !, por padrão no aks, eqs e etc (provedores de nuvem) ja tem o seu, nesse caso vo kind vamos fazer na mão

https://github.com/kubernetes-sigs/metrics-server - servidor de metricas instalando ele com alteração para rodar sem ser necessário o tls

`kubectle apply -f ./k8s/metrics-server.yaml` instalar o metrics server
`kubectl get apiservices` - olhando o serviços disponíveis no kubectl v1beta1.metrics.k8s.io, se o available tiver true está tudo certo
`kubectl apply -f deployment-resources.yaml`executando arquivo novo
`kubectl top pod goserver-f679f6788-h5wk8`mostra consumo do pod
`kubectl apply -f hpa.yaml` aplicando meu hpa
`kubectl get hpa` retornando os hpas

no arquivo deployment-livenessprobe.yaml parte de resources
 - requests: declarando mínimo que a aplicação precisa para ser executado em cpu (entender unidade medida de cpu) e memoria
 - limits: o máximo que ele pode utilizar em seu funcionando, mais q isso se vira

no arquivo k8s/hpa.yaml criando arquivo para escala da minha aplicação no caso o meu deployment porque o deployment gerencia os pods com isso eu garanto que caso esse deployment mude eu ainda vou cobrir tudo que ele criar

gerando imagem v5 para forçar ela estourando erro e escalando utilizando a ferramenta fortio - https://github.com/fortio/fortio 

`kubectl run -it fortio --rm --image=fortio/fortio -- load -qps 800 -t 120s -c 70 "http://goserver-service/healthz"` criando um pod(imagem) na mão para o fortio(bem parecido com o docker)
`watch -n1 kubectl get hpa`