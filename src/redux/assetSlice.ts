import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  createBuilding,
  deleteBuilding,
  getAllBuildings,
  updateBuilding,
} from "../clientLibrary/buildings";

export enum Asset {
  Buildings = "buildingAssets",
}

export interface BuildingAsset {
  [key: string]: string | number;
  _id: string;
}

export interface AssetGroups {
  buildingAssets: Array<BuildingAsset>;
}

export interface AssetState {
  assets: Record<Asset, Array<BuildingAsset>>;
  activeAssetType: Asset;
  activeAssetId: string | null;
  activeAsset: null | BuildingAsset;
}

const initialState: AssetState = {
  assets: {} as Record<Asset, Array<BuildingAsset>>,
  activeAssetType: Asset.Buildings,
  activeAssetId: null,
  activeAsset: null,
};

export const createNewBuilding = createAsyncThunk(
  "asset/createNewBuilding",
  async () => {
    try {
      const createdBuilding = await createBuilding();
      return createdBuilding._id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getBuildingAssets = createAsyncThunk(
  "asset/getBuildingAssets",
  async () => {
    try {
      const responseData = await getAllBuildings();
      return responseData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const updateBuildingAsset = createAsyncThunk(
  "data/updateBuilding",
  async (data: any, thunkApi) => {
    try {
      await updateBuilding(data);
      thunkApi.dispatch(getBuildingAssets());
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const deleteBuildingAsset = createAsyncThunk(
  "data/deleteBuilding",
  async (id: string, thunkAPI) => {
    try {
      await deleteBuilding(id);
      thunkAPI.dispatch(getBuildingAssets());
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    setActiveAssetType: (state, action: PayloadAction<Asset>) => {
      state.activeAssetType = action.payload;
    },
    setActiveAssetId: (state, action: PayloadAction<string | null>) => {
      state.activeAssetId = action.payload;
    },
    setActiveAssetById: (state, action: PayloadAction<string | null>) => {
      if (action.payload) {
        state.activeAsset =
          state.assets[state.activeAssetType].find(
            (val) => val._id === action.payload
          ) ?? null;
      }
    },
    nullifyActiveAsset: (state) => {
      state.activeAsset = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getBuildingAssets.fulfilled,
      (state, action: PayloadAction<Array<BuildingAsset>>) => {
        state.assets["buildingAssets"] = action.payload;
      }
    );
    builder.addCase(getBuildingAssets.rejected, (state) => {
      state.assets["buildingAssets"] = [];
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  setActiveAssetType,
  setActiveAssetById,
  setActiveAssetId,
  nullifyActiveAsset,
} = assetSlice.actions;

export default assetSlice.reducer;
