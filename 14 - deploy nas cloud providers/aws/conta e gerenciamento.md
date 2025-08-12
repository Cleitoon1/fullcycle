Cadastro é simples (aws.com), tela é """intuitiva""", por padrão deixar em inglês vai facilitar não adianta fugir hehe

Tem diferença de custos entre regiões, as mais baratas são Norte da Virgínia e Ohio levar isso em conta para fazer poc e também a maioria dos recursos estarão disponíveis nessas regiões
Free Tier é o nível """free""" da AWS, mas tem isso tem 3 camadas, tem itens que são de avaliação gratuita, 12 meses gratuito e sempre gratuito, então vale olhar essa parte na aws pois tem específicações como horas de tal recursos, maquina de tamanho x e espaço y, então usar com cuidado pois qualquer erro será cobrado e nosso cartão está la cadastrado, eu ja vi amiguinho fazer teste e no fim do mês tomar um susto de 400 reais no cartão

Custos - A parte de Billing and Cost Management exibe as informações de gasto da conta, la consigo ver tudo que gastei tem gráficos de analise e etc inclusive tem como criar um budget para alertar quando esitver gastando muito inclusive criando um para não esquecer algo ligado e vim uma fatura alta atoa - criei um geral 5 dolares e me avisar quando tiver gasto 80%, 90% e 100% do valor

IAM: Identity & Access Management
 - Users: alguem que vai utilizar os serviços da AWS
 - Groups: grupos de usuário, facilita para gerenciar vários usuários, pois podemos vincular as politicas para aquele grupo logo todos usuários terão aquelas políticas
 - Roles: é uma identidade que pode ter permissões atribuídas a ela diretamente ou via políticas do IAM, eu consigo usar essas roles em objetos fazendo com que eles tenham acessos aos recursos, exemplo adicionar uma role a uma máquina EC2 para que ela consiga puxar uma imagem docker do ECR
 - Policies: Objeto que define os acessos aos recursos d AWS, uma policy pode ser vinculada a um usuario, grupo ou permissão. É um arquivo JSON com as autorizações, a AWS tem várias pré existentes, mas tbm é possível criar novas

 ARN: Amazon Resource Name, 
 estrutura:
  - arn:partition:region:account-id:resource-id
  - arn:partition:region:account-id:resource-type/resource-id
  - arn:partition:region:account-id:resource-type:resource-id

partition: região da aws, aws regiões da aws, aws-cn - regiões da china - aws-us-dov aws do governo americano, 99.9% dos casos q eu ver na vida vai ser o padrão
service: nome do serviço que identifica o produto da aws
id: id da minha conta da aws (accountid)
resource type/id: id e nome do recurso ou versão

obviamente bom ter outros usuários para não fazer tudo no root, pq né..., então criando usuario, grupo e etc para aplicar o que foi explicado acima.
sempre importante habilitar o máximo de segurança possível então ótimo utilizar o MFA na conta e em todas usuarios