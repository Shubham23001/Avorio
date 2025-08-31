import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import PageMeta from "../../components/common/PageMeta";
import RevenueGraph from "../../components/ecommerce/RevenueGraph";
import TopOrders from "../../components/ecommerce/TopOrders";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Avorio - Beauty That lives with you"
        description="Avorio - admin dashboard"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Metrics + Revenue Graph + Monthly Sales together */}
        <div className="col-span-12 space-y-4 xl:col-span-7">
          <EcommerceMetrics />
          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5 ">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
              <RecentOrders />
        </div>

        <div className="col-span-12 xl:col-span-12">
           <RevenueGraph />
        </div>

        <div className="col-span-12 xl:col-span-12">    
          <TopOrders/>
          </div>
      </div>
    </>
  );
}
