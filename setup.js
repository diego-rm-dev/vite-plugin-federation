const { execSync, exec } = require('child_process');

// Color helpers using ANSI escape codes
const cyan = (text) => `\x1b[36m${text}\x1b[0m`;
const green = (text) => `\x1b[32m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;
const bold = (text) => `\x1b[1m${text}\x1b[0m`;

console.log(bold(cyan('>>> Installing dependencies for Host and Microservices...')));

try {
    execSync('cd host && npm install', { stdio: 'inherit' });
    execSync('cd microservice-1 && npm install', { stdio: 'inherit' });
    execSync('cd microservice-2 && npm install', { stdio: 'inherit' });
} catch (error) {
    console.error(red(`Failed to install dependencies: ${error.message}`));
    process.exit(1);
}

console.log(bold(cyan('>>> Starting Microservices and Host in parallel...')));

// Run all services concurrently
exec(
    'npx concurrently "cd microservice-1 && npm run dev" "cd microservice-2 && npm run dev" "cd host && npm run dev"',
    (error, stdout, stderr) => {
        if (error) {
            console.error(red(`Error occurred: ${error.message}`));
            return;
        }
        if (stderr) {
            console.error(red(`stderr: ${stderr}`));
            return;
        }
        console.log(stdout);
    }
);

console.log(bold(green('>>> All applications are running.')));
console.log(bold(`Open ${cyan('http://localhost:3000')} in your browser!`));
