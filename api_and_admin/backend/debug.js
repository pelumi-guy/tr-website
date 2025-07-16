import path from "path";

const pwd = path.dirname(".");

var configPath = path.resolve('.', 'config.env')

console.log(`pwd: ${configPath}`);