import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  selectedCharacterId: null,
  selectedNemesisId: null,
};

const LEVEL_CHARACTER = 0;
const LEVEL_NEMESIS = 1;
const LEVEL_SECRETE = 2;

const removeByLevel = {
  [LEVEL_CHARACTER]: (state, id) => {
    state.data = state.data.filter((character) => character.data.ID !== id);
  },
  [LEVEL_NEMESIS]: (state, id) => {
    state.data.forEach((character) => {
      if (character.children && character.children.has_nemesis) {
        character.children.has_nemesis.records = character.children.has_nemesis.records.filter((nemesis) => nemesis.data.ID !== id);
      }
    });
  },
  [LEVEL_SECRETE]: (state, id) => {
    state.data.forEach((character) => {
      if (character.children && character.children.has_nemesis) {
        character.children.has_nemesis.records.forEach((nemesis) => {
          if (nemesis.children && nemesis.children.has_secrete) {
            nemesis.children.has_secrete.records = nemesis.children.has_secrete.records.filter((secrete) => secrete.data.ID !== id);
          }
        });
      }
    });
  },
};

const hierarchySlice = createSlice({
  name: "hierarchy",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    removeItem: (state, action) => {
      const { level, id } = action.payload;
      removeByLevel[level] && removeByLevel[level](state, id);
    },
    setSelectedCharacterId: (state, action) => {
      state.selectedCharacterId = action.payload;
    },
    setSelectedNemesisId: (state, action) => {
      state.selectedNemesisId = action.payload;
    },
  },
});

export const { setData, removeItem, setSelectedCharacterId, setSelectedNemesisId } = hierarchySlice.actions;
export default hierarchySlice.reducer;
