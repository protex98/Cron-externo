const { app, BrowserWindow, ipcMain } = require('electron');
const axios = require('axios');
const cron = require('node-cron');

let mainWindow;
let jobs = []; // Armazena os cron jobs para controle

// Função para criar a janela principal
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Inicializa a janela quando o Electron estiver pronto
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Status das tarefas
let updateStatus = Array(7).fill({
  lastUpdated: 'Nunca',
  status: 'Aguardando...',
});

// Função que executa o cronjob
function executeCronJob(url, jobId) {
  const job = cron.schedule('* * * * *', async () => {
    try {
      console.log(`Executando a tarefa ${jobId} para: ${url}`);
      await axios.get(url);
      updateStatus[jobId] = {
        lastUpdated: new Date().toLocaleString(),
        status: 'Atualizado com sucesso!',
      };
    } catch (error) {
      updateStatus[jobId] = {
        lastUpdated: new Date().toLocaleString(),
        status: 'Erro na requisição!',
      };
      console.error(`Erro na tarefa ${jobId}:`, error.message);
    }

    // Enviar status atualizado para a interface gráfica
    if (mainWindow) {
      mainWindow.webContents.send('update-status', updateStatus);
    }
  });

  jobs.push(job);
}

// Inicia os cronjobs ao receber as URLs
ipcMain.on('start-cron', (event, urls) => {
  console.log('Recebido evento start-cron com URLs:', urls);

  // Cancelar tarefas anteriores para evitar duplicação
  jobs.forEach((job) => job.stop());
  jobs = [];

  if (urls.length === 7) {
    urls.forEach((url, index) => {
      executeCronJob(url, index);
    });
    console.log('Tarefas iniciadas!');
  } else {
    console.log('ERRO: São necessárias exatamente 7 URLs.');
  }
});
