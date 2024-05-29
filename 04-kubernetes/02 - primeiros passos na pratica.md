atentar a api version, porque uma é diferente da outra, é díficil de decorar como montar os arquivos, focar em entender os conceitos

Via de regra 1 Pod = 1 Container, mas é possível ter mais de um em um Pod

Comandos Kubernetes:
 - `kubectl apply -f k8s/pod.yaml` - aplicar um arquivo de configração -f = file, criação do primeiro pod :)
 - `kubectl get pods` - listar os pods
 - `kubectl port-forward pod/goserver 4041:80`- forma de mapear o roteamonento para o pod, mapeando a minha porta 4041 para a 80 do pod, forma mais para testes o modo padrão via configuração do yaml
 - `kubectl delete pod goserver`- excluindo um pod
 - `kubectl apply -f k8s/replicaset.yaml` - aplicando o arquivo de replicaset
 - `kubectl get replicasets` - para buscar os replicasets ativos
 - `kubectl describe pod goserver-99k5f` - exibe os detalhes do pod, todas configurações, inclusive imagem utilizada
 - `kubectl delete replicaset goserver` - remover um replicaset
 - `kubectl apply -f k8s/deployment.yaml`- aplicando o arquivo de deployment
 - `kubectl get deployments` pegar os deployments ativos
 - `kubectl rollout undo deployment goserver` vai retornar o deployment para a ultima versão
 - `kubectl rollout undo deployment goserver --to-revision=2` vai retornar o deployment para a ultima a versão especifica
 - `kubectl describe deployment goserver` - exibe as propriedades do deployment



Arquivo k8s/replicaset.yaml é a configuração de um ReplicaSet que é em resumo um jeito de criar várias replicas do meu template, no caso o template dos pods é a aplicação go q fiz de exemplo (app-modulo2) e o legal caso 1 cair ele levanta novamente, pois o replicaset está configurado para ter x instâncias então ele vai deixar x de pé
Problema do replicaset: quando a gente atualiza a imagem da versão do app o unico jeito de pegar a imagem nova é matar as imagens que ele vai gerar sozinho utilizando a imagem nova.
Exemplo gerei 10 pods com a v1, atualizei para v2, editei o arquivo e apliquei, ainda via ter 10 pods em pé com a v1, apenas quando eu excluir um pod ele vai criar o novo com o v2
Como Resolver ?: utilizando o deployment ele cria o replicaset que cria os pods, caso eu mudar a versão do deployment ele atualiza tudo ou seja Deployment -> ReplicaSet -> Deployment, verificar que a nomeclantura muda quando utilizamos o deployment, pois ele gera o replicaset com um nome rândomico que tbm é utilizado no pod
Quando o arquivo do deployment é executado ele mata os pods atuais e cria os novos e faz isso sem downtime !!, coisa linda.
E legal como é simples fazer o rollout do deploy que der ruim