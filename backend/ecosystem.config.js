require('dotenv').config({ path: './backend/.env.deploy' });

module.exports = {
  apps: [
    {
      name: 'backend',
      script: './src/app.ts',
      interpreter: 'ts-node',
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: process.env.USER,
      host: process.env.HOST,
      ref: 'origin/master',
      repo: process.env.REPO,
      path: process.env.BACKEND_PATH,
      'pre-deploy-local': '',
      'post-deploy': `
        cp ~/local/path/to/.env backend/.env &&
        cd backend &&
        npm install &&
        pm2 startOrReload ecosystem.config.js --only backend
      `,
    },
  },
};
