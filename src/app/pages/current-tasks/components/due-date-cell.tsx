// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
import styled from "styled-components";
import React from "react";

interface DataTableCellProps {
  overdue: boolean;
}
const StyledDataTableCell = styled.span<DataTableCellProps>`
  color: black;
  padding: 8px;
  display: inline-block;
  border-radius: ${(props) => (props.overdue ? "2px" : "0")};
  border: ${(props) =>
    props.overdue ? "2px solid red" : "none"}; 
`;

const DueDateCell: React.FC<DataTableCellProps> = ({ overdue, children }) => {
  return (
    <StyledDataTableCell overdue={overdue}>{children}</StyledDataTableCell>
  );
};

export default DueDateCell;
