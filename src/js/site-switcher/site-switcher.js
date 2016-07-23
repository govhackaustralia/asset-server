var GH = GH || {};
if (jQuery){
    GH.opts = jQuery.extend({ useDashicons: true, useFontAwesome: false }, GH.opts || {});      // Extend defaults if jQ present
}
else {
    GH.opts = GH.opts || { useDashicons: true, useFontAwesome: false };      // sensible defaults
}

GH.siteSwitcher = (function(){
    'use strict';
    
    /** https://jakearchibald.com/2016/link-in-body/ **/
    document.write('<link rel="stylesheet" href="https://assets.govhack.org/css/site-switcher.css">');
    // document.write('<link rel="stylesheet" href="http://assets-dev.govhack.org/css/site-switcher.css">');
    
    if (GH.opts.useDashicons){
        document.write('<link rel="stylesheet" href="https://www.govhack.org/wp-includes/css/dashicons.min.css">');        
    }
    if (GH.opts.useFontAwesome){
        document.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">');        
    }
    
    var tabs = [{
        name: 'GovSlack', 
        href: 'http://slack.govhack.org', 
        pattern: '/slack\.govhack\.org/',
        fa: 'fa-slack',
        dashicons: 'dashicons-admin-comments'
    }, {
        name: 'Website', 
        href: 'https://www.govhack.org', 
        pattern: '/www\.govhack\.org/',
        fa: 'fa-global',
        dashicons: 'dashicons-admin-site'
    }, {
        name: 'News', 
        href: 'https://www.govhack.org/press/',
        pattern: '//',
        fa: 'fa-rss-square',
        dashicons: 'dashicons-rss'
    }, {
        name: 'Competition Portal',
        href: 'http://portal.govhack.org', 
        pattern: '/portal\.govhack\.org/',
        fa: 'fa-bar-chart', 
        dashicons: 'dashicons-chart-bar'
    }, {
        name: 'Handbook', 
        href: 'http://portal.govhack.org/handbook', 
        pattern: '/portal\.govhack\.org\/handbook/',
        fa: 'fa-sliders', 
        dashicons: 'dashicons-clipboard'
    }];


    if ((+new Date) > 1469782800000){
        // Activate the hackerspace tab button
        tabs.append({
            name: 'Hackerspace',
            href: 'https://2016.hackerspace.govhack.org', 
            fa: 'fa-drupal', 
            dashicons: 'dashicons-megaphone'
        });
    }
    
    console.log('GovHack Site Switcher navbar, loaded from assets.govhack.org');
    
    var navBaseClass = 'gh-ss';
    var navHtml = '';
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
        
        
    // WIP WIP WIP
    // Check localStorage for a cached version
    // if (window.localStorage && !window.location.search){
        // let local = window.localStorage;
        // if (local.getItem('ghLastCachedDate')){
            // let lastCachedDate = parseInt(local.getItem('ghLastCachedDate'));
            // if ((+new Date) - lastCachedDate > (48 * 60 * 60* 1000)){  
                
            // }
        // }
    // }
    
    
    if (window.addEventListener){
        window.addEventListener('load', loadNavHtml, false);      // NB **not** 'onload'
    } 
    else if (window.attachEvent){
        window.attachEvent('onload', loadNavHtml);
    }
    
    //===================================================
    
    function loadNavHtml(){
        
        // Add CSS hooks as defined in options
        if (GH.opts.mobileHidden){
            document.body.classList.add('ghss-mobile-hidden');            
        }
        if (GH.opts.layoutStrategy){
            switch (GH.opts.layoutStrategy){
                case 'block-padded':
                    document.body.classList.add('ghss-block-padded');
                    break;
                case 'fixed':
                    document.body.classList.add('ghss-fixed');
                    break;
            }
        }
        
        // Put the ghss into the top of the body
        document.body.classList.add('ghss-loaded');
        document.body.insertAdjacentHTML('afterbegin', navHtml);
        
    }
    
}());
