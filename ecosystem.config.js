module.exports = {
  apps: [{
    name: 'xinqi-logistics',
    script: 'npx',
    args: 'next start --port 5000',
    cwd: '/opt/xinqi-freight',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_file: '.env',
    env_production: {
      NODE_ENV: 'production',
    },
    // 日志配置
    error_file: '/app/work/logs/bypass/pm2-error.log',
    out_file: '/app/work/logs/bypass/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
  }]
};
