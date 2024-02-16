# Documentação do desafio

Nesta documentação está presente as instruções de como executar ambos os projetos (back/front-end), como também alguns comentários sobre os mesmos.

## Back-end
### Pré-requisitos
1. Docker Desktop: É necessário ao projeto que esse programa esteja instalado na máquina. é possível instalá-lo a partir do link: https://docs.docker.com/desktop/
2. Node.js: É necessário ao projeto que esteja instalado o node.js na máquina. É possível obté-lo a partir do link: https://nodejs.org/en. Preferencialmente, faça o donwload da versão LTS do node a partir do link informado.

### Como executar o projeto
1. Clone o projeto e navegue até a pasta "back-end".
2. Crie um arquivo `.env` e adicione as variáveis de ambiente `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_HOST` e `POSTGRES_PORT`. É importante que esse arquivo seja criado na mesma pasta que o arquivo `docker-compose.yaml`.

- Sugestão de configuração a ser usada no arquivo `.env`
```sh
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123456
POSTGRES_DB=smdb

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```
3. Na pasta raiz do projeto "back-end", abra um terminal e insira o seguinte comando:
```sh
npm run db-init
```
Esse comando executar os scripts contidos no arquivo `docker-compose.yaml`, que irá fazer o download de uma imagem do banco de dados Postgres e criar um container contendo-a, criará um banco de dados com as configurações informadas nas variáveis contidas no arquivo `.env`.

Por fim, esse comando irá executar no banco de dados criado os scripts contidos na pasta `./src/database/scripts/initialize.sql`, que fará a criação do schema `SM`, criação da tabela `STUDENTS`, e fará inserts para popular essa tabela com 10 estudantes.

4. Execute no mesmo terminal, o seguinte comando para fazer o donwload das dependências do projeto.
```sh
npm install
```
5. Por fim, execute nesse mesmo terminal, o seguinte comando para rodar o projeto:
```sh
npm run dev
```
Caso tudo tenha corrido bem, a seguinte mensagem será exibida no terminal indicando que a API está executando e apta a receber requisições: `Server is running on port 3000`

### Decisão de arquitetura utilizada
A estrutura de pasta e arquivos do projeto foi disposta da seguinte forma:
- database/: Nesta pasta está contido o arquivo `scripts/initialize.sql`, que possui os scrits inicias a serem executados no processo de criação do banco, e o arquivo `infra/connections.ts`, onde está contido uma instância para conexão com o banco de dados;

- controllers/: Nela está o arquivo `students/StudentsControllers.ts`, classe que lida com as requisições relacionadas as rotas de /students, se conectando com a camada de services e devolvendo uma response a elas, tratando os statusCodes da requisições para casos de erro e sucesso.

- services/: Nessa pasta está o arquivo `StudentsService.ts`, classe representando a camada de service, responsável por acessar a camada de repositório. Na mesma está contida as regras de negócio da aplicação relacionadas as rotas de /students.

- repositories/: Nessa pasta encontamos os seguintes arquivos:
1. interfaces/IStudentsRepository.ts: Nesse arquivo, está contida uma interface que será utilizada com implementação para duas classes contidas na pasta `students`;

2. students/StudentsRepositoryMock.ts: Nesse arquivo está contida uma classe que implementa a interface `IStudentsRepository.ts`. A mesma tem a finalidade servir aos testes unitários implementados no projeto.
> *Tal classe foi criada devido a decisão de não utilizar efetivamente o banco de dados para os testes unitários do projeto, utilizando como uma pseudo base de dados, um array da entidade Students, contida na classe. Essa decisão foi tomada devido ao fato do projeto já inicializar com uma base de dados com linhas preenchidos, o que poderia resultar numa interferência no resultados dos testes.*

3. students/StudentsRepository.ts: Nesse arquivo está contida um classe que implementa a interface `IStudentsRepository.ts`. A mesma tem a finalidade de acessar o banco de dados da aplicação, através da instância contida no arquivo `database/infra/connections.ts`, devolvendo os dados solicitados pela camada de service.

- entities/: Nela está o arquivo `Student.ts`, classe de modelo de Student;

- errors/: Nela encontramos os erros personalizados da aplicação;

- middlewares/: Contém o arquivo `handleError.ts`, middleware para centralização do tratamento de erros;

- tests/: Contém o arquivo `students.test.ts`, arquivo de teste utilizando a lib Jest.js. Nesse arquivo se encontram os testes da camada de serviço, dividos pelos casos de uso informados nas instruções do desafio.
> *Esse arquivo faz a injeção de dependência da instância de `StudentsService.ts` se utilizando da classe `StudentsRepositoryMock.ts`, para que os testes executados não consultem efetivamente o banco de dados da aplicação, garantindo uma indepêndencia dos testes.*

