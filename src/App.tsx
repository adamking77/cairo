import React from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from "@/components/ui/toaster"
import CairoLandingPage from "./components/CairoLandingPage";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="cairo-ui-theme">
      <div className="App">
        <CairoLandingPage />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;