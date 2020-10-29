# Inteligência Artificial (CC)
## Trabalho Prático 1
### Laboratório 203: Jogo da Velha

#### Estrutura Básica
- main.py
Permite execução local da api + html

- bottle_app.py
Implementação da WebApi e definição das rotas dos recursos

- jogo.py 
Classe de implementação do contexto do jogo

- minmax.py 
Implementação do algoritmo **MinMax** com `Poda Alfa Beta`

A execução remota do teste poderá ser feita acessando o endereço http://salgueiro.pythonanywhere.com/index.html

Também poderá ser executada localmente executando os seguintes comandos:

- Instalação do `bottle` (um micro framework para webapi no python)

```shell
pip install bottle
```

- Executar o script python

```shell
python main.py
```

Após, basta acessar no navegador o endereço http://127.0.0.1:5001/index.html

