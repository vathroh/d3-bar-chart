import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import * as d3 from 'd3'

function BarChart() {

    const [data] = useState([200, 250, 60, 150, 100, 175])
    const svgRef = useRef();

    useEffect(() => {

        const width = 500;
        const height = 200;
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('margin-top', '40px')
            .style('overflow', 'visible')
            .style('background', 'teal')

        const xScale = d3.scaleBand()
            .domain(data.map((d, i) => i))
            .range([0, width])
            .padding(0.4)

        console.log('xScale', xScale(5));

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data) + 50])
            .range([height, 0])

        console.log('yScale', yScale(0))

        const xAxis = d3.axisBottom(xScale)
            .ticks(data.length)
        const yAxis = d3.axisLeft(yScale)
            .ticks(data.length)

        svg.selectAll('.bar')
            .data(data)
            .join('rect')
            .attr('x', (v, i) => xScale(i))
            .attr('y', yScale)
            .attr('width', xScale.bandwidth())
            .attr('height', val => height - yScale(val))

        d3.select('#x-axis').remove()
        svg.append('g')
            .attr('transform', `translate(0, ${height})`)
            .attr('id', 'x-axis')
            .call(xAxis)

        d3.select('#y-axis').remove()
        svg.append('g')
            // .attr('transform', `translate(0, 0)`)
            .attr('id', 'y-axis')
            .call(yAxis)

    }, [data])

    return (
        <div className='App'>
            <svg ref={svgRef}></svg>
        </div>
    )
}

export default BarChart