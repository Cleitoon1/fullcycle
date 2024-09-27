Terraform é uma ferramenta open source criado pelo HashiCorp (também fez o nomad, vault, consul e mais uma porrada de coisa), ele é desenvolvido em GOlang, o Terraform é responsável por provisionar nossa infraestrutura em resumo faz com que todos componentes da nossa infra seja criado no nosso provedor de cloud (AWS, Azure) via script o famoso infra as code, ele foi criado para trabalhar com varias provedores de nuvem a ideia não é q ele seja ligado apenas a AWS ele é abstrato, tem sua linguagem e se conecta ao provider da minha escolha

conceito de idempotência: "forma que nós não realizemos tarefas de forma duplicada"

"Um serviço idempotente garante que cada solicitação seja concluída exatamente uma vez, de modo que fazer várias solicitações idênticas tem o mesmo efeito de uma única solicitação. Os clientes podem emitir solicitações de API com um token de idempotência. O mesmo token é usado sempre que a solicitação é repetida."

O terraform aplica esse conceito, então ele garante que não vai criar/executar aquele recurso mais de uma vez, caso tenha alguma alteração no recursos ele vai tentar aplicar apenas uma vez

Terraform é um concorrente do Ansible ?, qual a diferença entre eles ?, O terraform tem o destaque em provisionar infra, o Ansible gerencia e automatiza instalações, o terraform não faz tão a gerencia e automatizações e o ansible não é tão bom em provisionar infra, então já está acontecendo das 2 ferramentas ser utilizadas em conjunto.

É importante ver o plano de ação do terraform pois nem tudo é possível editar, tem coisas que é necessário re-criar, então é precisa ver o estado atual entender o que ele vai fazer, então o arquivo de estado é muito importante um dos principais, pois ele precisa ter o estado para trabalhar em cima e não acabar refazendo, ele é tão sensível que é possível até deixa-lo no s3 para que todos tenham a versão dele em tempo real, se perder o arquivo fudeu

Repo do modulo: https://github.com/codeedu/fc2-terraform

VPC - Virtual Private Cloud

VPC é a rede -> Subnet é a sub rede dentro da vpc

SG ""firewall""(define o que a rede pode acessar e o que pode acessa-la) -> route table (tabela de roteamento) -> subnet -> meu recurso
https://linuxconfig.org/installing-aws-cli-on-ubuntu-a-step-by-step-guides

Outbound rules (egress)
Inbound rules (ingress)


resumo criação de toda estrutura com EKS, muito bom

Site Oficial: https://www.terraform.io/
Instalar: https://developer.hashicorp.com/terraform/install

`terraform init` -
`terraform plan` -
`terraform apply` -

interssante que ao rodar os comandos novamente ele verifica que não houve diferça na infra (conceito da idempotência) e ele faz isso graças ao arquivo terraform.tfstate que tem o controle de tudo que foi feito e aplicado


https://developer.hashicorp.com/terraform/language/values/variables

fazendo um exemplo básico utilizando um provider local que manipula arquivo na minha maquina e testando isso criando arquivo, alterando mensagens utilizando variaveis e vendo as variações de utilização, foda demais


Policy = conjunto de regras, específicas que um usuario vai ter de acesso a determinado recurso
Role = função

Role 1 x N -> Policies


Módulos: Os módulos são a principal forma de empacotar e reutilizar configurações de recursos com o Terraform, para garantir consistência e qualidade. É muito utilizado em ambientes produtivos, em grandes projetos, onde eles se tornam uma prática valiosa para organizar e gerenciar a configuração de infraestrutura de maneira eficiente.
Resumo, módulo serve para facilitar como um método só passar os parametros ele ja vai fazer sem eu ter que fazer tudo na mão

Backend Remoto:
O tfstate tem os detalhes de tudo que foi implantado por causa disso o terraform facilita ele tem o controle de tudo que foi feito, se estiver trabalhando com terraform é recomendado não mexer direto na AWS porque vai ficar fora do que está no tfstate, para não ter problema de multiplas pessoas estarem mexendo no mesmo terraform e termos 2 tfstate com coisas diferentes é possível hospeda-lo em algum lugar e todos usarem o mesmo (exemplo no s3)

resumo do curso: ferramenta foda, fácil de usar a chave é conhecer AWS