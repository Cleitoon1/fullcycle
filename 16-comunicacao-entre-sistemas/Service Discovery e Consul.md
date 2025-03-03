Código: https://github.com/devfullcycle/consul-example

Service Discovery e Consul

Service Discovery:
 - Cenário comum em aplicações distribuiídas:
  - Perguntas a se fazer:
   - Qual maquina chamar ?
   - Qual porta utilizar ?
   - Preciso saber o IP de cada instância ?
   - Como ter certeza se aquela instância está saudável ?
   - Como saber se tenho permissão para acessar
 - Descobre as máquinas disponíveis para acesso
 - Segmentação de máquinas para garantir segurança
 - Resoluções via DNS
 - Health check
 - Como saber se tenho permissão para acessar

Hashicop Consul:
 - Service Discovery
 - Service Segmentation
 - Load Balancer na Borda (Layer 7)
 - Key/Value Configuration
 - Versão Opensource e Enterprise

Aviso do curso:
 - Não é um módulo aprofundado que mostrará todos os recursos do Consul. o Objeto é utilizar o Côncul como ferramente para entederdermos mais sobre o process de Service Discovery

Service Registry Centralizado
 - Ele tem o controle de todas as maquinas que estão conectadas a ele conseguindo saber como elas estão (cada maquina tem o seu client em comunicação com ele) e controlando as requests para ela, inclusive tem um servidor de DNS dele

Health check ativo:
 - Basicamente são os serviços ficarem avisando que estão ativos, quando não ele identifca que o serivço está e fora e é multi cloud porque a plataforma é agnostica, basta a maquina ter o client (pode ser linux, windows, na AWS e etc, qualquer região) desde que se comunique com o consul server ele faz o controle

 Agent, Client e Server:
  - Agent: Processo que fica sendo executado em todos nós do cluster. Pode estar sendo executado em client mode ou server mode
  - Client: Registra os serviços localmente, health check, encaminha as informações e configurações para o Server
  - Server: Mantém o estado do cluster, registra os serviços, Membership (quem é cliente e quem é server), retorno de queries (DNS ou API), troca de infomações entre datacenter e etc.
  - Dev Mode: modo de simular o server, testar feature, exemplo, NUNCA UTILIZAR EM PRODUÇÃO, roda como servidor, não escala, registra tudo em memória

Próximas aulas sobre implementação, não vou seguir tanto pois baixei o projeto vou mais executar o código e ver como funciona
`docker exec -it consulserver01 sh` - entrar no container
`consul agent -dev` - inicializa o consul (modo dev, para estudo)
`consul members`

fui acompanhando as aulas e vendo que é uma ferramenta bem interessante, mas nesse momento não quis seguir muito a fundo, pois não vai ter muito uso para mim, módulo +-