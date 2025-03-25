# To Do List

Uma aplicação de lista de tarefas construída com React, Tailwind CSS e outras bibliotecas. Permite adicionar tarefas com título, descrição, categoria, prioridade, status e data de conclusão, com um modal estilizado e um calendário personalizado.

## Tecnologias Utilizadas
- **React**: Biblioteca JavaScript para construção de interfaces.
- **Tailwind CSS**: Framework CSS para estilização.
- **Lucide React**: Biblioteca de ícones.
- **React Datepicker**: Biblioteca para o calendário personalizado.
- **@hello-pangea/dnd**: Biblioteca para drag-and-drop.
- **LocalStorage**: Para persistência de dados no navegador.

## Como Rodar o Projeto

### Pré-requisitos
- Node.js (versão 14 ou superior) instalado.
- npm (geralmente vem com o Node.js).

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/todo-list.git
   cd todo-list

2. Instale as dependências:
    ```bash
    npm install

3. Inicie o servidor de desenvolvimento:
    ```bash
    npm start

4. Abra o navegador e acesse:
    ```bash
    http://localhost:3000

### Funcionalidades
- Adicionar tarefas com título, descrição, categoria, prioridade, status e data de conclusão.
- Reorganizar tarefas com drag-and-drop.
- Persistência de tarefas no LocalStorage.
- Modal estilizado para adicionar tarefas.
- Calendário personalizado com react-datepicker.

### Estrutura do Projeto
- src/App.js: Componente principal da aplicação.
- src/pages/Tasks.js: Página principal que lista as tarefas e gerencia o modal.
- src/components/TaskForm.jsx: Formulário para adicionar tarefas.
- src/components/TaskCard.jsx: Componente que exibe cada tarefa.
- src/datepicker.css: Estilização personalizada do calendário.

## Contribuição
Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias!