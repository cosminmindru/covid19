import React from "react";
import get from "lodash/get";
import styled from "styled-components/macro";
import { useQuery } from "react-query";
import Widget from "../../design/components/Widget";
import Stat from "./components/Stat";
import SimpleMenu from "../SimpleMenu";
import StatSkeleton from "../StatSkeleton";
import getGlobalOverview from "../../libs/novelCovid/functions/get-global-overview";
import { Button, MenuItem } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const SWidgetContent = styled(Widget.Content)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  width: 100%;
  padding: 0 1rem;

  @media ${(props) => props.theme.breakpoints.tablet} {
    grid-template-columns: repeat(3, 1fr);
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

const TimePeriod = {
  ALL: {
    id: "all",
    title: "All time",
  },
  TODAY: {
    id: "today",
    title: "Today",
  },
};

const GlobalOverviewWidget = () => {
  const [timePeriod, setTimePeriod] = React.useState(TimePeriod.ALL);
  const { status, data } = useQuery("global-overview", getGlobalOverview);
  const cases = React.useMemo(() => {
    if (timePeriod.id === TimePeriod.ALL.id) return get(data, "data.cases");

    return get(data, "data.todayCases");
  }, [data, timePeriod]);
  const recovered = React.useMemo(() => {
    if (timePeriod.id === TimePeriod.ALL.id) return get(data, "data.recovered");

    return get(data, "data.todayRecovered");
  }, [data, timePeriod]);
  const deaths = React.useMemo(() => {
    if (timePeriod.id === TimePeriod.ALL.id) return get(data, "data.deaths");

    return get(data, "data.todayDeaths");
  }, [data, timePeriod]);

  const renderSimpleMenuChildren = ({ showMenu }) => (
    <Button endIcon={<KeyboardArrowDownIcon />} onClick={showMenu}>
      {timePeriod.title}
    </Button>
  );

  const renderSimpleMenuOption = (option, { hideMenu }) => (
    <MenuItem
      onClick={() => {
        setTimePeriod(option);
        hideMenu();
      }}
    >
      {option.title}
    </MenuItem>
  );

  return (
    <Widget>
      <Widget.Header>
        <Widget.HeaderTitle>Global case overview</Widget.HeaderTitle>
        <Widget.HeaderAction>
          <SimpleMenu
            options={Object.values(TimePeriod)}
            renderOption={renderSimpleMenuOption}
            renderChildren={renderSimpleMenuChildren}
          />
        </Widget.HeaderAction>
      </Widget.Header>
      <SWidgetContent>
        <StatWrapper>
          {status === "loading" ? (
            <StatSkeleton />
          ) : (
            <Stat title="Cases" value={cases} />
          )}
        </StatWrapper>
        <StatWrapper>
          {status === "loading" ? (
            <StatSkeleton />
          ) : (
            <Stat title="Recovered" value={recovered} />
          )}
        </StatWrapper>
        <StatWrapper>
          {status === "loading" ? (
            <StatSkeleton />
          ) : (
            <Stat title="Deaths" value={deaths} />
          )}
        </StatWrapper>
      </SWidgetContent>
    </Widget>
  );
};

export default GlobalOverviewWidget;
