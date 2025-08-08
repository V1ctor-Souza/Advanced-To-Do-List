# Advanced To-Do List
Lista de tarefas avançada com suporte a subtarefas, filtro de tarefas inteligente, drag and drop, armazenamento local e muito mais.

## Sobre o projeto
Criado originalmente para atender minhas necessidades do dia a dia e para estudo, o **Advanced To-Do List** é um sistema de gerenciamento de tarefas que vai além das listas de tarefas tradicionais, oferecendo diversas funcionalidades e preservando a imersão do usuário.

## Funcionalidades principais

* **Criação de tarefas simples e tarefas com subtarefas:**
	* Tarefas com subtarefas possuem barra de progresso.
	* Ao concluir uma tarefa, é possível ver data e hora de conclusão ao passar o mouse.
* **Filtro de Tarefas Inteligente:**
	* Identifica palavras-chave e transforma em tarefas especiais.
	* Atualmente existe apenas uma tarefa especial implementada e, por mais que eu tenha outras ideias, não sei se darei continuidade.
	* Exemplo de sistemas especiais:
		* Sistema de notificação.
		* Sistema de hidratação com animações (copo e garrafa enchendo).
* **Armazenamento local (localStorage + JSON):**
	* Limite de armazenamento visível para o usuário. 
* **Drag and Drop intuitivo** para organizar tarefas.
* **Interações e animações visuais:**
	* Animação de lixeira ao excluir tarefas concluídas.
* **Sistema de histórico geral:**
	 * Exibe todas as tarefas já criadas, mostrando o estado atual delas.
	* Possibilidade de exportar o histórico em PDF para acompanhamento externo ([veja mais](#exportação-de-dados)).
* **Modais dinâmicos** gerados via JavaScript.
* **Responsividade**:
	* Totalmente adaptado para diferentes tamanhos de tela, garantindo boa experiência no desktop, tablet e mobile.
* **Acessibilidade**:
	* Estrutura HTML semântica.
	* Suporte a leitores de tela (testado com NVDA).
	* Alto contraste e foco visível para navegação via teclado.
* **Documentação completa do projeto**.

## Armazenamento e otimização
O projeto utiliza **localStorage** de forma otimizada para garantir eficiência e evitar sobrecarga desnecessária, já que a capacidade de **Storage** é aproximadamente 5MB por navegador.
* Tarefas especiais possuem identificadores únicos para evitar duplicações.
* Sistema de **reset automático**:
	* O histórico geral das tarefas é controlado, armazenando apenas dados essenciais e sofrendo reset após **30 dias**.
	* Tarefas especiais são integras ao histórico geral, com registro detalhado de progresso diário (por exemplo: "Você ingeriu 2L de água").
	* O histórico centralizado pode ser exportado em PDF ([veja mais em Exportação de dados](#exportação-de-dados)).
* O sistema foi projetado para garantir que apenas informações relevantes ocupem espaço local, mantendo o app leve e performático.


## Exportação de dados
Pensando no reset que acontece a cada 30 dias no histórico geral de tarefas, decidi criar um acompanhamento pessoal e aproximar o projeto para o mundo real. 
Esse sistema permite exportar o histórico geral das tarefas em formato PDF.
* O histórico dos últimos 30 dias pode ser baixado antes do reset automático.
* Possibilidade de exportar via impressão ou geração automática de arquivo PDF.
* Esta funcionalidade foi inspirada em **soluções que desenvolvi em experiências anteriores**, reforçando a aplicação prática do projeto.

## To Do 

**Status** : Em desenvolvimento
 * [x] Criar estrutura inicial do projeto
 * [x] Configurar repositório e README
 * [x] Finalizar layout (HTML + CSS)
 * [x] Desenvolver sistema de tarefas simples
 * [x] Desenvolver sistema de subtarefas
 * [x] Salvar tarefas simples em Storage
 * [x] Salvar tarefas principais em Storage
 * [x] Editar e deletar tarefa simples de DOM e Storage
 * [x] Editar e deletar tarefa principal de DOM e Storage
 * [ ] Editar e deletar subtarefas de DOM e Storage
 * [ ] Enviar tarefas concluídas para coluna de Tarefas Concluídas
 * [ ] Salvar tarefas e subtarefas concluídas em Storage
 * [ ] Adicionar sistema de Drag and Drop
 * [ ] Implementar Filtro de Tarefas Inteligente
 * [ ] Integrar animações visuais (ex: lixeira, copo de água)
 * [ ] Criar histórico geral unificado
 * [ ] Adicionar exportação do histórico em PDF
 * [ ] Adicionar responsividade
 * [ ] Adicionar acessibidade e realizar teste com NVDA
 * [ ] Criar testes finais e revisar documentação
 * [ ] Associar Wireframe do Figma no README
 * [ ] Associar plugins do Figma no README
