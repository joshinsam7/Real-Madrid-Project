import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const UCLMa = () => {
  const svgRef = useRef(null);

  const victories = [
    {
        "Year": 1956,
        "City": "Paris",
        "Country": "France",
        "Stadium": "Parc des Princes",
        "Latitude": 48.8414,
        "Longitude": 2.2530,
        "Opponent": "Stade de Reims",
        "Real Madrid Goals": 4,
        "Opponent Goals": 3
    },
    {
        "Year": 1957,
        "City": "Madrid",
        "Country": "Spain",
        "Stadium": "Santiago Bernabéu",
        "Latitude": 40.4531,
        "Longitude": -3.6883,
        "Opponent": "Fiorentina",
        "Real Madrid Goals": 2,
        "Opponent Goals": 0
    },
    {
        "Year": 1958,
        "City": "Brussels",
        "Country": "Belgium",
        "Stadium": "Heysel Stadium",
        "Latitude": 50.8950,
        "Longitude": 4.3347,
        "Opponent": "AC Milan",
        "Real Madrid Goals": 3,
        "Opponent Goals": 2
    },
    {
        "Year": 1959,
        "City": "Stuttgart",
        "Country": "Germany",
        "Stadium": "Neckarstadion",
        "Latitude": 48.7928,
        "Longitude": 9.2322,
        "Opponent": "Stade de Reims",
        "Real Madrid Goals": 2,
        "Opponent Goals": 0
    },
    {
        "Year": 1960,
        "City": "Glasgow",
        "Country": "Scotland",
        "Stadium": "Hampden Park",
        "Latitude": 55.8258,
        "Longitude": -4.2514,
        "Opponent": "Eintracht Frankfurt",
        "Real Madrid Goals": 7,
        "Opponent Goals": 3
    },
    {
        "Year": 1966,
        "City": "Brussels",
        "Country": "Belgium",
        "Stadium": "Heysel Stadium",
        "Latitude": 50.8950,
        "Longitude": 4.3347,
        "Opponent": "Partizan Belgrade",
        "Real Madrid Goals": 2,
        "Opponent Goals": 1
    },
    {
        "Year": 1998,
        "City": "Amsterdam",
        "Country": "Netherlands",
        "Stadium": "Amsterdam Arena",
        "Latitude": 52.3143,
        "Longitude": 4.9414,
        "Opponent": "Juventus",
        "Real Madrid Goals": 1,
        "Opponent Goals": 0
    },
    {
        "Year": 2000,
        "City": "Paris",
        "Country": "France",
        "Stadium": "Stade de France",
        "Latitude": 48.9244,
        "Longitude": 2.3602,
        "Opponent": "Valencia",
        "Real Madrid Goals": 3,
        "Opponent Goals": 0
    },
    {
        "Year": 2002,
        "City": "Glasgow",
        "Country": "Scotland",
        "Stadium": "Hampden Park",
        "Latitude": 55.8258,
        "Longitude": -4.2514,
        "Opponent": "Bayer Leverkusen",
        "Real Madrid Goals": 2,
        "Opponent Goals": 1
    },
    {
        "Year": 2014,
        "City": "Lisbon",
        "Country": "Portugal",
        "Stadium": "Estádio da Luz",
        "Latitude": 38.7528,
        "Longitude": -9.1847,
        "Opponent": "Atlético Madrid",
        "Real Madrid Goals": 4,
        "Opponent Goals": 1
    },
    {
        "Year": 2016,
        "City": "Milan",
        "Country": "Italy",
        "Stadium": "San Siro",
        "Latitude": 45.4781,
        "Longitude": 9.1240,
        "Opponent": "Atlético Madrid",
        "Real Madrid Goals": "1 (5-3 pens)",
        "Opponent Goals": 1
    },
    {
        "Year": 2017,
        "City": "Cardiff",
        "Country": "Wales",
        "Stadium": "Principality Stadium",
        "Latitude": 51.4782,
        "Longitude": -3.1826,
        "Opponent": "Juventus",
        "Real Madrid Goals": 4,
        "Opponent Goals": 1
    },
    {
        "Year": 2018,
        "City": "Kyiv",
        "Country": "Ukraine",
        "Stadium": "NSC Olimpiyskiy Stadium",
        "Latitude": 50.4333,
        "Longitude": 30.5211,
        "Opponent": "Liverpool",
        "Real Madrid Goals": 3,
        "Opponent Goals": 1
    },
    {
        "Year": 2022,
        "City": "Paris",
        "Country": "France",
        "Stadium": "Stade de France",
        "Latitude": 48.9244,
        "Longitude": 2.3602,
        "Opponent": "Liverpool",
        "Real Madrid Goals": 1,
        "Opponent Goals": 0
    }];

  const countryVictories = {};
  victories.forEach(victory => {
    if (!countryVictories[victory.Country]) {
      countryVictories[victory.Country] = [];
    }
    countryVictories[victory.Country].push(victory);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      initializeMap();
    }, 100);
    
    const initializeMap = async () => {
      if (!svgRef.current || !svgRef.current.parentElement) {
        return;
      }
      
      const containerWidth = svgRef.current.parentElement.clientWidth;
      const containerHeight = svgRef.current.parentElement.clientHeight;
      
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();
      
      svg.attr("width", containerWidth)
         .attr("height", containerHeight)
         .style("background-color", "#1a2a3a"); 
      
      const projection = d3.geoMercator()
        .center([10, 50])
        .scale(1300)
        .translate([containerWidth / 2, containerHeight / 2]);

      const path = d3.geoPath().projection(projection);

      try {
        const europeData = await d3.json("https://raw.githubusercontent.com/leakyMirror/map-of-europe/master/GeoJSON/europe.geojson");
        
        if (!europeData || !europeData.features) {
          svg.append("text")
            .attr("x", containerWidth / 2)
            .attr("y", containerHeight / 2)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .text("Map data could not be loaded. Please try again later.");
          return;
        }
        
        const customColors = d3.range(0, 1, 0.1).map(d3.interpolateCool);
        const colorScale = d3.scaleOrdinal()
          .domain(europeData.features.map(d => d.properties.NAME))
          .range(customColors);

        const countriesWithVictories = new Set(victories.map(d => d.Country));

        const defs = svg.append("defs");
        const filter = defs.append("filter")
          .attr("id", "glow")
          .attr("height", "300%")
          .attr("width", "300%");
        
        filter.append("feGaussianBlur")
          .attr("stdDeviation", "8")
          .attr("result", "coloredBlur");
        
        const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode").attr("in", "coloredBlur");
        feMerge.append("feMergeNode").attr("in", "SourceGraphic");

        svg.selectAll(".country")
          .data(europeData.features)
          .enter().append("path")
          .attr("class", "country")
          .attr("d", path)
          .attr("fill", d => countriesWithVictories.has(d.properties.NAME) ? 
              "#4169E1" : colorScale(d.properties.NAME))
          .attr("stroke", d => countriesWithVictories.has(d.properties.NAME) ? 
              "#FFD700" : "#FFFFFF")
          .attr("stroke-width", d => countriesWithVictories.has(d.properties.NAME) ? 
              4 : 0.5)
          .attr("filter", d => countriesWithVictories.has(d.properties.NAME) ? 
              "url(#glow)" : null)
          .attr("opacity", d => countriesWithVictories.has(d.properties.NAME) ? 
              0.9 : 0.6);

        svg.selectAll("text")
          .data(europeData.features)
          .enter().append("text")
          .attr("transform", d => `translate(${projection(d3.geoCentroid(d))})`)
          .attr("dy", ".35em")
          .attr("font-size", d => countriesWithVictories.has(d.properties.NAME) ? 
              "14px" : "8px")
          .attr("fill", d => countriesWithVictories.has(d.properties.NAME) ? 
              "#FFD700" : "#ddd")
          .attr("text-anchor", "middle")
          .style("font-weight", d => countriesWithVictories.has(d.properties.NAME) ? 
              "bold" : "normal")
          .style("text-shadow", d => countriesWithVictories.has(d.properties.NAME) ? 
              "2px 2px 4px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" : "none")
          .text(d => d.properties.NAME);

        svg.selectAll(".victory")
          .data(victories)
          .enter().append("image")
          .attr("class", "victory-marker")
          .attr("xlink:href", "./ucl_wins/uefa.png")
          .attr("width", 40)
          .attr("height", 40)
          .attr("x", d => projection([d.Longitude, d.Latitude])[0] - 20)
          .attr("y", d => projection([d.Longitude, d.Latitude])[1] - 20)
          .style("filter", "drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.5))")
          .style("cursor", "pointer");

        svg.insert("rect", ":first-child")
          .attr("width", containerWidth)
          .attr("height", containerHeight)
          .attr("fill", "#1a2a3a")
          .attr("opacity", 0.2);

        const zoom = d3.zoom()
          .scaleExtent([1, 8])
          .on("zoom", (event) => {
            svg.attr("transform", event.transform);
          });

        svg.call(zoom);
      } catch (error) {
        svg.append("text")
          .attr("x", containerWidth / 2)
          .attr("y", containerHeight / 2)
          .attr("text-anchor", "middle")
          .attr("fill", "white")
          .text("Error loading map. Please check console for details.");
      }
    };

    const handleResize = () => {
      clearTimeout(timer);
      initializeMap();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div style={{ 
      width: '100%',
      height: '100vh',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px'
    }}>
      <h1 style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
        Real Madrid's UCL Final Wins Across Europe
      </h1>
      <div style={{
        width: '90%',
        height: '80%',
        backgroundColor: '#0a1622',
        borderRadius: '20px',
        border: '15px solid #152238',
        boxShadow: '0 0 30px rgba(0, 0, 0, 0.7), inset 0 0 30px rgba(0, 0, 0, 0.4)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '20px',
          width: '40px',
          height: '20px',
          backgroundColor: '#444',
          borderRadius: '5px',
          zIndex: 2
        }}></div>
        
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#1a2a3a',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <svg 
            ref={svgRef} 
            style={{ width: '100%', height: '100%' }}
            key="map-svg"
          />
          
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            display: 'none',
            zIndex: 1
          }} id="map-fallback">
            Loading map...
          </div>
        </div>
        
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)',
          pointerEvents: 'none',
          zIndex: 2
        }}></div>
      </div>
    </div>
  );
};

export default UCLMa;