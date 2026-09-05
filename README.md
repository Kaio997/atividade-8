# 📱 Atividade 8 — React Native com Expo

Projeto desenvolvido em **React Native**, utilizando **Expo** e **TypeScript**, com o objetivo de praticar armazenamento local, acesso à localização do dispositivo e criação de uma aplicação de notas persistentes.

O projeto reúne os **3 exercícios no mesmo aplicativo**, organizados em abas.

---

## 📚 Exercícios

### 🟢 Exercício 1 — Salvar Preferências

Criação de um sistema de preferência de tema **claro/escuro**.

#### Requisitos atendidos

- Toggle para alternar entre tema claro e escuro
- Salvar a escolha utilizando `AsyncStorage`
- Carregar a preferência ao abrir o aplicativo
- Alterar o visual da aplicação conforme o tema selecionado

#### Tecnologias utilizadas

- React Native
- TypeScript
- AsyncStorage
- `useState`
- `useEffect`
- `Switch`

---

### 📍 Exercício 2 — Mostrar Localização

Aplicação responsável por obter e exibir a localização atual do dispositivo.

#### Requisitos atendidos

- Botão **"Obter Localização"**
- Solicitação de permissão para acessar a localização
- Exibição da latitude
- Exibição da longitude
- Loading enquanto a localização está sendo obtida
- Mensagem de erro caso a localização não possa ser obtida

#### Tecnologias utilizadas

- React Native
- TypeScript
- Expo Location
- `useState`
- `TouchableOpacity`
- `ActivityIndicator`

---

### 📝 Exercício 3 — Notas Persistentes

Aplicação de notas que permite adicionar, visualizar e excluir notas.

#### Requisitos atendidos

- Input para adicionar uma nova nota
- Botão **"Adicionar"**
- Lista de notas utilizando `FlatList`
- Botão **"Excluir"** em cada nota
- Persistência das notas utilizando `AsyncStorage`
- Carregamento das notas ao abrir o aplicativo

#### Tecnologias utilizadas

- React Native
- TypeScript
- AsyncStorage
- `FlatList`
- `TextInput`
- `useState`
- `useEffect`

---

# 🛠️ Tecnologias

Este projeto foi desenvolvido utilizando:

- **React Native**
- **Expo**
- **TypeScript**
- **AsyncStorage**
- **Expo Location**
- **React Hooks**
- **FlatList**

---

# 📋 Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- [Node.js](https://nodejs.org/)
- npm
- Expo
- Expo Go, caso queira executar no celular

Para verificar se o Node.js está instalado:

```bash
node -v
