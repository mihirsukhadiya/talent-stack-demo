import { createSlice } from "@reduxjs/toolkit";
import { UserStaticData } from "../data/userData";
const initialState = {
  allUserList: {
    error: {
      isError: false,
      message: "",
    },
    items: UserStaticData || [],
    loading: false,
  },
  singleUserList: {
    error: {
      isError: false,
      message: "",
    },
    items: {},
    loading: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAllUserListing: (state, action) => {
      state.allUserList.items = action.payload;
      state.allUserList.error = {
        isError: false,
        message: "",
      };
    },
    getSingleUserDetails: (state, action) => {
      if (action.payload) {
        const currentUser = state.allUserList.items.find(
          (item) => Number(item.id) === Number(action.payload)
        );
        state.singleUserList.items = currentUser;
        state.singleUserList.error = {
          isError: false,
          message: "",
        };
      }
    },
    AddNewSingleUser: (state, action) => {
      state.allUserList.items = [...state.allUserList.items, action.payload];
      state.allUserList.error = {
        isError: false,
        message: "",
      };
    },
    DeleteSingleUserById: (state, action) => {
      const index = state.allUserList.items.findIndex(
        (item) => Number(item.id) === Number(action.payload)
      );
      if (index !== -1) {
        const tempData = state.allUserList.items;
        tempData.splice(index, 1);
        state.allUserList.items = tempData;
      } else {
        console.log(`Record with ID ${action.payload} not found.`);
      }
      state.allUserList.error = {
        isError: false,
        message: "",
      };
    },
    EditSingleUserById: (state, action) => {
      if (action.payload?.id) {
        const index = state.allUserList.items.findIndex(
          (item) => Number(item.id) === Number(action.payload?.id)
        );
        if (index !== -1) {
          const tempData = state.allUserList.items;
          const updatedValues = { ...action.payload };
          delete updatedValues?.id;
          tempData[index] = { ...tempData[index], ...action.payload };
          state.allUserList.items = tempData;
        } else {
          console.log(`Record with ID ${action.payload} not found.`);
        }
        state.allUserList.error = {
          isError: false,
          message: "",
        };
      }
    },
  },
});

export default userSlice.reducer;

export const {
  setAllUserListing,
  setAllUserListingLoading,
  setAllUserListingError,
  getSingleUserDetails,
  setSingleUserListingLoading,
  setSingleUserListingError,
  AddNewSingleUser,
  DeleteSingleUserById,
  EditSingleUserById,
} = userSlice.actions;

export const userItemsSelector = (state) => state.user;
