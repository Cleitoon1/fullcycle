"O Kuberntes é um produto Open Source utilizado para automatizar a implantação, o dimensionamento e o gerenciamento de aplicativos em contêiner"

 - Kubectl(https://kubernetes.io/docs/reference/kubectl/) gerenciador dos clusters 
 - Kind(https://kind.sigs.k8s.io) é uma ferramenta que instala o kubernetes na maquina, mas executando container docker, ele vai fazer com cada container seja um node do kubernetes, assim não precisamos utilizar uma vm para estudar a ideia é fazer tudo local para não ter q usar algum cloud provider 

 Comandos kind:
 - `kind create cluster` Criando um cluster (caso não passar nome por padrão será kind)
 - `king get clusters` listando os clusters
 - `kubectl cluster-info --context kind-kind` adicionar o cluster criado pelo kind ao kubectl
 - `kind delete clusters kind` excluindo um cluster
 - `kubectl get nodes` listar os nós
 - arquivo kind.yaml na pas k8s exemplo de um cluster com nós via arquivo para não ter que fazer os comandos na mão
 - `kind create cluster --config=./k8s/kind.yaml --name=fullcycle` - criando o cluster com os nós via arquivo de template passando o nome
 - `kubectl cluster-info --context kind-fullcycle` adicionar ao kubectl os nós do meu cluster
 - `kubectl config get-clusters`listar os clusters e `kubectl config use-context meu-cluster` altera o kluster q eu estou trabalhando
 - extensão com o nome kubernetes para ajudar a gerenciar os clusters