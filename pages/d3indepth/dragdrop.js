import React from "react";
import * as d3 from "d3";
import { useEffect } from "react";
import styles from "../../components/animation.module.css";

const DragDrop = () => {
    useEffect(() => {
        let data = [], width = 600, height = 400, numPoints = 10;

        let drag = d3.drag()
            .on('drag', handleDrag);
        
        function handleDrag(e) {
            e.subject.x = e.x;
            e.subject.y = e.y;
            update();
        }
        
        function initDrag() {
            d3.select('svg')
                .selectAll('circle')
                .call(drag);
        }
        
        function updateData() {
            data = [];
            for(let i=0; i<numPoints; i++) {
                data.push({
                    id: i,
                    x: Math.random() * width,
                    y: Math.random() * height
                });
            }
        }
        
        function update() {
            d3.select('svg')
                .selectAll('circle')
                .data(data)
                .join('circle')
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; })
                .attr('r', 40);
        }
        
        updateData();
        update();
        initDrag();
        
  }, []);

  return <div className={styles.app}>
    <svg width="600" height="400"></svg>
  </div>;
};

export default DragDrop;
