Criação do docker file (ver arquivos Dockerfile na pasta)
gerar imagem utilizando DockerFile: `docker build -t cleitoon1/nginx-com-vim:latest .`
gerando primeira container com imagem gerada utilizando o docker file: `docker run -it cleitoon1/nginx-com-vim bash`
excluindo todas images ativas e inativas (pulo do gato): `docker rm $(docker ps -a -q) -f`

Campos e comandos:
 - `WORKDIR /app`: é o path base em que a imagem estará executando os comandos
 - `RUN meu_comando`: executar comando dentro da imagem
 - `COPY path_maquina path_container`: copiar arquivos para o container
 - `ENTRYPOINT ["echo", "Hello"]`: execução de comando, mas de forma fixa, sempre passar primeiro
 - `CMD ["World"]`: execução de comando, mas de forma variavel é possível substituir esse parâmetro informando no comando de executar criar o container, sempre passar por ultimo