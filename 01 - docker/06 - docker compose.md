Para não ter que fazer comando(s) gigantes no docker run o docker-compose irá ter todos essas informações inclusive podendo ter a ordem que os container tem que subir e etc, assim diminuindo a margem de erro de facilitando a configuração para outros utilizarem
 - exemplo na pasta /laravel/docker-compose.yaml

interessante o bloco build que adicionar ele tbm é possível buildar as imagens

Projeto criado na pasta mysql + node, onde tem um exemplo utilizando mysql (com banco mapeado para não perder os dados) e aplicação node inserindo dados no banco com docker compose


Comandos:
 - `dockercompose up`: para rodar o arquivo compose de dentro da pasta que tem o arquivo
 - `docker compose ps`: traz os containers do docker compose
 - `docker compose down`: mata o compose
 - `docker compose up -d --build`: vai fazer o build do(s) Dockerfile(s)


Campos:
 - `-d`: utilizando essa flag no compose não irá travar o terminal
 - `--build`: utilizando esse campo no up irá fazer o build das imagens