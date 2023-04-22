"use client";

import Image from "next/image";
import React, { useState } from "react";
import Charts from "./Charts";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const SelectCountry = ({ countries_stat, world_total }: any) => {
  const [select, setSelect] = useState("");

  const filteredData = select
    ? countries_stat.filter((country: any) => {
        return country.country_name.toUpperCase() === select.toUpperCase();
      })
    : world_total;

  return (
    <>
      <div className={inter.className}>
        <div className="img">
          <Image
            src="/images/image.png"
            alt="covid-19"
            width={150}
            height={50}
            priority
          />
        </div>
        {select ? (
          <div>
            {filteredData.map((currElem: any, ind: number) => (
              <div className={`single-card`} key={ind}>
                <h2>{currElem.country_name}</h2>
                <div className="single-card-child">
                  <div>
                    <span>Total Cases</span>
                    <h4 className="counting">{currElem?.cases}</h4>
                  </div>
                  <div>
                    <span>Total Recovered</span>

                    <p className="date">{currElem?.total_recovered}</p>
                  </div>
                  <div>
                    <span>Total Deaths</span>
                    <p className="date">{currElem?.deaths}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`main-card`}>
            <div className="card" style={{ borderBottom: "5px solid purple" }}>
              <h2>Infected</h2>
              <span className="counting">{world_total?.total_cases}</span>
              <p className="date">{world_total?.statistic_taken_at}</p>
            </div>

            <div className="card" style={{ borderBottom: "5px solid green" }}>
              <h2>Recoverd</h2>
              <span className="counting">{world_total?.total_recovered}</span>
              <p className="date">{world_total?.statistic_taken_at}</p>
            </div>

            <div className="card" style={{ borderBottom: "5px solid red" }}>
              <h2>Deaths</h2>
              <span className="counting">{world_total?.total_deaths}</span>
              <p className="date">{world_total?.statistic_taken_at}</p>
            </div>
          </div>
        )}{" "}
        <div className="select-options">
          <select
            defaultValue={select}
            onChange={(e) => setSelect(e.target.value)}
          >
            <option value="">Global</option>
            {countries_stat
              ?.sort((a: any, b: any) => {
                if (a.country_name < b.country_name) {
                  return -1;
                }
                if (a.country_name > b.country_name) {
                  return 1;
                }
                return 0;
              })
              ?.map((country: any, ind: number) => (
                <option value={country.country_name} key={ind}>
                  {country.country_name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <Charts
        filteredData={filteredData}
        select={select}
        world_total={world_total}
      />
    </>
  );
};

export default SelectCountry;
