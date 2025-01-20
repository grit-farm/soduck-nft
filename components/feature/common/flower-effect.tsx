"use client";

import React from "react";
import Snowfall from "react-snowfall";

const FlowerEffect = () => {
  return (
    <div>
      <Snowfall
        color="pink"
        snowflakeCount={100}
        radius={[3, 5]}
        speed={[1, 2]}
        wind={[1, 2]}
      />
    </div>
  );
};

export default FlowerEffect;
