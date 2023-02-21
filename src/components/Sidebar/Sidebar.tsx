import { useEffect } from "react";
import {
  createNewBuilding,
  getBuildingAssets,
  setActiveAssetId,
} from "../../redux/assetSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import "./Sidebar.css";

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const activeAssetType = useAppSelector(
    (state) => state.asset.activeAssetType
  );
  const assets = useAppSelector((state) => state.asset.assets[activeAssetType]);
  const activeAssetId = useAppSelector((state) => state.asset.activeAssetId);

  useEffect(() => {
    if (assets && assets.length > 0) {
      dispatch(setActiveAssetId(assets[assets.length - 1]._id));
    }
  }, [dispatch, assets]);

  useEffect(() => {});

  const handleCreateNewAsset = async () => {
    const createdId = await dispatch(createNewBuilding()).unwrap();
    await dispatch(getBuildingAssets());
    dispatch(setActiveAssetId(createdId));
  };

  const handleAssetClick = (id: string) => {
    dispatch(setActiveAssetId(id));
  };

  return (
    <div className="sidebar">
      <ul>
        {assets?.map((asset) => (
          <li
            key={asset._id}
            onClick={() => handleAssetClick(asset._id)}
            style={{
              outline: asset._id === activeAssetId ? "solid red 2px" : "",
            }}
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
