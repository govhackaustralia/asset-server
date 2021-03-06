![GovHack](https://assets.govhack.org/img/logo/govhack-original-transp.png)
# GovHack Asset Server

Welcome to simple asset server. It's meant for serving __SHARED__, static assets like css, js, and potentially image sprites. A number of subprojects could eventually co-exist on this asset server.

-------------

# Projects

## GovHack site switcher

Load the site switcher via a `<script>` tag, and it will bootstrap the rest:

    <script src="https://assets.govhack.org/js/site-switcher.min.js"></script>

+ The bar will attach itself to the top of the `<body>` tag. 
+ It drags in a couple of external CSS stylesheets via `<link>` tags.

### JavaScript options

**Icon set**: The GH Site Switcher uses [WordPress Dashicons](https://developer.wordpress.org/resource/dashicons/) by default. if you want to force it to explicitly use either Dashicons or Font Awesome, then before including, create a `GH` variable in the window scope and give it some opts like such:

    var GH = {};
    GH.opts = { 
        useDashicons: false, 
        useFontAwesome: true 
    };

    
You can use the above technique to pre-set even more options. A number of options that you can pre-set are:

    {
        useDashicons: true | false,                     // default false
        useFontAwesome: true | false,                   // default true
        layoutStrategy: 'fixed' | 'block-padded',       // default 'block-padded'
        mobileHidden: true | false                    // default false
    }
    
    
### Body classname options

As an alternative to JavaScript option setting (for example if you don't want excess JS bootstrapping) then you can also define a couple of basic layout options as classnames in body. The main benefit of doing this is that it will be immediately visible as the HTML loads. (The JavaScript options will only come into effect at document.load). Classnames that can be added:

+ `ghss-fixed`: CSS to make the siteswitcher `position: fixed` to the top (handy if you have other elements that are `position: fixed` to the top)  
+ `ghss-block-padded`: CSS to add a spacer at the top of the body element, achieved by inserting a `display: block` pseudo-element.
+ `ghss-mobile-hidden`: Hide it on mobile, viewport width <600px
    
-------------

# Development and Deployment

## Installation

This is a node.js project, please ensure you've got Node installed. Then clone this repo to the server:

    git clone git@github.com:govhackaustralia/asset-server.git

Install all the node deps

    npm install

## First run

Since this is your first run, go ahead and build the scss outputs. This can simply be triggered via the gulpfile. It will dump the outputs into `/public/css` and and `/public/js`

    gulp 

Then start the server. Recommended that you use [http-server](https://github.com/indexzero/http-server) to serve the directory. 

You could run this server using [PM2](https://github.com/Unitech/pm2). A utility script is located in the root folder called `up.sh`

## Load balancing

Maybe use a service like AWS ELB to reverse-proxy the node.js server. The `up.sh` script sets the node http-server to run on `:3010`

_Note:_  GovHack asset server should support both https:// and http:// happily depending on its load balancer's/reverse proxy's configuration
