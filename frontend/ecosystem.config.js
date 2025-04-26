require('dotenv').config({ path: './frontend/.env.deploy' });

module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'serve',
      args: '-s build -l 3000',
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
      path: process.env.FRONTEND_PATH,
      'pre-deploy-local': '',
      'post-deploy': `
        cd frontend &&
        npm install &&
        npm run build &&
        pm2 startOrReload ecosystem.config.js --only frontend
      `,
    },
  },
};
