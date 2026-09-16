import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import Accounts from "./pages/Accounts";
import Dashboard from "./pages/Dashboard";
import Scheduler from "./pages/Scheduler";
import AIComposer from "./pages/AIComposer";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<Layout></Layout>} >
                    <Route path="/dashboard" element={<Dashboard></Dashboard>}/>
                    <Route path="/accounts" element={<Accounts></Accounts>} />
                    <Route path="/schedule" element={<Scheduler></Scheduler>} />
                    <Route path="ai-composer" element={<AIComposer></AIComposer>} />
                </Route>
            </Routes>
        </>
    );
}
