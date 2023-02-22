import { useEffect, useState } from "react";
import {
  BuildingAsset,
  deleteBuildingAsset,
  nullifyActiveAsset,
  setActiveAssetById,
  setActiveAssetId,
  updateBuildingAsset,
} from "../../redux/assetSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import "./Content.css";

export const Content = () => {
  const dispatch = useAppDispatch();
  const activeAsset = useAppSelector((state) => state.asset.activeAsset);
  const activeAssetId = useAppSelector((state) => state.asset.activeAssetId);
  const [formData, setFormData] = useState<BuildingAsset | null>(activeAsset);

  useEffect(() => {
    activeAsset && setFormData(activeAsset);
  }, [activeAsset]);

  useEffect(() => {
    activeAssetId && dispatch(setActiveAssetById(activeAssetId));
  }, [dispatch, activeAssetId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formData &&
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
    dispatch(setActiveAssetId(null));
    dispatch(nullifyActiveAsset());
  };

  return (
    <>
      {activeAsset && formData && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {Object.entries(formData).map(
              ([key, value]) =>
                key !== "_id" &&
                key !== "__v" && (
                  <div key={key} className="form-group">
                    <label htmlFor={key} className="form-label">
                      {key}:
                    </label>
                    <input
                      className="form-input"
                      type={typeof value === "number" ? "number" : "text"}
                      id={key}
                      name={key}
                      value={value}
                      onChange={handleChange}
                    />
                  </div>
                )
            )}
            <button className="form-button" type="submit">
              Save
            </button>
            <button
              className="form-button"
              onClick={() => handleDelete(formData._id)}
            >
              DELETE
            </button>
          </form>
        </div>
      )}
    </>
  );
};
