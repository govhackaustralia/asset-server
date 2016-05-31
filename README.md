![GovHack](http://gh16.alan.id.au/wp-content/themes/govhack-16/img/logo.png)
# GovHack Asset Server

Welcome to simple asset server. It's meant for serving static assets like css, js, and potentially image sprites.

Bits currently covered include:

+ GovHack site switcher

-------------

## Installation

This is a node.js project, please ensure you've got Node installed. Then clone this repo to the server:

    git clone git@github.com:govhackaustralia/asset-server.git

Install all the node deps

    npm install

Since this is your first run, go ahead and build the scss outputs. This can simply be triggered via the gulpfile. It will dump the outputs into `/public/css`
    gulp 

## First run

The `server.js` file is the entry point, it turns the `/public` directory into a classic web-served directory. 

__Recommended__: Run this server using [PM2](https://github.com/Unitech/pm2)
