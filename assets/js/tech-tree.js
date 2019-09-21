'use strict';

var complete = 0;

var config = {
    //container: '#tech-tree-',
    rootOrientation: 'WEST', // NORTH || EAST || WEST || SOUTH
    nodeAlign: 'TOP',
    hideRootNode: true,
    siblingSeparation: 20,
    subTeeSeparation:  20,
    scrollbar: 'resize',
    connectors: {
        type: 'step'
    },
    node: {
        HTMLclass: 'tech',
        collapsable: false
    },
    callback: {
        onTreeLoaded: function() {
            init_tooltips();

            const observer = lozad();
            observer.observe();
		}
    }
};

function init_tooltips() {
    if(complete < 3) {
        complete++;
        return;
    }

    $('.node').tooltipster({
        minWidth: 300,
        trigger: 'click',
        maxWidth: 512,
        functionInit: function(instance, helper){
            var content = $(helper.origin).find('.extra-data');
            $(content).find('img').each(function(img, el) {
                $(el).attr('src',$(el).attr('data-src'));
            });
            instance.content($('<div class="ui-tooltip">' + $(content).html() + '</div>'));
        },
        functionReady: function(instance, helper) {
            $(helper.tooltip).find('.tooltip-content').each(function(div){
                var content = $(this).html();
                content = content.replace(new RegExp(/£(\w+)£/,'g'), '<img class="resource" src="../assets/icons/$1.png" />');
                $(this).html(content);
            });
        }
    });
}

function setup(tech) {
    var techClass = (tech.is_dangerous ? ' dangerous' : '')
        + (!tech.is_dangerous && tech.is_rare ? ' rare' : '');
    /*
    var techClass = '';
    if(tech.is_white){
        techClass = ' white';
    }else if(tech.is_green){
        techClass = ' green';
    }else if(tech.is_blue){
        techClass = ' blue';
    }else if(tech.is_purple){
        techClass = ' purple';
    }else if(tech.is_orange){
        techClass = ' orange';
    }*/
    console.log(techClass);
    var tmpl = $.templates("#node-template");
    var html = tmpl.render(tech);

    tech.HTMLid = tech.key;
    tech.HTMLclass = tech.area + techClass;
    tech.innerHTML = html;
    console.log(tech.HTMLclass);
    $(tech.children).each(function(i, node){
        setup(node);
    });
};

$(document).ready(function() {
    load_tree();
});

function _load(jsonData) {
    var container = "#tech-tree-" + jsonData.children[0].name;
    var myconfig = {container: container};
    $.extend(true, myconfig, config);

    new Treant({chart:myconfig, nodeStructure: jsonData.children[0]});
}

function load_tree() {
    $.getJSON('weapons.json', function(jsonData) {
        setup(jsonData);
        _load(jsonData);
    });
    $.getJSON('shields.json', function(jsonData) {
        setup(jsonData);
        _load(jsonData);
    });
    $.getJSON('armor.json', function(jsonData) {
        setup(jsonData);
        _load(jsonData);
    });
    $.getJSON('utility.json', function(jsonData) {
        setup(jsonData);
        _load(jsonData);
    });
}