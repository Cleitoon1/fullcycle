SonarQube: https://www.sonarsource.com/products/sonarqube/, faz a analíse do código e consegue pegar tudo que é insight, o quanto o código está coberto por testes, se tem problemas de segurança e mais um monte de coisa (free para estudar e tem versão paga)


`$ docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 sonarqube:latest` executar o sonarqube no local utilizando docker
https://docs.sonarsource.com/sonarqube/latest/try-out-sonarqube/

 - Rules: são as regras dividas por linguagem e tem vários tipo como code smell que é algo ruim, mas não afeta quebra aplicação, tem regra que evita bug, regra de segurança, tbm são dividas por níveis de severidade. Intessante que dentro do portal de admin, tem os exemplos de como resolver
 - Quality Profiles: são perfis de qualidade para cada linguagem a aplicação já tem perfis padrões para várias lingaugens é possível desativar e ver suas regras, posso criar o meu inclusive utilizando os padrões como base gerando uma cópia e trabalhar em cima dela, editar e tornar padrão
 - Quality Gates: é onde vejo as métricas do quanto está sendo aplicado é onde vejo se meu projeto está dentro das métrica de qualidade ou não, tbm é configurável por padrão é o Sonar Way, mas posso configurar um perfil diferente de acordo com a minha necessidade


Pasta Go com projeto de exemplo, criando projeto dentro do sonarqube (localhost:9000)
Analyze "Go exemplo": sqp_9edf7db1f14ca4b1317dff5c98724c83ebd0d475 - chave gerada dentro da ferramenta
Instalar sonar scanner cli https://docs.sonarsource.com/sonarqube/10.5/analyzing-source-code/scanners/sonarscanner/
comando para baixar o zip utilizando o curl: `curl link --output nomedoarquivo.extensao`
adicionar sonarquebe cli ao PATH ai sim para rodar o comando de qualquer lugar export `PATH=/home/cleiton/sonar-scanner-5.0.1.3006-linux/bin:$PATH`
para Java e .Net tem ingração padrão, mas para outras linguagem é necessário instalar o scanner, ele fornece o comando abaixo o gerado para o projeto que criei
`sonar-scanner \
  -Dsonar.projectKey=Go-exemplo \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=sqp_9edf7db1f14ca4b1317dff5c98724c83ebd0d475`

com o arquivo sonar-project.properties configurado, basta apenas executar o comando `sonar-scanner` pois ele utilizará as configs do arquivo
`go test -coverprofile=coverage.out` gerar arquivo com resultado dos testes arquivo utilizado pelo sonar


criando projeto com js, vendo como realizar o mesmo exemplo do go utiizando jest, pasta /sonarqube/js
`npm run test` executar testes da aplicação
mesmo esquema da aplicação go, configurar o sonar-project.properties e depois executar o `sonar-scanner`, além de claro criar o projeto no portal e pegar o token


sonarcloud - instância do sonarqube na nuvem