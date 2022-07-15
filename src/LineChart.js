import React from 'react'
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3'
import { curveCardinal } from 'd3';

function LineChart() {
    const initialData = [
        {
            "hari": "Senin",
            "value": 16
        },
        {
            "hari": "Selasa",
            "value": 15
        },
        {
            "hari": "Rabu",
            "value": 13
        },
        {
            "hari": "Kamis",
            "value": 17
        },
        {
            "hari": "Jum'at",
            "value": 15
        },
        {
            "hari": "Sabtu",
            "value": 12
        },
        {
            "hari": "Minggu",
            "value": 19
        }
    ]

    const [data, setData] = useState(initialData);
    const svgRef = useRef();
    const padding = 20;
    const width = 500;
    const height = 200;

    const ubahData = () => data.map((e) => {
        e.value = Math.floor(
            Math.floor((Math.random() * 20) + 1)
        )
        return e;
    })

    useEffect(() => {
        const xScale = d3.scalePoint()
            .domain(data.map((e) => e.hari))
            .range([(0 + padding), (width - padding)])
        console.log('Start - End', xScale('Samsung'), xScale('Xiaomi'))

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, (e) => e.value)])
            .range([(height - padding), (0 + padding)])
        console.log('Start - End', yScale(0), yScale(10))

        const line = d3.line()
            .x((e) => xScale(e.hari))
            .y((e) => yScale(e.value))
            .curve(curveCardinal)
        console.log('chart draw commands', line(data))

        d3.select(svgRef.current)
            .select('path')
            .attr('d', (value) => line(data))
            .attr('fill', 'none')
            .attr('stroke', 'blue')

        const xAxis = d3.axisBottom(xScale)
        const yAxis = d3.axisLeft(yScale)

        d3.select('#-axis').remove()
        d3.select(svgRef.current)
            .append('g')
            .attr('transform', `translate(0,${height - padding})`)
            .attr('id', 'x-axis')
            .call(xAxis)

        d3.select('#y-axis').remove()
        d3.select(svgRef.current)
            .append('g')
            // .attr('transform', `translate(${padding}), 0`)
            .attr('transform', `translate(${padding},0)`)
            .attr('id', 'y-axis')
            .call(yAxis)

    }, [data])



    return (
        <div>
            <div className="App">

                <svg ref={svgRef} >
                    <path />
                </svg>
                <div>
                    <button onClick={() => setData(ubahData)}>Ubah Data</button>
                </div>
            </div>
            <div>
                <ol>
                    {
                        data ? data.map((e) => {
                            return (
                                <li key={e.hari}>{e.hari} : {e.value}</li>
                            )
                        }) : ''
                    }
                </ol>
            </div>
        </div>
    )
}

export default LineChart