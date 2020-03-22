import React from "react";
import styled from "styled-components/macro";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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

const TableSection = styled(Section)`
  display: flex;
`;

const StyledTableContainer = styled(TableContainer)`
  max-height: 18rem;
`;

const CountriesTableWidget = () => {
  // const overviewQuery = useQuery("detailedCountries", getDetailedCountries, {
  //   onSuccess: data => {
  //     console.log(data);
  //   },
  //   onError: error => console.error(error)
  // });

  const rows = [
    {
      confirmed: 123,
      recovered: 123,
      deaths: 123,
      lastUpdated: "yesterday"
    },
    {
      confirmed: 123,
      recovered: 123,
      deaths: 123,
      lastUpdated: "yesterday"
    },
    {
      confirmed: 123,
      recovered: 123,
      deaths: 123,
      lastUpdated: "yesterday"
    },
    {
      confirmed: 123,
      recovered: 123,
      deaths: 123,
      lastUpdated: "yesterday"
    },
    {
      confirmed: 123,
      recovered: 123,
      deaths: 123,
      lastUpdated: "yesterday"
    },
    {
      confirmed: 123,
      recovered: 123,
      deaths: 123,
      lastUpdated: "yesterday"
    },
    {
      confirmed: 123,
      recovered: 123,
      deaths: 123,
      lastUpdated: "yesterday"
    },
    {
      confirmed: 123,
      recovered: 123,
      deaths: 123,
      lastUpdated: "yesterday"
    }
  ];

  return (
    <Wrapper>
      <HeaderSection gridColumn="1 / last-line" gridRow="1 / 2">
        <Typography variant="h6">Stats by country</Typography>
      </HeaderSection>
      <TableSection gridColumn="1 / last-line" gridRow="2 / 2" noPadding>
        <StyledTableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Confirmed</TableCell>
                <TableCell>Recovered</TableCell>
                <TableCell>Deaths</TableCell>
                <TableCell align="right">Last updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.confirmed}</TableCell>
                  <TableCell>{row.recovered}</TableCell>
                  <TableCell>{row.deaths}</TableCell>
                  <TableCell align="right">{row.lastUpdated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </TableSection>
    </Wrapper>
  );
};

export { CountriesTableWidget };
