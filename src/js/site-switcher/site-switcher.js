var GH = GH || {};
if (jQuery){
    GH.opts = jQuery.extend({ useDashicons: true, useFontAwesome: false }, GH.opts || {});      // Extend defaults if jQ present
}
else {
    GH.opts = GH.opts || { useDashicons: true, useFontAwesome: false };      // sensible defaults
}

GH.siteSwitcher = (function(){
    'use strict';
    
    // https://jakearchibald.com/2016/link-in-body/
    document.write('<link rel="stylesheet" href="https://assets.govhack.org/css/site-switcher.css">');
    
    if (GH.opts.useDashicons){
        document.write('<link rel="stylesheet" href="https://www.govhack.org/wp-includes/css/dashicons.min.css">');        
    }
    if (GH.opts.useFontAwesome){
        document.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">');        
    }
    
    var tabs = [{
        name: 'Website', 
        href: 'http://www.govhack.org', 
        pattern: '/www\.govhack\.org/',
        fa: 'fa-global',
        dashicons: 'dashicons-admin-site'
    },
    {
        name: 'Blog', 
        href: 'http://blog.govhack.org', 
        pattern: '/blog\.govhack\.org/',
        fa: 'fa-rss-square',
        dashicons: 'dashicons-rss'
    },
    {
        name: 'Competition Portal',
        href: 'http://portal.govhack.org', 
        pattern: '/portal\.govhack\.org/',
        fa: 'fa-bar-chart', 
        dashicons: 'dashicons-chart-bar'
    },
    {
        name: 'Participant Kit', 
        href: 'http://govhack-toolkit.readthedocs.io', 
        pattern: '/readthedocs\.io/',
        fa: 'fa-sliders', 
        dashicons: 'dashicons-clipboard'
    }];


    if (GH.hackerspace){
        tabs.append({
            name: 'Hackerspace',
            href: 'http://hackerspace.govhack.org', 
            fa: 'fa-comments', 
            dashicons: 'dashicons-megaphone'
        });
    }
    
    var navBaseClass = 'gh-ss';

    var navHtml = '<!-- GovHack Site Switcher navbar, loaded from assets.govhack.org -->';
    navHtml += `<nav class="${navBaseClass}"><ul>`;
    
    tabs.forEach(function(tab){
        // Don't add the current site to the toolbar
        var re = new RegExp(tab.pattern);
        if (re.test(document.location.href)){
            return false;
        }
        navHtml += `<li><a href="${tab.href}">`;
        if (GH.opts.useDashicons){
            navHtml += `<span class="dashicons ${tab.dashicons}"></span>`;
        }
        if (GH.opts.useFontAwesome){
            navHtml += `<span class="fa ${tab.fa}"></span>`;
        }
        navHtml += tab.name + '</a></li>';
    });
        
    navHtml += '</ul></nav>';
    
    if (window.addEventListener){
        window.addEventListener('load', loadNavHtml, false);      // NB **not** 'onload'
    } 
    else if (window.attachEvent){
        window.attachEvent('onload', loadNavHtml);
    }
    
    //===========
    
    function loadNavHtml(){
        // Add a CSS hook
        document.body.classList.add('with-gh-ss');
        document.body.classList.add('block-padded');
        // Put the gh-ss into the top of the body
        document.body.insertAdjacentHTML('afterbegin', navHtml);

        // Add extra classnames if the opts so demand
        if (GH.opts.extraClassNames && GH.opts.extraClassNames instanceof Array){
            document.querySelector(`.${navBaseClass}`).classList.add(GH.opts.extraClassNames.join());
        }
    }
    
}());
