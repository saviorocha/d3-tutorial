import React from "react";
import path from "path";
import fs from "fs/promises";

const Histogram = ({ histogram }) => {
  useEffect(() => {
    // The Number of Bins that should be registered
    const numberOfBins = 25;

    // Use d3 to generate the bin array of all values automatically
    const histogram = d3
      .bin()
      .domain(x.domain())
      .value((d) => d.value)
      .thresholds(numberOfBins);

    // Save the Array of Bins to a constant
    const bins = histogram(values);
    console.log("histogram", bins);
  }, []);
  return <div>Histogram</div>;
};
export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data", "histogram.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      histogram: data,
    },
    revalidate: 10,
  };
};

export default Histogram;
