import { DATA_API_URL } from "./constants";

export const createBuilding = async () => {
  const response = await fetch(`${DATA_API_URL}/building`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "defaultName",
      description: "defaultDesc",
      imageSrc: "defaultImgSrc",
      cost: 1,
    }),
  })
    .then((response) => response.json())
    .then((createdBuilding) => createdBuilding)
    .catch((err) => console.error(err));
  return response.buildingData;
};

export const getAllBuildings = async () => {
  const response = await fetch(`${DATA_API_URL}/building`)
    .then((response) => response.json())
    .then((fetchedBuildings) => fetchedBuildings)
    .catch((err) => console.error(err));
  return response.buildingData;
};

export const updateBuilding = async (values: any) => {
  const response = await fetch(`${DATA_API_URL}/building/${values._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...values }),
  })
    .then((response) => response.json())
    .then((updatedBuilding) => updatedBuilding)
    .catch((err) => console.error(err));
  return response.buildingData;
};

export const deleteBuilding = async (id: string) => {
  const response = await fetch(`${DATA_API_URL}/building/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((deletedBuilding) => deletedBuilding)
    .catch((err) => console.error(err));
  return response.buildingData;
};
