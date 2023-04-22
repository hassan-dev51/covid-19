"use client";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

import { Chart, registerables } from "chart.js";
import Image from "next/image";
Chart.register(...registerables);

const Charts = ({ filteredData, select, world_total }: any) => {
  let recoverd;
  let cases;
  let deaths;
  if (select) {
    recoverd = filteredData.map(({ total_recovered }: any) => total_recovered);
    cases = filteredData.map(({ cases }: any) => cases);
    deaths = filteredData.map(({ deaths }: any) => deaths);
  }

  let recoverdCount = select && recoverd[0];
  let casesCount = select && cases[0];
  let deathsCount = select && deaths[0];

  const chartData = {
    labels: ["Recoverd", "Infected", "Deaths"],
    datasets: [
      {
        label: "Recovered",
        backgroundColor: "green",
        data: [parseInt(recoverdCount.replace(/,/g, "")), 0, 0],
      },
      {
        label: "Infected",
        backgroundColor: "purple",
        data: [0, parseInt(casesCount.replace(/,/g, "")), 0],
      },
      {
        label: "Deaths",
        backgroundColor: "red",
        data: [0, 0, parseInt(deathsCount.replace(/,/g, ""))],
      },
    ],
  };

  const worldData = {
    labels: ["Recoverd", "Infected", "Deaths"],
    datasets: [
      {
        label: "Recovered",
        backgroundColor: "green",
        data: [parseInt(world_total?.total_recovered.replace(/,/g, "")), 0, 0],
      },
      {
        label: "Infected",
        backgroundColor: "purple",
        data: [0, parseInt(world_total?.total_cases.replace(/,/g, "")), 0],
      },
      {
        label: "Deaths",
        backgroundColor: "red",
        data: [0, 0, parseInt(world_total?.total_deaths.replace(/,/g, ""))],
      },
    ],
  };

  return (
    <div>
      <div style={{ width: "82%", margin: "2rem auto" }}>
        {select ? <Bar data={chartData} /> : <Bar data={worldData} />}
      </div>
    </div>
  );
};

export default Charts;
