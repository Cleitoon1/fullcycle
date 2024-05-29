O Service é a porta de entrada para nossa aplicação, pois padrão ela não pode ser acessada e nem acessa nada externo
Tipos de services:

 - ClusterIP: ip interno do servidor
 - NodePort: expor porta do servidor
 - Load Balancer: ele gera um ip para acessar a aplicação de fora e faz o balanceamento de carga


Comandos:

 - `kubectl apply -f k8s/service.yaml` aplicar arquivo do service e criar as configurações de rede
 - `kubectl get services` - listar os services criados
 - `kubectl port-forward svc/goserver-service 8000:80` criando port forward para mapear a porta da minha máquina com a porta do meu service
 - `kubectl proxy --port=8080` - proxy para acessar a api do kubernetes diretamente, afinal o kubectl é apenas um facilitador para manusear a api do kuberntes exemplo localhost:8080api/v1/namespaces/default/services/goserver-service


o nome do service, pode ser utilizado como endereço
Port: o mapeamento do kuberntes
TargetPort: estou apontando para o porta do pod(container)

