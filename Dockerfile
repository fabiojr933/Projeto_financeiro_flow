# Usando a versão exata que você tem na máquina para evitar conflitos
FROM node:22-alpine

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de dependências primeiro (otimiza o cache do Docker)
COPY package*.json ./
RUN npm install --omit=dev

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta definida no seu .env
EXPOSE 3020

# Comando para iniciar a aplicação
CMD ["npm", "start"]