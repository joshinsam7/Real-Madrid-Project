import React, { useEffect, useState } from 'react';
import * as d3 from "d3";
import ParallaxComp from '../Parallax/Parallax';
import { useRef } from 'react';

export default function EarlySuccessLineChart() {
    const [activeChart, setActiveChart] = useState('copa'); 
    
    const data1 = [
        { group: "1929", value: 2 },
        { group: "1930", value: 5 },
        { group: "1931", value: 6 },
        { group: "1932", value: 1 },
        { group: "1933", value: 1 },
        { group: "1934", value: 2 },
        { group: "1935", value: 2 },
        { group: "1936", value: 2 },
        { group: "1937", value: 4 },
        { group: "1938", value: 6 },
        { group: "1939", value: 2 },
    ];
    
    const data2 = [
        { group: "1903", value: 2 },
        { group: "1904", value: 7 },
        { group: "1905", value: 1 },
        { group: "1906", value: 1 },
        { group: "1907", value: 1 },
        { group: "1908", value: 1 },
        { group: "1909", value: 7 },
        { group: "1910", value: 7 },
        { group: "1911", value: 7 },
        { group: "1912", value: 7 },
        { group: "1913", value: 7 },
        { group: "1914", value: 7 },
        { group: "1915", value: 7 },
        { group: "1916", value: 2 },
        { group: "1917", value: 1 },
        { group: "1918", value: 1 },
        { group: "1919", value: 7 },
        { group: "1920", value: 7 },
        { group: "1921", value: 7 },
        { group: "1922", value: 7 },
        { group: "1923", value: 7 },
        { group: "1924", value: 1 },
        { group: "1925", value: 7 },
        { group: "1926", value: 7 },
        { group: "1927", value: 7 },
        { group: "1928", value: 7 },
        { group: "1929", value: 2 },
        { group: "1930", value: 2 },
        { group: "1931", value: 7 },
        { group: "1932", value: 7 },
        { group: "1933", value: 2 },
        { group: "1934", value: 1 },
        { group: "1935", value: 7 },
        { group: "1936", value: 1 },
        { group: "1937", value: 7 },
        { group: "1938", value: 7 },
        { group: "1939", value: 7 },
        { group: "1940", value: 2 },
        { group: "1941", value: 7 },
        { group: "1942", value: 7 },
    ];
    
    const svgRef = useRef(null);
    const rankingMap = [
        "Winner",
        "Finals",
        "Semis",
        "Quarters",
        "R16",
        "R32",
        "DNP"
    ];
    
    const renderChart = (chartType) => {

        const margin = { top: 30, right: 30, bottom: 70, left: 100 };
        const width = 1070 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;
        

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        
   
        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        

        const data = chartType === 'laliga' ? data1 : data2;
        
 
        const x = d3.scaleBand()
            .range([0, width])
            .domain(data.map(d => d.group))
            .padding(0.2);
        
        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-45)");
        
  
        let yDomain ;
        if(chartType === 'laliga'){
            yDomain = [10, 1]
        }
        else{
            yDomain = [8,1]
        }
        
        const y = d3.scaleLinear()
            .domain(yDomain)
            .range([height, 0]);
        
        const yAxis = d3.axisLeft(y)
            .tickValues(chartType === 'laliga' ? d3.range(1, 11) : d3.range(1, 9))
            .tickFormat(d => chartType === 'laliga' ? d.toString() : (d <= 7 ? rankingMap[d - 1] : d.toString()));
         
        
        g.append("g")
            .attr("class", "myYaxis")
            .call(yAxis);
        

        const line = d3.line()
            .x(d => x(d.group) + x.bandwidth() / 2)
            .y(d => y(d.value));
        
        g.append("path")
            .datum(data)
            .attr("class", "line-path")
            .attr("fill", "none")
            .attr("stroke", "#69b3a2")
            .attr("stroke-width", 2)
            .attr("d", line);
        
        g.selectAll(".data-point")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "data-point")
            .attr("cx", d => x(d.group) + x.bandwidth() / 2)
            .attr("cy", d => y(d.value))
            .attr("r", 4)
            .attr("fill", "#69b3a2");
            
       
        g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -height / 2)
            .attr("text-anchor", "middle")
            .text(chartType === 'laliga' ? "Position" : "Result");
    };
    
    useEffect(() => {
        renderChart(activeChart);
    }, [activeChart]); 
    
    return (
        <ParallaxComp>
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}> 
                <h2>Real Madrid's Early Exploits</h2>
                
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <button 
                        onClick={() => setActiveChart('laliga')}
                        style={{ 
                            fontWeight: activeChart === 'laliga' ? 'bold' : 'normal',
                            background: activeChart === 'laliga' ? '#69b3a2' : '#f0f0f0'
                        }}
                    >
                        La Liga
                    </button>
                    <button 
                        onClick={() => setActiveChart('copa')}
                        style={{ 
                            fontWeight: activeChart === 'copa' ? 'bold' : 'normal',
                            background: activeChart === 'copa' ? '#69b3a2' : '#f0f0f0'
                        }}
                    >
                        Copa Del Rey
                    </button>
                </div>
                
                <svg 
                    ref={svgRef} 
                    key="map-svg"
                    width="1200"
                    height="500"
                    style={{ 
                        maxWidth: '100%',
                        overflow: 'visible',
                    }}
                />
                
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '15px',
                    borderRadius: '10px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.58)',
                    maxWidth: '1000px',
                    textAlign: 'left',
                marginTop: '-100px',
                }}>
                <p style={{
                    margin: 0,
                    fontSize: '1.5rem',
                    fontStyle: 'italic',
                    color: '#333'
                }}>
                They became popular and were all over the NEWS
              </p>
            </div>
            </div>
        </ParallaxComp>
    );
}