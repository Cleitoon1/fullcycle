ELK Stack (veio antes da Elastic Stack)
 - Elastic Search (search engine e analytics)
 - Logstash (processador de dados através de pipelines que consegue receber e transformar dados e enviar dados simultaneamente)
 - Kibana (permite usuários visualizarem os dados do elasticsearch em diversas perspectivas)

Elasticsearch (existe desde 2010, feito em cima do Apache Lucene): é uma ferramenta de busca e analíse de dados apresentando uma perfomance absurda pois é todo feito para essa finalidade, é escalável, possui uma API Rest, trabalha até com analíse e visualizaçao geoespacial, realiza escala horizontal

LogStash: Engine coletora de dados em tempo real, começou como um manipulador de logs e passou a trabalhar com pipelines, consegue receber de dados de vários fontes (arquivo, nginx, rabbitmq) depois normaliza, transforma esse dados e consegue enviar esses dados para diversos lugares (ai entra o ElasticSearch), trabalha com plugins então temos vários facilitadores de coisas que podemos precisar

Kibana: ferramenta de visualização e exploração de dados do ElasticSearch, usada com logs, análise de séries, monitoramento de aplicações e inteligência operacional, gera dashboards, gráfico interativos 

Qual diferença entre ELK e Elastic Stack ?

Beats (lançado em 2015): agente coletor de dados "lighwight data shipper", veio como alternativa ao LogStash que estava ficando muito complexo, o beats consegue enviar dados para o logstash (vem caindo em desuso), mas tbm consegue mandar direto para o ElasticSearch (ai que está o pulo do gato), existem beats para pegar logs, métricas, dados de rede, dados auditoria e uptime monitoring

Elastic Stack:
 - Kibana
 - ElasticSearch
 - Beats ou Logstash

A diferença fica em que a ElasticStack é mais moderna que a ELK devida aos beats

Obs: porque tudo é Elastic urls e etc, porque Elastic é a empresa por trás, as ferramentas são open source, mas alguns plugins são licenciados pela Elastic ai teríamos que pagar, da pra fazer tudo usar algo pago dá, mas sacomé os caras tem os atalhos do campo 


www.elastic.co

Download do arquivo do projeto do curso:
https://github.com/codeedu/fc2-observabilidade-elastic

antes de rodar o compose para criar o ambiente:
`docker network create observability `
`mkdir elasticsearch_data`
Na pasta /beats/metric execute o seguinte comando: `sudo chown root metricbeat.yml`
executar tudo `docker compose up -d`

na pasta /fc2/observabilidade-elastic/metric exemplos de configuração de beats:
Metric: pegando as métricas das instâncias do docker e do elastic e enviando para o elasticsearch