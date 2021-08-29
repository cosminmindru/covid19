import React, { useState } from "react";
import styled from "styled-components/macro";
import { useQuery } from "react-query";
import calculateDeathRate from "../../utils/calculateDeathRate";
import calculateRecoveryRate from "../../utils/calculateRecoveryRate";
import Widget from "../../design/components/Widget";
import StatSkeleton from "../StatSkeleton";
import Stat from "./components/Stat";
import getGlobalCaseDistribution from "../../libs/novelCovid/functions/get-global-case-distribution";
import InfoIcon from "@material-ui/icons/Info";
import { Popover, Typography } from "@material-ui/core";

const SWidgetContent = styled(Widget.Content)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  width: 100%;
  padding: 0 1rem;

  @media ${(props) => props.theme.breakpoints.tablet} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    padding: 1.5rem 0;
  }
`;

const StatWrapper = styled.div`
  padding: 1rem 0;
  margin: 0;

  &:not(:last-child) {
    border-bottom: 1px solid
      ${(props) =>
        props.theme.colorMode === "dark"
          ? props.theme.colors.grey100
          : props.theme.colors.grey300};
  }

  @media ${(props) => props.theme.breakpoints.tablet} {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    padding: 0 1.5rem;

    &:not(:last-child) {
      border-right: 1px solid
        ${(props) =>
          props.theme.colorMode === "dark"
            ? props.theme.colors.grey100
            : props.theme.colors.grey300};
      border-bottom: 0;
    }
  }
`;

const InfoPopupWrapper = styled.div`
  max-width: 30rem;
  padding: 1rem;
  background-color: ${props => props.theme.colors.grey100}
`;

const GlobalCaseDistributonWidget = () => {
  const [recoveryRate, setRecoveryRate] = useState(0);
  const [deathRate, setDeathRate] = useState(0);
  const [oopoverAnchorEl, setPopoverAnchorEl] = React.useState(null);
  const infoPopoverOpen = Boolean(oopoverAnchorEl);
  const infoPopoverId = infoPopoverOpen ? "simple-popover" : undefined;

  const onInfoClick = (event) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const onPopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const { status } = useQuery(
    "global-case-distribution",
    getGlobalCaseDistribution,
    {
      onSuccess: (data) => {
        console.log(data);
        const computedRecoveryRate = calculateRecoveryRate({
          cases: data.data.cases,
          recovered: data.data.recovered,
          deaths: data.data.deaths,
        });
        const computedDeathRate = calculateDeathRate({
          cases: data.data.cases,
          deaths: data.data.deaths,
        });

        setRecoveryRate(computedRecoveryRate);
        setDeathRate(computedDeathRate);
      },
    }
  );

  return (
    <Widget>
      <Widget.Header>
        <Widget.HeaderTitle>Global death rate</Widget.HeaderTitle>
        <Widget.HeaderIcon clickable onClick={onInfoClick}>
          <InfoIcon />
        </Widget.HeaderIcon>
        <Popover
          id={infoPopoverId}
          open={infoPopoverOpen}
          anchorEl={oopoverAnchorEl}
          onClose={onPopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <InfoPopupWrapper>
            <Typography>
              This calculation is relative only! It does NOT take into account
              different age groups, comorbidities or any other factors besides
              the total reported numbers. Thus, it SHOULDN'T be used as an accurate
              death/recovery rate indicator.
            </Typography>
          </InfoPopupWrapper>
        </Popover>
      </Widget.Header>
      <SWidgetContent>
        <StatWrapper>
          {status === "loading" ? (
            <StatSkeleton />
          ) : (
            <Stat title="Recovery rate" value={recoveryRate || 0} />
          )}
        </StatWrapper>
        <StatWrapper>
          {status === "loading" ? (
            <StatSkeleton />
          ) : (
            <Stat title="Death rate" value={deathRate || 0} />
          )}
        </StatWrapper>
      </SWidgetContent>
    </Widget>
  );
};

export default GlobalCaseDistributonWidget;
