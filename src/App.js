import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { round } from "lodash";

const emptyArray = Array.from(Array(12));
const flats = emptyArray.map((item, index) => index + 1);
let bills = [];

export default function App() {
  const [calculated, setCalculated] = React.useState(false);
  const [totalUnitsConsumed, setTotalUnitsConsumed] = React.useState(0);
  const [unitsConsumedByFlat, setUnitsConsumedByFlat] = React.useState([]);

  const onCalculate = () => {
    const totalWater = document.getElementById("water").value;
    // if(Boolean(totalWater)) return;

    let totalUnitsConsumed = 0;
    let unitsConsumedByFlat = [];

    flats.forEach((flat, index) => {
      const previous = document.getElementById("previous" + flat).value;
      const current = document.getElementById("current" + flat).value;

      const unitsConsumed = current - previous;

      totalUnitsConsumed += unitsConsumed;
      unitsConsumedByFlat[index] = unitsConsumed;
    });

    setTotalUnitsConsumed(totalUnitsConsumed);
    setUnitsConsumedByFlat(unitsConsumedByFlat);

    const rate = totalWater / totalUnitsConsumed;

    flats.forEach((flat, index) => {
      bills[index] = unitsConsumedByFlat[index] * rate;
    });

    setCalculated(true);
  };

  return (
    <Box>
      <Container maxWidth="sm">
        <Box py={2}>
          {/* <Typography variant="h4" align="center" gutterBottom>
            MF 7 Water
          </Typography> */}
          <Box textAlign="center" my={2}>
            <TextField
              id={`water`}
              label="Total Water Bill"
              variant="outlined"
            />
          </Box>
          <Box>
            {flats.map((number) => (
              <>
                <Typography
                  variant="body1"
                  gutterBottom
                >{`Flat ${number}`}</Typography>
                <Box
                  textAlign="center"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  <TextField
                    id={`previous${number}`}
                    label="Previous"
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    id={`current${number}`}
                    label="Current"
                    variant="outlined"
                    size="small"
                  />
                </Box>
              </>
            ))}
            <Box textAlign="center" mt={4} mb={2}>
              <Button variant="outlined" onClick={onCalculate}>
                Calculate
              </Button>
            </Box>
            {calculated && (
              <Box textAlign="center">
                <Typography variant="h4" gutterBottom>
                  {`Breakdown`}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {`Total Units Consumed ${totalUnitsConsumed}`}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {`Total Amount ${Math.ceil(
                    bills.reduce((sum, curr) => sum + curr, 0)
                  )}`}
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Typography variant="body1">{`Flat`}</Typography>
                  <Typography variant="body1">{`Units`}</Typography>
                  <Typography variant="body1">{`Amount(Rs.)`}</Typography>
                </Box>
                <hr />
                {bills.map((bill, index) => {
                  return (
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body1">{`${index > 8 ? "" : "0"}${
                        index + 1
                      }`}</Typography>
                      <Typography variant="body1">{`${unitsConsumedByFlat[index]}`}</Typography>
                      <Typography variant="body1">{`${Math.ceil(
                        bill
                      )}`}</Typography>
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
