Resumo, como configurar variaveis de ambiente no kuberntes, injetar arquivos de configuração no container, guardar credenciais e utilizar como variáveis de ambiente

Variaveis de ambiente: utilizando tags env no arquivo deplyment para demonstrar o uso de variaveis de ambiente, arquivo em k8s/deployment.yaml
ConfigMap: arquivo com as configurações, invés de colocar os dados todos no deployment é um arquivo separado e na hora de utilizar apontar que é para pegar do arquivo, exemplo em k8s/deployment.yaml

Observar a parte de volume que pega o configmap-family e injeta dentro do pod via deployment como um text com esse dados, mostra como é feito o mapeamento e a cópia 
e também a parte de secrets e variaveis de ambiente, onde as informações são passadas para o pod, de uma forma um pouco mais escondida (secret do tipo opaco que é o padrão), arquivo k8s/secret.yaml
interessante sobre o arquivo de secret cadastrar as infos em base 64 para ter um pouco mais de segurança e o kuberntes faz o de code automaticamente, mas claro da pra integrar com outros sistemas de segurança é apenas uma solução para não ficar muito facil de ver o secret até porque base64 é facil de descriptografar
Obs: ao alterar o configmap o deployment não é atualizado automaticamente é preciso atualizar a aplicação para pegar os novos valores


Comandos:
 - `kubectl apply -f k8s/configmap-env.yaml` - aplicar o arquivo de configuração
 - `kubectl apply -f k8s/deployment.yaml`- reaplicar o deployment
 - `kubectl port-forward service/goserver-service 9000:80`- mapear a porta para acessar a aplicação

## lendo as variaveis do map inteiro
# envFrom:
# - configMapRef:
#    name: goserver-env
## utilizando do arquivo de configmap mapeando cada variavel
# env:
# - name: NAME
#   valueFrom:
#     configMapKeyRef:
#       name: goserver-env
#       key: NAME
# - name: AGE
#   valueFrom:
#     configMapKeyRef:
#       name: goserver-env
#     key: AGE
## variavel de ambiente simples    
# env:
# - name: NAME
#   value: "Cleiton"
# - name: AGE
#   value: "28"