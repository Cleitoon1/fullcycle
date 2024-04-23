Criando servidor laravel para teste (arquivos na pasta /laravel), aplicando varias coisas como comandos, entrypoint e cmd
 - `docker build -t cleitoon1/laravel:latest .`: gerando imagem
 - `docker run --rm -d --name laravel -p 8000:8000 cleitoon1/laravel`: exemplo de container
 - `docker run --rm -d --name laravel -p 9091:9091 cleitoon1/laravel --host=0.0.0.0 --port=9091`: exemplo de container com parametros customizados no caso utilizando outra porta porque a 800 é a default
 - `docker push cleitoon1/laravel`: subindo imagem para o DockerHub

Criando servidor node para teste (arquivos na pasta /node):
 - `docker run --rm -it -v "$(pwd)"/:/usr/src/app -p 3000:3000 node:15 bash`: utilizando container para gerar solução node na minha pasta (mapeada pelo volume, legal)
 - `docker build -t cleitoon1/hello-express:latest .`: gerando imagem
 - `docker run -p 3001:3000 --name hello-express cleitoon1/hello-express:latest`
 - `docker push cleitoon1/hello-express`
 - `docker build -t cleitoon/hello-express . -f Dockerfile.prod`: gerando imagem de um Dockerfile diferente