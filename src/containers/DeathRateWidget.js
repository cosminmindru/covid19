import React, { useState } from "react";
import styled from "styled-components/macro";
import Typography from "@material-ui/core/Typography";
import { ResponsivePie } from "@nivo/pie";
import { useQuery } from "react-query";
import { getOverview } from "../libs/covid19";
import { calculateDeathRate } from "../utils/calculateDeathRate";

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 4fr;
  width: 100%;
  height: 100%;
  border: 1px solid ${props => props.theme.colors.grey};
  border-radius: 0.5rem;
  background-color: ${props => props.theme.colors.white};
`;

const Section = styled.section`
  grid-column: ${props => props.gridColumn};
  grid-row: ${props => props.gridRow};
  align-self: ${props => props.alignSelf || "stretch"};
  padding: ${props => (props.noPadding ? "0" : "1.25rem")};
`;

const HeaderSection = styled(Section)`
  border-bottom: 1px solid ${props => props.theme.colors.grey};
`;

const ChartSection = styled(Section)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 18rem;
`;

const DeathRateOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const DeathRateText = styled.h1`
  font-size: 1.75rem;
  color: red;
  transform: translateY(-0.5rem);
`;

const DeathRateWidget = () => {
  const [confirmedCases, setConfirmedCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [deathRate, setDeathRate] = useState(0);

  const overviewQuery = useQuery("overview", getOverview, {
    onSuccess: data => {
      const confirmedCases = data.confirmed.value;
      const deaths = data.deaths.value;
      const computedDeathRate = calculateDeathRate({ confirmedCases, deaths });

      setConfirmedCases(confirmedCases);
      setDeaths(deaths);
      setDeathRate(computedDeathRate);
    }
  });

  const colors = {
    Deaths: "red",
    Confirmed: "orange"
  };

  return (
    <Wrapper>
      <HeaderSection gridColumn="1 / last-line" gridRow="1 / 2">
        <Typography variant="h6">Death Rate</Typography>
      </HeaderSection>
      <ChartSection gridColumn="1 / last-line" gridRow="2 / 2">
        {overviewQuery.data && (
          <>
            <DeathRateOverlay>
              <DeathRateText>{deathRate}%</DeathRateText>
            </DeathRateOverlay>
            <ResponsivePie
              data={[
                {
                  id: "Confirmed",
                  label: "confirmed",
                  value: confirmedCases,
                  color: "hsl(350, 70%, 50%)"
                },
                {
                  id: "Deaths",
                  label: "deaths",
                  value: deaths,
                  color: "hsl(284, 70%, 50%)"
                }
              ]}
              margin={{ bottom: 40, top: 20 }}
              innerRadius={0.8}
              padAngle={0.7}
              colors={e => colors[e.id]}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              radialLabelsSkipAngle={10}
              radialLabelsTextXOffset={6}
              radialLabelsTextColor="#333333"
              radialLabelsLinkOffset={0}
              radialLabelsLinkDiagonalLength={16}
              radialLabelsLinkHorizontalLength={24}
              radialLabelsLinkStrokeWidth={1}
              radialLabelsLinkColor={{ from: "color" }}
              slicesLabelsSkipAngle={10}
              slicesLabelsTextColor="#333333"
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              enableSlicesLabels={false}
              enableRadialLabels={false}
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  translateY: 32,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "#999",
                  symbolSize: 16,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000"
                      }
                    }
                  ]
                }
              ]}
            />
          </>
        )}
      </ChartSection>
    </Wrapper>
  );
};

export { DeathRateWidget };
