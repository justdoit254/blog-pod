import { Outlet } from "react-router";

function App() {
  return (
    <>
      <div className="py-8 bg-slate-100">
        <h1 className="text-3xl font-bold">BLOGPOD</h1>
        <Outlet />
      </div>
    </>
  );
}

export default App;
