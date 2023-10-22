import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../../redux/hierarchySlice";
import data from "../../data/example-data.json";
import { Table, TableBody, Paper, TableRow } from "@mui/material";
import HeaderCell from "./HeaderCell";
import Row from "./Row";
import CollapsibleSection from "./CollapsibleSection";
import { CHARACTER_HEADERS, NEMESIS_HEADERS, SECRETE_HEADERS } from "./constants";

const PAPER_STYLES = { maxWidth: "90%", margin: "20px auto", overflowX: "auto" };
const TABLE_STYLES = { minWidth: 700 };

const HierarchyTable = () => {
  const { data: hierarchyData, selectedCharacterId, selectedNemesisId } = useSelector((state) => state.hierarchy);
  const dispatch = useDispatch();

  useEffect(() => {
    const uniqueData = data.filter((v, i, a) => a.findIndex((t) => t.data.ID === v.data.ID) === i);
    dispatch(setData(uniqueData));
  }, [dispatch]);

  const renderCharacterRows = (character, index) => (
    <React.Fragment key={character.data.ID}>
      <Row item={character} level={0} headers={CHARACTER_HEADERS} rowIndex={index} selectedCharacterId={selectedCharacterId} selectedNemesisId={selectedNemesisId} />
      {character.children && character.children.has_nemesis && <CollapsibleSection isOpen={selectedCharacterId === character.data.ID} data={character.children.has_nemesis.records} headers={NEMESIS_HEADERS} level={1} selectedCharacterId={selectedCharacterId} selectedNemesisId={selectedNemesisId} />}
      {character.children &&
        character.children.has_nemesis &&
        character.children.has_nemesis.records.map((nemesis) => {
          if (nemesis.data.ID === selectedNemesisId) {
            return (
              <CollapsibleSection
                key={nemesis.data.ID}
                isOpen={selectedNemesisId === nemesis.data.ID}
                data={nemesis.children && nemesis.children.has_secrete ? nemesis.children.has_secrete.records : []}
                headers={SECRETE_HEADERS}
                level={2}
                selectedCharacterId={selectedCharacterId}
                selectedNemesisId={selectedNemesisId}
              />
            );
          }
          return null;
        })}
    </React.Fragment>
  );

  return (
    <Paper elevation={3} sx={PAPER_STYLES}>
      <Table sx={TABLE_STYLES} stickyHeader aria-label="collapsible table">
        <TableRow>
          <HeaderCell />
          {CHARACTER_HEADERS.map((header, index) => (
            <HeaderCell key={index}>{header}</HeaderCell>
          ))}
          <HeaderCell>Actions</HeaderCell>
        </TableRow>
        <TableBody>{hierarchyData.map(renderCharacterRows)}</TableBody>
      </Table>
    </Paper>
  );
};

export default HierarchyTable;
