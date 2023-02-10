import { useEffect } from "react";
import { createNewBuilding, setActiveAssetById } from "../../redux/assetSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import "./Sidebar.css";

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const activeAssetType = useAppSelector(
    (state) => state.asset.activeAssetType
  );
  const assets = useAppSelector((state) => state.asset.assets[activeAssetType]);

  useEffect(() => {
    if (assets && assets.length > 0)
      dispatch(setActiveAssetById(assets[0]._id));
  }, [dispatch, assets]);

  const handleCreateNewAsset = () => {
    dispatch(createNewBuilding());
  };

  return (
    <div className="sidebar">
      <ul>
        {assets?.map((asset) => (
          <li
            key={asset._id}
            onClick={() => dispatch(setActiveAssetById(asset._id))}
          >
            {asset.name}
          </li>
        ))}
      </ul>
      <button onClick={handleCreateNewAsset}>
        NEW {activeAssetType.replace("Assets", "")}
      </button>
    </div>
  );
};
