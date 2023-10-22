import React from "react";
import { TableCell, Collapse, Box, Table, TableBody, TableRow } from "@mui/material";
import Row from "./Row";
import HeaderCell from "./HeaderCell";

const CollapsibleSection = ({ isOpen, data, headers, level, selectedCharacterId, selectedNemesisId }) => {
  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={headers.length + 2}>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box margin={1}>
            <Table size="small" aria-label="purchases">
              <TableRow>
                <HeaderCell />
                {headers.map((header, index) => (
                  <HeaderCell key={index}>{header}</HeaderCell>
                ))}
                <HeaderCell>Actions</HeaderCell>
              </TableRow>
              <TableBody>
                {data.map((item, index) => (
                  <Row key={item.data.ID} item={item} level={level} headers={headers} rowIndex={index} selectedCharacterId={selectedCharacterId} selectedNemesisId={selectedNemesisId} />
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default CollapsibleSection;
