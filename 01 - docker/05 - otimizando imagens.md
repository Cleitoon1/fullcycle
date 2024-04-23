Aplicando o multistage build na imagem do lavel arquivo /lavel/Dockerfile.prod ou seja utlizando uma imagem mais pesada para fazer o processamento e uma imagem mais leve vai receber o programa compilado para execução, assim essa segunda imagem tendo menos coisas instaladas

 - `docker build -t cleitoon1/laravel:prod . -f Dockerfile.prod`: gerando imagem
 - `docker images | grep laravel`: pesquisando imagens que o nome tem laravel

Configuração do proxy reverso para o nginx bater no PHP uma imagem apenas para proxy o servidor web (nginx) e outra com minha aplicação ai meu servidor fica fazendo o roteamento ver arquivos da pasta nginx:

 - `docker build -t cleitoon1/nginx:prod . -f Dockerfile.prod`: gerando imagem
 - `docker network create laranet`: criando rede para aplicaçãos
 - `docker run -d --network laranet --name laravel cleitoon1/laravel:prod`: executando laravavel
 - `docker run -d --network laranet --name nginx -p 8082:80 cleitoon1/nginx:prod`: executnado nginx (aqui expondo ele para o mundo)