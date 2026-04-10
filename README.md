# Minimalist Node.js Framework

A lightweight, dependency-free HTTP framework built from scratch using only Node.js core modules (`http`, fs, `path`). No Express, no external libraries.

## Why I built this

To prove I understand what happens under the hood of frameworks like Express – routing, request handling, and persistence – without relying on npm packages.

## Features

- RESTful API structure (GET, POST, PUT, DELETE)
- File-based persistent storage using fs (data survives server restarts)
- Modular architecture (routes, controllers, data layers separated)
- Zero npm dependencies

## Tech Stack

- Node.js (core modules only)
- File system (JSON files)

## Quick Start

```bash
git clone https://github.com/GreatKingdavid/Minimalist-Node.js-Framework
cd Minimalist-Node.js-Framework
node server.js
