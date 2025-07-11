import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import UserDashboard from "./scenes/UserDashboard";
import Market from "./scenes/marketstock";
import TradeBridge from "./scenes/tradebridge";
import Profile from "./scenes/Profile";
import Bar from "./scenes/bar";
import StockListPage from "./scenes/mystock";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import Insight from "./scenes/insights";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import Faq from "./pages/faq";
import Support from "./pages/support";
import News from "./pages/news";

import PublicHeader from "./components/PublicHeader";
import PublicFooter from "./components/PublicFooter";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  const publicRoutes = ["/", "/login", "/signup", "/faq", "/news", "/support"];
  const isPublic = publicRoutes.includes(location.pathname);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Public Routes Layout */}
        {isPublic ? (
          <div className="app">
            <PublicHeader />
            <main className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/news" element={<News />} />
                <Route path="/support" element={<Support />} />
              </Routes>
            </main>
            <PublicFooter />
          </div>
        ) : (
          // Protected Routes Layout
          <div className="protected-layout">
            <Topbar setIsSidebar={setIsSidebar} />
            <div className="protected-body">
              <Sidebar isSidebar={isSidebar} />
              <main className="main-content">
                <Routes>
                  <Route path="/UserDashboard" element={<UserDashboard />} />

                  <Route path="/marketstock" element={<Market />} />
                  <Route path="/tradebridge" element={<TradeBridge />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/mystock" element={<StockListPage />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/line" element={<Line />} />
                  <Route path="/insights" element={<Insight />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/geography" element={<Geography />} />
                </Routes>
              </main>
            </div>
          </div>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