- router.ts: Contém as rotas da aplicação, fazendo a injeção de dependência das instâncias das camadas de service e controller.

- server.ts: Arquivo que gerecia as configurações do express e inicia a aplicação.

### Biblioteca de terceiros utilizadas
- express: Framework para Node.js que fornece recursos para construção de API's Rest;
- cors: Middleware de configuração de cors;
- dotenv: Biblioteca que habilita a utilização das variáveis contidas no arquivo `.env`;
- TypeScript: Linguagem de programação que adiciona tipagem à linguagem JavaScript;
- ts-node-dev: Biblioteca utilizada para execução do código typescrit em ambiente dev;
- Jest: Bliblioteca de construção de testes utilizando node.js;
- Docker e Docker Compose: Ferramenta de criação de containers usada para baixar e inicializar o banco de dados da aplicação;

### O que eu melhoraria se tivesse mais tempo
- Melhorar a forma de implementação do testes unitários, possivelmente utilizar uma base de dados de réplica para os testes que pudesse ser livremente manipulada;
- Melhorar as tratativas de erro da aplicação, possivelmente criando uma forma de separar os erros em códigos a fim de criar um dicionário de erros a ser utilizado no front;
- Implementar um swagger que pudesse ser utilizado como documentação das rotas do projeto;
- Implementar autenticação com tokens JWT e proteção das rotas;

## Front-end
### Pré-requisitos
1. Node.js: É necessário ao projeto que esteja instalado o node.js na máquina. É possível obté-lo a partir do link: https://nodejs.org/en. Preferencialmente, faça o donwload da versão LTS do node a partir do link informado.

### Como executar o projeto
1. Navegue até a pasta "front-end", abra um terminal e digite o seguinte comando para fazer o donwload das dependências do projeto.
```sh
npm install
```
2. Em seguida, nesse mesmo terminal, digite o seguinte comando:
```sh
npm run serve
```
Caso tenha tudo tenha corrido bem, o projeto pode ser acessado atráves do link informado no console (que costumeiramente é http://localhost:8080)

### Decisão de arquitetura utilizada
A estruruta principal do projeto foi feita da seguinte forma:
- App.vue: componente principal da aplicação, onde se encontram os componentes `NavigationMenu`, `SnackBar` e o componente de rotas.
- components/: Nessa pasta se encontram dois componentes.
1. NavigationMenu: Nesse componente estão contidos uma navigation-drawer (componente lateral onde se encontra o link para o módulo de estudantes da aplicação) e uma app-bar (barra do topo da aplicação que possui um botão que controla a visibilidade do navigation-drawer);
> *Esses dois componentes se encontram juntos devido ao fato da app-bar controlar a visibilidade do navigation-drawer.*
2. SnackBar.vue: Nesse componente se encontra uma snackbar para indicar visualmente o sucesso/erro/avisos das operações da aplicação;

- views/: Nessa pasta se encontram duas views:
1. StudentsView.vue: Contendo a listagem de estudantes e com suas respectivas funcionalidedas. sua rota é "/students";
2. StudentsForm.vue: Contendo o formulário utilizado para criação e edição de estudantes, sendo suas rotas respectivamente "/students/new" e "/students/edit/{RA do estudante}";

- utils/: Nessa pasta se encontram arquivos com funções utilitárias ao projeto:
1. eventBus.js: Habilita a emissão de eventos personalizados, utilizado para controlar a visibilidade do snackBar após relizadas as requisições do projeto;
2. format.js: Arquivo contendo apenas uma função para formatar strings para o formato de CPF;
3. validations.js: Arquivo contendo as funções validações de CPF e e-mail, a serem utilizadas nas rules dos text-fields de e-mail e CPF na view de StudentsForm.vue;

- router/: Pasta que contem as rotas da aplicação.

### Biblioteca de terceiros utilizadas
- Axios: Biblioteca utilizada para fazer as requisições http ao back-end;
- Vue-The-Mask: Biblioteca utilizada para fazer a formatação visual dos input, aplicando uma máscara aos mesmos;
- Vuetify 2: Biblioteca de componentes estilizados do vue 2;

### O que eu melhoraria se tivesse mais tempo
- Melhorar a tratativa de erros da aplicação;
- Melhorar o visual da aplicação, dando atenção a responsividade;
- Implementar uma página de login;

## Quais requisitos obrigatórios que não foram entregues
Todos os requisitos obrigatórios foram entregues;