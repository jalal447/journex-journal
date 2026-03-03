import { useNavigate } from "react-router-dom";
import TradeForm from "../components/trades/TradeForm";
import { useAppData } from "../hooks/useAppData";

export default function AddTradePage() {
  const { refreshTrades, refreshAnalytics } = useAppData();
  const navigate = useNavigate();

  const onCreated = async () => {
    await Promise.all([refreshTrades(), refreshAnalytics()]);
    navigate("/app/trades/history");
  };

  return <TradeForm onCreated={onCreated} />;
}

