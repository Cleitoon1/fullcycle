VPC - Virtual Private Cloud

é a minha rede dentro da AWS, cada rede está vinculada a uma região, por padrão essa rede é isolada (é possível fazer comunicação entre outras, mas não é o padrão)
CIDR - reserva de ip dentro da rede, configuração do endereço padrão e do tamanho da rede 10.0.0.0/16 ai vem aquela teoria da aula redes que a gente nunca lembra pq acha q nunca mais vai ver na vida sendo programador, mas existe um subnet calculator para ajudar a ver o tamanho sem sofrer fazendo conta

subnets: são sub redes dentro da vpc onde consigo ter os recursos separados em cada sub rede caso necessário, varia do contexto das aplicações a sua utilização, cada subnet está conectada a uma AZ (Zona de disponibilidade da região), é recomendado ter replicas em outras AZ para caso ela cair ter disponibilidade em outro data center

subnet publica vs privada, em resumo a diferença é que a subnet publica tem acesso a internet e esse acesso é dado configurando o internet gateway
para "amarrar" toda essa relação é necessário criar uma route table que é ligada a vpc, onde eu consigo associar a minha subnet e editar as rotas dessa tabela de roteamento para acessar a internet utilizando o internet gateway que criei, ou seja é conexão de todos os passos

problema ná maquina privada como a rede dela é privada não consigo nem atualizar os pacotes, então um modo de resolver vai ser utilizando o NAT GATEWAY, ele vai manter a maquina privada, mas vai conseguir fazer com que a máquina privada se conecte a internet, vai fazer um "túnel" entre a minha subnet publica e privada, somente para acesso externo a maquina ainda vai continuar sendo inacessível de fora da rede

resumo: criando natgateway para a minha subnet publica e na minha route table privada adicionar uma rota para o natgateway, logo é um túnel da minha rede privada para a publica e como a publica tem acesso a internet via esse túnel a privada tbm vai ter acesso, mas a máquina ainda continuar privada logo não é possível acessa-la de fora

`sudo apt update && sudo apt install --yes nginx` - instalar nginx só de zoa util para testar conexão com a maquina maneiro hehe

Security Group = Firewall, sempre buscar deixar aberto apenas o necessário, teste feito deixando apenas a porta 80 aberta para acessar pelo navegador logo a minha porta 22 da conexão remota foi fechada e a conexão caiu, deixando ela habilitada voltou e logo percebmos que não tem sentido deixar todas habilitadas