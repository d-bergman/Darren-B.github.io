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
        type: 'step',
        style:{
            stroke:'white'
        }
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
            console.log("content: ", content);
            $(content).find('img').each(function(img, el) {
                $(el).attr('src',$(el).attr('data-src'));
            });
            instance.content($('<div class="ui-tooltip">' + $(content).html() + '</div>'));
        },
        functionReady: function(instance, helper) {
            $(helper.tooltip).find('.tooltip-content').each(function(div){
                var content = $(this).html();
                console.log("content2: ", content);
                content = content.replace(new RegExp(/£(\w+)£/,'g'), '<img class="resource" src="../assets/icons/$1.png" />');
                $(this).html(content);
            });
        }
    });
}

function setup(tech) {
  // var techClass = (tech.is_white ? ' white' : '')
    //   + (!tech.is_white && tech.is_green ? ' green' : '');
    /**/
   
    var techClass ='';
    if(tech.mod_tier == "100"){
        techClass = ' white';
    }else if(tech.mod_tier == "200"){
        techClass = ' green';
    }else if(tech.mod_tier == "300"){
        techClass = ' blue';
    }else if(tech.mod_tier == "400"){
        techClass = ' purple';
    }else if(tech.mod_tier == "500"){
        techClass = ' orange';
    }
    var tmpl = $.templates("#node-template");
    var html = tmpl.render(tech);

    tech.HTMLid = tech.key;
    tech.HTMLclass = tech.area + techClass;
    tech.innerHTML = html;
    console.log("techclass 2" , tech.HTMLclass);
    $(tech.children).each(function(i, node){
        setup(node);
        //init_tooltips();
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
    $.getJSON('test.json', function(jsonData) {
        // Event techs don't really need a Tree
        $(jsonData).each(function(index, item) {
            setup(item);
            var e = $("<div>").html(item.innerHTML);
            e.attr("class",item.HTMLclass)
            e.addClass("node").addClass("tech").addClass("anomaly");
            $('#tech-tree-test').append(e);
            init_tooltips();
        });
    });
}