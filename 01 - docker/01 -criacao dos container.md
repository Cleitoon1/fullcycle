Configuração ambiente: https://github.com/argentinaluiz/ambiente-dev-produtivo
Configuração wsl (muito boa !): https://github.com/codeedu/wsl2-docker-quickstart
Url para correção do erro de DNS: https://forums.docker.com/t/ubuntu-22-04-error-response-from-daemon-get-https-registry-1-docker-io-v2-dial-tcp-lookup-registry-1-docker-io-on-127-0-0-53-read-udp-127-0-0-1-48086-127-0-0-53-read-connection-refused/138376

Exemplo de como colocar um container com nginx mapeando porta para acessar externamente: `docker run -d -p 8082:80 --name nginx nginx:latest`

Comandos:
 - Iniciar container: `docker start id_ou_nome_do_meu_container`
 - Parar container: `docker stop id_ou_nome_do_meu_container`
 - Remover container: `docker rm id_ou_nome_do_meu_container`, tem que parar antes
 - Remover container: `docker rm id_ou_nome_do_meu_container -f` remover o container sem precisar parar forçando a removação
 - Remover todos containers parados: `docker container prune`
 - Executar comando dentro do container: `docker exec id_ou_nome_do_meu_container ls`
 - Executar bash no container com modo interativo `docker exec -it id_ou_nome_do_meu_container bash`
 - Executar com mapeamento de pasta `docker run -d -p 8082:80 -v ~/projects/docker/html:/usr/share/nginx/html --name nginx nginx:latest` obs na pasta criei um arquivo html para o nginx usar de index
 - Executar com mapeamento de pasta com mount `docker run -d -p 8082:80 --mount type=bind,source="$(pwd)"/projects/docker/html,target=/usr/share/nginx/html --name nginx nginx:latest` obs na pasta criei um arquivo html para o nginx usar de index

Campos:
 - `-d` dettached para o container não deixar o terminar preso
 - `-p 8080:80` - mapeamento de porta 8080 do meu pc seria a 80 do container
 - `--name meu_container` - passar nome para o container para facilitar a identificação e a remoção para não ter que ver o id
 - `-it` - ativar modo interativo no container
 - `-v ~/projects/docker/html:/usr/share/nginx/html` - mapeando path do meu computador com o path do container, fazendo com os arquivo nessa pasta não morra junto com o container
 - `--mount type=bind,source="$(pwd)"/projects/docker/html,target=/usr/share/nginx/html` - outro modo de mapeamento atualização do -v mais facil de entender o que está sendo  feito porem mais verboso e uma melhoria é que o -v cria a pasta e o mount apenas mapeia

Observações: 
  - Volumes é possível criar volumes com o docker que irá utilizar o mesmo file system dos containers e outras melhorias de performance, tbm facilita que não posso mepear passando o nome do volume invés de sempre passar o path