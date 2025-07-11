import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      sx={{
        backgroundColor: colors.primary[400],
      }}
    >
      {/* Sidebar width offset */}
      <Box width="240px" />

      {/* Centered Search Bar */}
      <Box flexGrow={1} display="flex" justifyContent="flex-start" ml={2}>
        <Box
          display="flex"
          alignItems="center"
          backgroundColor={
            theme.palette.mode === "dark"
              ? colors.primary[600]
              : "#ffffff" // White background in light mode
          }
          borderRadius="3px"
          width="100%"
          maxWidth="400px"
          boxShadow={
            theme.palette.mode === "light" ? "0 0 4px rgba(0,0,0,0.1)" : "none"
          }
        >
          <InputBase
            sx={{
              ml: 2,
              flex: 1,
              color:
                theme.palette.mode === "dark"
                  ? colors.grey[100]
                  : "#000000", // ✅ Black text for light mode
            }}
            placeholder="Search"
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? colors.grey[100]
                    : colors.grey[800],
              }}
            />
          </IconButton>
        </Box>
      </Box>

      {/* Right Icons */}
      <Box display="flex" gap={1}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;

