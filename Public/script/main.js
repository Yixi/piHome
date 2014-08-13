/**
 * Created by yixi on 8/13/14.
 */



$(function(){
    var APIURL = 'index.php/Home/Api';

    $.get(APIURL,{cmd:"getdata",type:"all"},function(res){
        console.log(res);
        var data = res,
            width = 960,
            height = 60;

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);
        var y = d3.scale.linear().range([height,0]);

        var chart = d3.select('.chart').attr('width',width).attr('height',height);

        y.domain([0, d3.max(data,function(d){return d.value})]);

        var barWidth = 5;

        var bar = chart.selectAll('g').data(data)
            .enter().append('g')
            .attr('transform',function(d,i){return "translate("+i*barWidth + ",0)";});

        bar.append('rect')
            .attr('y',function(d){return y(d.value);})
            .attr('height',function(d){return height - y(d.value)})
            .attr('width',barWidth -1);

        //bar.append('text')
        //    .attr('x',barWidth)
        //    .attr('y',function(d){return y(d.value) + 3})
        //    .attr('dy','1em')
        //    .text(function(d){return d.value});

    });


});