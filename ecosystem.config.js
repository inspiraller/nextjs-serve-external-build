module.exports = {
  apps: [
    {
      name: "pm2-nextjs",
      script: 'shared/.next/standalone/server.js',
      exec_mode: "cluster",
      instances: "3", 
      args: "start",
      max_memory_restart: "300M",
      // Logging
      out_file: "./out.log",
      error_file: "./error.log",
      cwd: __dirname, // current working directory
      merge_logs: true,
      log_date_format: "DD-MM HH:mm:ss Z",
      log_type: "json",
      env_production: {
        NODE_ENV: "production",
       // nextBuildPath: "" Does not work here because its custom. You need to export this as a variable via bash or use cross-env in package.json
        PORT: 3000, // ecosystem.config.js, Dockefile
        exec_mode: "cluster_mode",
      },
      exp_backoff_restart_delay: 1000,
      max_restarts: 3,
      min_uptime: 10000,
      // Disable features that might need system utilities
      source_map_support: false,
      disable_trace: true,
      watch: false,
    },
  ],
};