import {
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@mui/material';
import { TableHeader } from './infoTable.style';
import AddIcon from '@mui/icons-material/Add';
import { FullBodyLoader } from '../FullBodyLoader/FullBodyLoader';

interface IInfoTableData {
  headers: {
    label: string;
  }[];
  data: {
    id: string;
    [key: string]: string;
  }[];
}

interface IInfoTableProps {
  tableData: IInfoTableData;
  noDataMessage: string;
  onRowClick?: (e: React.MouseEvent, id: string) => void;
  title: string;
  showCreateButton?: boolean;
  onCreateClick?: (e: React.MouseEvent) => void;
  createButtonLabel?: string;
  isLoading?: boolean;
}

export function InfoTable({
  isLoading,
  noDataMessage,
  tableData,
  title,
  showCreateButton,
  onCreateClick,
  createButtonLabel,
  onRowClick,
}: IInfoTableProps) {
  if (isLoading) return <FullBodyLoader />;

  const getTableBody = () => {
    if (tableData.data.length === 0)
      return (
        <TableRow>
          <TableCell colSpan={3}>
            <Typography color="gray">{noDataMessage}</Typography>
          </TableCell>
        </TableRow>
      );
    return tableData.data.map(({ id, ...row }) => (
      <TableRow
        key={id}
        hover
        onClick={(e) => (onRowClick ? onRowClick(e, id) : null)}
      >
        {Object.keys(row).map((cellKey) => (
          <TableCell key={`${id}-${cellKey}`}>
            {row[cellKey] as string}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{ padding: 0 }}>
            <TableCell colSpan={4} style={{ padding: '0px' }}>
              <TableHeader>
                <Typography
                  variant="body1"
                  color="secondary"
                  sx={{ gridArea: 'text' }}
                >
                  <b>{title}</b>
                </Typography>
                {showCreateButton && (
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ gridArea: 'button' }}
                    startIcon={<AddIcon />}
                    onClick={onCreateClick}
                  >
                    {createButtonLabel}
                  </Button>
                )}
              </TableHeader>
            </TableCell>
          </TableRow>
          <TableRow>
            {tableData.headers.map((cat) => (
              <TableCell key={cat.label}>{cat.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{getTableBody()}</TableBody>
      </Table>
    </TableContainer>
  );
}
