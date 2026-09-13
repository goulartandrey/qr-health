# QRHealth – Sistema de Informações Clínicas com QR Code

Este projeto permite que um usuário cadastre suas informações clínicas (alergias, cirurgias, doenças, medicamentos, tipo sanguíneo e contato de emergência), gere um QR Code público protegido por senha e disponibilize esses dados para consulta por profissionais de saúde.

O sistema é composto por:
- **Frontend**: React + Vite + TailwindCSS 
- **Backend**: NestJS + SQLite

---

## 📦 Funcionalidades Principais

✔️ Cadastro e login com autenticação JWT  
✔️ Dashboard do usuário  
✔️ CRUD de informações clínicas  
✔️ Geração de QR Code com senha pública  
✔️ Página pública `/clinical/:id` para exibição dos dados  
✔️ Proteção por senha pública  
✔️ Responsivo e preparado para uso em dispositivos móveis  

---

## 🚀 Como Rodar o Projeto

Este guia é para o avaliador rodar o projeto corretamente em seu ambiente local.

---

## 🖥️ 1. Clonar os Repositórios

### **Frontend**
```sh
git clone https://github.com/goulartandrey/qr-health.git
cd qr-health/frontend
npm install
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`

---

### **Backend**
```sh
cd qr-health/backend
npm install
npm run dev
```

O backend estará disponível em: `http://localhost:3000`

---

## 📂 2. Estrutura do Projeto

```
qr-health/
├── frontend/
│   ├── src/
│   │   ├── api/     # Arquivo para comunicação com o backend utilizando url do servidor
│   │   ├── components/          # Components reutilizáveis
│   │   ├── pages/       # Paginas do app
│   │   ├── routes/        # Rotas
│   │   └── App.jsx         # Componente principal
│   ├── public/
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── auth/           # Módulo de autenticação
    │   ├── users/          # Módulo de usuários
    │   ├── clinical_badges/       # Módulo de badges (QR codes)
    │   ├── clinical_infos/       # Módulo de informações clínicas
    │   └── app.module.ts         # Módulo central
        └── main.ts         # Entry point
    ├── database.sqlite     # Banco de dados SQLite
    └── package.json
```

---

## 🧪 4. Testando o Sistema

1. **Cadastre um usuário** em `/register`
2. **Faça login** em `/login`
3. **Preencha suas informações pessoais**
4. **Preencha suas informações clínicas** no dashboard
5. **Gere o QR Code** com uma senha pública
6. **Visualize seu QR Code** gerado
7. **Escaneie o QR Code** ou acesse a URL gerada
8. **Insira a senha pública** para visualizar os dados

---

## 🛠️ 5. Tecnologias Utilizadas

### **Frontend**
- React 18
- Vite
- TailwindCSS
- React Router DOM
- Axios
- QRCode.react

### **Backend**
- NestJS
- TypeORM
- SQLite
- bcrypt
- class-validator

---

## 📱 6. Considerações de Segurança

- Senhas são criptografadas com bcrypt
- Autenticação via JWT
- Dados clínicos protegidos por senha pública adicional
- Validação de dados com class-validator
- CORS configurado para segurança

---

## 📄 7. Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

---

## 👨‍💻 8. Autor

Desenvolvido por **Andrey Goulart**

- GitHub: [@goulartandrey](https://github.com/goulartandrey)
