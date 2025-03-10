import { Outlet } from "react-router-dom";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";

export default function MainLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
