import { Asset, setActiveAssetType } from "../../redux/assetSlice";
import { useAppDispatch } from "../../redux/hooks";
import "./AssetBar.css";

export const AssetBar = () => {
  const dispatch = useAppDispatch();

  const handleClick = (assetType: Asset) => {
    dispatch(setActiveAssetType(assetType));
  };

  return (
    <div className="asset-bar">
      ASSET BAR
      <button onClick={() => handleClick(Asset.Buildings)}>BUILDINGS</button>
    </div>
  );
};
