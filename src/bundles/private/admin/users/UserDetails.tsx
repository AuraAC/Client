import React from 'react';
import styled from 'styled-components';
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";

const Row = styled.div`
  display: flex;
`;

const TableWrap = styled.div`
	height: 100%;
	overflow-y: auto;
`;

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	
	td {
    vertical-align: top; /* Вертикальное выравнивание в ячейках */
    padding: 5px; /* Поля вокруг ячеек */
    border: 1px solid #000;
   }
`;

interface ControlProps {
	item: any;
	onClose: () => void;
}

export const UserDetails: React.FC<ControlProps> = (props) => {
	return (
		<>
			<Row style={{marginBottom: '24px'}}>
				<Typography variant={"h3"}>
					User info
				</Typography>
			</Row>

			<TableWrap>
				<Table cellSpacing="0" cellPadding="0">
					<tbody>
					{Object.keys(props.item).map(key => {
							if (key.charAt(0) !== '_') {
								return (
									<tr key={key}>
										<td>{key}</td>
										{/*<td>{formatValue(props.item[key])}</td>*/}
										<td>{props.item[key]}</td>
									</tr>
								);
							} else {
								return null;
							}
						}
					)}
					</tbody>
				</Table>
			</TableWrap>

			<Row style={{marginTop: '24px', justifyContent: 'flex-end'}}>
				<Button
					style={{minWidth: '200px'}}
					variant="outlined"
					color="primary"
					size={"large"}
					onClick={() => props.onClose()}
				>
					back
				</Button>
			</Row>
		</>
	);

};
