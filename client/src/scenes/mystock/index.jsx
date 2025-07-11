/* import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export default Form;
 */
// client/src/pages/StockListPage.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  CircularProgress,
  Chip,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { fetchStockDetails } from "../../api/yahoofinance";

const symbols = ["AAPL", "MSFT", "GOOGL", "TCS.NS", "INFY.NS", "SBIN.NS"];

const StockListPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const loadStocks = async () => {
      setLoading(true);
      const results = await Promise.all(symbols.map(fetchStockDetails));
      setStocks(results.filter(Boolean));
      setLastUpdated(new Date().toLocaleTimeString());
      setLoading(false);
    };

    loadStocks();
    const interval = setInterval(loadStocks, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box m="20px">
      <Header title="STOCK LIST" subtitle="My Portfolio Holdings" />

      <Box mt="20px">
        <Card sx={{ backgroundColor: colors.primary[400], borderRadius: 2 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" fontWeight="600" color={colors.greenAccent[400]}>
                Live Stock Snapshot
              </Typography>
              {lastUpdated && (
                <Chip
                  label={`Last updated: ${lastUpdated}`}
                  sx={{ backgroundColor: colors.blueAccent[700], color: "white" }}
                />
              )}
            </Box>

            {loading ? (
              <CircularProgress sx={{ mt: 4, color: colors.greenAccent[400] }} />
            ) : (
              <Box component="table" width="100%" sx={{ fontSize: 14, borderCollapse: "collapse", mt: 2 }}>
                <thead>
                  <tr style={{ color: colors.grey[300], textAlign: "left" }}>
                    <th>Symbol</th>
                    <th>Price</th>
                    <th>Change%</th>
                    <th>Open</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Prev. Close</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map((stock) => {
                    const isPositive = (stock.regularMarketChange || 0) >= 0;
                    return (
                      <tr
                        key={stock.symbol}
                        style={{
                          borderBottom: `1px solid ${colors.primary[500]}`,
                          color: colors.grey[100],
                          height: "40px",
                        }}
                      >
                        <td>{stock.symbol.replace(".BSE", "")}</td>
                        <td>₹{stock.regularMarketPrice?.toFixed(2) || "-"}</td>
                        <td
                          style={{
                            color: isPositive ? colors.greenAccent[500] : colors.redAccent[500],
                          }}
                        >
                          {isPositive ? "+" : ""}
                          {stock.regularMarketChangePercent?.toFixed(2) || "0.00"}%
                        </td>
                        <td>₹{stock.regularMarketOpen?.toFixed(2) || "-"}</td>
                        <td>₹{stock.regularMarketDayHigh?.toFixed(2) || "-"}</td>
                        <td>₹{stock.regularMarketDayLow?.toFixed(2) || "-"}</td>
                        <td>₹{stock.regularMarketPreviousClose?.toFixed(2) || "-"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default StockListPage;