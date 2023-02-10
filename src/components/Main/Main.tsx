import { useEffect } from "react";
import { getBuildingAssets } from "../../redux/assetSlice";
import { useAppDispatch } from "../../redux/hooks";
import { AssetBar } from "../AssetBar/AssetBar";
import { Content } from "../Content/Content";
import { Sidebar } from "../Sidebar/Sidebar";

export const Main = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getBuildingAssets());
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <AssetBar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Content />
      </div>
    </div>
  );
};
