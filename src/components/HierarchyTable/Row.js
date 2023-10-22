import React from "react";
import { useDispatch } from "react-redux";
import { IconButton, TableRow } from "@mui/material";
import { ExpandMore as ExpandMoreIcon, ChevronRight as ChevronRightIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { setSelectedCharacterId, setSelectedNemesisId, removeItem } from "../../redux/hierarchySlice";
import { CenteredTableCell } from "./styles";

const LEVEL_CHARACTER = 0;
const LEVEL_NEMESIS = 1;

const Row = ({ item, level, headers, selectedCharacterId, selectedNemesisId }) => {
  const dispatch = useDispatch();

  const isExpanded = () => {
    if (level === LEVEL_CHARACTER) return selectedCharacterId === item.data.ID;
    if (level === LEVEL_NEMESIS) return selectedNemesisId === item.data.ID;
    return false;
  };

  const handleExpandClick = () => {
    if (level === LEVEL_CHARACTER) {
      if (isExpanded()) {
        dispatch(setSelectedCharacterId(null));
        dispatch(setSelectedNemesisId(null));
      } else {
        dispatch(setSelectedCharacterId(item.data.ID));
      }
    } else if (level === LEVEL_NEMESIS) {
      dispatch(setSelectedNemesisId(isExpanded() ? null : item.data.ID));
    }
  };

  const hasChildren = Object.keys(item?.children || {}).length > 0;

  return (
    <TableRow>
      <CenteredTableCell>
        {hasChildren && (
          <IconButton size="small" onClick={handleExpandClick}>
            {isExpanded() ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </IconButton>
        )}
      </CenteredTableCell>
      {headers.map((header, index) => (
        <CenteredTableCell key={index}>{item.data[header]}</CenteredTableCell>
      ))}
      <CenteredTableCell>
        <IconButton onClick={() => dispatch(removeItem({ level, id: item.data.ID }))}>
          <DeleteIcon />
        </IconButton>
      </CenteredTableCell>
    </TableRow>
  );
};

export default Row;
