/**
 * Created by yixi on 8/13/14.
 */



$(function(){

    //room data area;
    var margin = {top:20,right:20,bottom:30,left:40},
        width = 960 - margin.left - margin.right,
        height = 200 - margin.top -margin.bottom,
        barWidth = 10;

//    var x = d3.scale.ordinal().rangeRoundBands([0,width],1);
    var y = d3.scale.linear().range([height,0]);

//    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient('left').ticks(11);

    var tip = d3.tip()
        .attr('class','tip')
        .offset([-10,0])
        .html(function(d){
            var date = new Date((d.time|0) * 1000);
            var time = date.toLocaleDateString()  + " "+date.getHours() + ":" + date.getMinutes();
            return ' <span class="value">' + d.value +' °C</span><br/>'+ '<span class="time">' + time +'</span>';
        });


    var room = d3.select('.room').attr('width',width + margin.left + margin.right)
        .attr('height', height+margin.top + margin.bottom)
        .append('g')
        .attr('transform','translate('+margin.left +","+ margin.top+")");

    room.call(tip);

//    x.domain(roomData.map(function(d){
//        var date = new Date(d.time|0);
//        return date.getHours() + ":" +date.getMinutes();
//    }));
//    x.domain(roomData.map(function(d){return d.time}));
    y.domain([0 , d3.max(roomData,function(d){ return d.value})]);

//    room.append('g')
//        .attr('class','x axis')
//        .attr('transform','translate(0,'+height+")")
//        .call(xAxis);

    room.append('g')
        .attr('class','y axis')
        .attr('transform','translate(-10,0)')
        .call(yAxis)
        .append('text')
//        .attr('transform','rotate(0)')
//        .attr('x',-10)
        .attr('y',-10)
        .attr('dy','.75em')
        .style('text-anchor','end')
        .text('°C');

    room.selectAll('.bar').data(roomData)
        .enter().append('rect')
        .attr('class','bar')
        .attr('transform',function(d,i){return 'translate('+ i*barWidth+',0)'})
        .attr('width', barWidth -1)
        .attr('y',function(d){ return y(d.value)})
        .attr('height', function(d) { return height - y(d.value)})
        .on('mouseover',tip.show)
        .on('mouseout',tip.hide);

    function type(d){
        d.value  += d.value;
        return d;
    }



});