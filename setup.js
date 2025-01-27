const { execSync, exec } = require('child_process');

console.log('Installing dependencies for host and microservices...');

execSync('cd host && npm install', { stdio: 'inherit' });
execSync('cd microservice-1 && npm install', { stdio: 'inherit' });
execSync('cd microservice-2 && npm install', { stdio: 'inherit' });

console.log('Starting microservices and host in parallel...');

// Run all services concurrently
exec('npx concurrently "cd microservice-1 && npm run dev" "cd microservice-2 && npm run dev" "cd host && npm run dev"', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error occurred: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

console.log('All applications are running. Open http://localhost:3000');
