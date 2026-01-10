#!/usr/bin/env node
/**
 * Script per aggiornare la versione in tutti i file del progetto
 * Viene eseguito automaticamente con npm version
 */

const fs = require('fs');
const path = require('path');

const packageJson = require('../package.json');
const version = packageJson.version;

// Aggiorna index.html
const indexPath = path.join(__dirname, '../index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');
indexHtml = indexHtml.replace(
  /Versione \d+\.\d+(\.\d+)?/g,
  `Versione ${version}`
);
fs.writeFileSync(indexPath, indexHtml);

// Aggiorna changelog.json
const changelogPath = path.join(__dirname, '../data/changelog.json');
const changelog = require(changelogPath);
changelog.currentVersion = version;
fs.writeFileSync(changelogPath, JSON.stringify(changelog, null, 4) + '\n');

console.log(`Versione aggiornata a ${version}`);
