import { RouterApp } from "./router";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <RouterApp />
    </AuthProvider>
  );
}

export default App;
