import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface DynamicTableProps {
    columns: string[];
    records: any[];
}

const DynamicTable = ({columns, records}: DynamicTableProps) => {
    return (
        <Table>
            <TableHeader>
              <TableRow>
                {columns.length > 0 
                  ? columns.map((column, index) => (<TableHead key={index}>{column}</TableHead>))
                  : []}
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.length > 0 
                ? records.map((record, index) => (
                  <TableRow key={index}>
                    {Object.keys(record).length 
                    ? Object.keys(record).map((key, cellIndex) => (<TableCell key={cellIndex}>{(record as any)[key]}</TableCell>))
                    : []}
                  </TableRow>
                ))
                : 
                  <TableRow>
                    <TableCell colSpan={columns.length}>No records found.</TableCell>
                  </TableRow>
                }
            </TableBody>
          </Table>
    );
}

export default DynamicTable;