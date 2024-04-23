Tipos de rede:
 - Bridge: é o tipo de rede padrão do container
 - Host: deixa o docker e host (minha maquina) na mesma rede
 - Overlay:
 - Maclan:
 - None: container isolado, não faz parte de nenhuma rede


`docker network`: ver os comandos disponíveis para a parte de rede
`docker network inspect bridge`: inspecionar a rede, vai aparece tudo sobre ela insclusive os containers que estão a utilizando
`docker network create --driver bridge minharede`: criando uma rede do tipo bridge
`docker run -dit --name ubuntu1 --network minharede ubuntu bash`: criando uma maquina apontando para uma rede customizada
`docker network connect minharede ubuntu3`: conectar um container a uma rede
`docker run --rm -d nginx --netwrork host nginx`: criando container para rodar na rede host ou seja junto com a minha máquina então devo conseguir acessar sem mapear porta