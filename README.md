# NeonChallenge

<h2>Descrição</h2>

Este é um aplicativo de testes para mostrar minhas habilidades sobre o desenvolvimento de aplicações móveis multiplataforma usando react-native

<h2>Sobre a api REST</h2>

Os dados do usuário logado e dos seus contatos são todos fiquitícios porém não estão estáticos no app. 
Para ter dados de pessoas usei a api "https://randomuser.me/"

<h3>Chamadas GET</h3>
Os dados do pefil são carregados de: 

GET - https://randomuser.me/api/?nat=br

Essa rota retorna um array com apenas um objeto que assumo ser o usuário dono da conta.

Os dados dos contatos são carregados de: 

GET - https://randomuser.me/api/?results=20&nat=br

Essa rota retorna um array com 20 objetos que assumo serem os contatos do usuário.

<h3>Chamadas POST</h3>
Para simular uma chamada de api para realição da transferência dos valores, eu precisei usar uma api de testes que aceitasse chamadas POST, para isso usei a api "https://jsonplaceholder.typicode.com/"

POST - "https://jsonplaceholder.typicode.com/posts" 

Essa rota, apesar de aceitar os dados enviados no body da requisição, não faz nada retornando apenas um sucesso com código 200 com um id.

Toda a lógica que deveria ser executada no back-end foi concentrada no pacote <code>src/__mocks__</code>

<h2>Sobre o APP</h2>

O app foi desenvolvido usando o framework <b>react-native 0.61.2</b>
Para facilitação do desenvolvimento, foram adicionados ao projeto algumas bibliotecas.

<h4>Requisições HTTP</h4>
"http-status-codes": "^1.3.2"

"react-native-cancelable-fetch": "^0.1.1"

<h4>Tradução</h4>
"i18n-js": "^3.3.0"

<h4>Campos com mascaramento adequado para dinheiro.</h4>
"react-native-masked-text": "^1.13.0",

<h4>Transição de telas e navegação</h4>
"react-navigation": "^4.0.10"<br>
"react-navigation-stack": "^1.9.4"<br> 
"react-native-gesture-handler": "^1.4.1"<br>

<h4>Utilidades</h4>
"lodash": "^4.17.15"

<h3>Sobre o app.</h3>

O app possui três telas que permitem o usuário "loogado" ver sua lista de contatos e realizar transferências de valores para qualquer um deles.

<h4>Tela inicial Perfil</h4>

Nesta tela você verá a foto do usuário loagado bem como seu nome, seu e-mail e dois botões de ações para enviar dinheiro e ver as transferencias previamente realizadas.
Uma vez aberto o app, ele irá buscar os dados do suposto usuário logado na api randomuser.me. Uma vez baixado o usuário, o mesmo permanece salvo no armazenamento local. Caso você deseje mudar de usuário, basta fazer o gesto de pull to refresh nesta tela, neste momento o usuário antigo e seus registros serão apagados para dar espaço aos dados e registros do novo usuário baixado.

<h4>Tela enviar dinheiro.</h4>

Ao acessar esta tela, app vai buscar uam lista de 20 usuários na api randomuser.me e os salvará no armazenamento local do app.

Nesta tela o usuário pode clicar em cada um dos contatos listados para realizar transferencia. Os dados da transferencia (valor e data) também ficam salvos no armazenamento local. Caso escolha fazer uma nova transferencia ao mesmo usuário, os valores sao somados e a data registrada é a data da ultima movimentação.

<h4>Tela para ver o histórico de transferencia.</h4>

Ao acessar esta tela, o app busca a lista de contatos carregada na tela de enviar dinheiro e checa se existe alguma movimentaçao para algum dos contatos. Caso não exista movimentaçao ela permanecerá vazia. Caso esta tela seja acessada antes da tela de enviar dinheiro ela não terá lista de contatos para checar movimentações.

A lista de movimentações é ordenada pela data da ultima movimentação registrada, da mais nova para a mais antiga. 

O gráfico de movimentações é mostrado apenas se existirem ao menos dois contatos com movimentação registrada.

O gráfico mostra os contatos que receberam transferencias numa lista que vai da esquerda para a direita ordenada pelo valor da movimentação onde a maior movimentação estará sempre mais a esquerda.

<h3>Considerações finais</h3>

Como não existe uma API de verdade, os dados estão salvos localmente no dispositivo, porém as classes responsáveis pela logica de GET, POST e salvamento dos dados, estão no pacote <code>__mocks__</code>




