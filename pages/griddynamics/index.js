/** App.js */
import React from "react";
import MultilineChart from "../../components/MultilineChart";
import schc from "../../data/SCHC.json";
import vcit from "../../data/VCIT.json";
import portfolio from "../../data/portfolio.json";
import styles from "../../components/MultilineChart/multiline.module.css"

const portfolioData = {
  name: "Portfolio",
  color: "#ffffff",
  items: portfolio.map((d) => ({ ...d, date: new Date(d.date) }))
};
const schcData = {
  name: "SCHC",
  color: "#d53e4f",
  items: schc.map((d) => ({ ...d, date: new Date(d.date) }))
};
const vcitData = {
  name: "VCIT",
  color: "#5e4fa2",
  items: vcit.map((d) => ({ ...d, date: new Date(d.date) }))
};

const dimensions = {
  width: 600,
  height: 300,
  margin: {
    top: 30,
    right: 30,
    bottom: 30,
    left: 60
  }
};

export default function Griddynamics() {
  return (
    <div className={styles.app}>
      <MultilineChart
        data={[portfolioData, schcData, vcitData]}
        dimensions={dimensions}
      />
    </div>
  );
}
