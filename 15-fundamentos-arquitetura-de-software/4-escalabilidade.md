Escalabilidade é capacidade de sistemas suportarem o aumento (ou a redução) dos workloads incrementando (ou reduzindo) o custo em menor ou igual proporção

Escalabilidade vs Performance: enquanto perfomance tem o foco em reduzir a latência e aumentar o throughput, a escalabilidade visa termos a possibilidade de aumentar ou diminuir o throughput adicionando ou removendo a capacidade computacional

Desencentralização
 - Disco efêmero: tudo que eu salvar no disco da maquina pode ser descartado, pensando em criar e depois matar as maquinas tendo menos dependências
 - Servidor de aplicação vs Servidor de assets: ter o assets em servidor separado, pois cairia no problema do disco efêmero
 - Cache centralizado: não da pra ter o cache local com a maquina podendo ser descartada, pois toda maquina teriamos que "aquecer" o cache o que iria atrapalhar a performance
 - Sessões: o mesmo para o item acima
 - Upload/Gravação de arquivos: fazer o upload em local que não será descartado, exemplo um bucket no s3

Escala de banco de dados:
 - Aumentando recursos computacionais
 - distribuindo responsbilidades (escrita vs leitura)
 - Shards de forma horizontal
 - Serveless
 
 Otimização de queries e índices:
  - Trabalhe com íncices de forma consciente
  - APM (Application performance monitoring) nas queries
  - Explain nas queries
  - CQRS (Command Query Responsability Segregation)

Proxy reverso:
 - Um proxy reverso é um servidor que fica na frente dos servidores web e encaminha as solicitações do cliente (por exemplo, navegador web) para esses servidores web, recebe todas as requisições com base nas informações das requisições ele distribui as chamadas entre os servidores, seja por roteamento customizado de rotas ou distribuindo a carga
 - Exemplos: Nginx, HAProxy (HA = high availibity), Traefik