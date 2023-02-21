import { useEffect, useState } from "react";
import {
  BuildingAsset,
  deleteBuildingAsset,
  setActiveAssetById,
  updateBuildingAsset,
} from "../../redux/assetSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import "./Content.css";

export const Content = () => {
  const dispatch = useAppDispatch();
  const activeAsset = useAppSelector((state) => state.asset.activeAsset);
  const activeAssetId = useAppSelector((state) => state.asset.activeAssetId);
  const [formData, setFormData] = useState<BuildingAsset>(activeAsset);

  useEffect(() => {
    setFormData(activeAsset);
  }, [activeAsset]);

  useEffect(() => {
    activeAssetId && dispatch(setActiveAssetById(activeAssetId));
  }, [dispatch, activeAssetId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number"
          ? parseFloat(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateBuildingAsset(formData));
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteBuildingAsset(id));
  };

  return (
    <form onSubmit={handleSubmit}>
      {formData &&
        Object.entries(formData).map(
          ([key, value]) =>
            key !== "_id" &&
            key !== "__v" && (
              <div key={key}>
                <label htmlFor={key}>{key}:</label>
                <input
                  type={typeof value === "number" ? "number" : "text"}
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                />
              </div>
            )
        )}
      <button type="submit">Save</button>
      <button onClick={() => handleDelete(formData._id)}>DELETE</button>
    </form>
  );
};
