import { useForm } from "react-hook-form";

import { Form, FormDescription } from "@/components/ui/form";
import SearchBar from "@/components/ui/custom/SearchBar";
import CheckBoxFilter from "@/components/ui/custom/CheckBoxFilter";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import stockData from "./api/stockData";

interface StockFromValues {
  items: string[];
}

interface StockRecord {
  "No.": number;
  "Item": string;
  "Description": string;
  "Quantity": number;
  "Unit Price (Rs.)": number;
  "Discount (Rs.)": number;
  "Net Amount (Rs.)": number;
}

const items = [
  {
    id: "lorry",
    label: "Lorry",
  },
  {
    id: "warehouse",
    label: "Warehouse",
  },
] as const;

const tableColumns = ["No.",	"Item",	"Descritpion",	"Quantity",	"Unit price (Rs.)",	"Discount (Rs.)",	"Net amount (Rs.)"];

const tableRecords: StockRecord[] = stockData;

const updatedDate = "08/06/2025";

export default function StockFeature() {
  const form = useForm<StockFromValues>({
    defaultValues: {
      items: ["lorry", "warehouse"],
    },
  });

  const onFilterChange = () => {}
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFilterChange)} className="space-y-8">
        <div>
          <div className="flex flex-row mb-4">
            <SearchBar />
          </div>
          <div className="flex flex-row justify-between mb-8">
            <CheckBoxFilter
              control={form.control}
              name="items"
              items={items}
              description="Display items in:"
            />
            <FormDescription className='select-none'><span>Last updated date: {updatedDate}</span></FormDescription>
          </div>
          {/* ------------------------------------------ */}
          <Table>
            <TableHeader>
              <TableRow>
                {tableColumns.length > 0 
                  ? tableColumns.map((column, index) => (<TableHead key={index}>{column}</TableHead>))
                  : []}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableRecords.length > 0 
                ? tableRecords.map((record, index) => (
                  <TableRow key={index}>
                    {Object.keys(record).length 
                    ? Object.keys(record).map((key, cellIndex) => (<TableCell key={cellIndex}>{(record as any)[key]}</TableCell>))
                    : []}
                  </TableRow>
                ))
                : 
                  <TableRow>
                    <TableCell colSpan={tableColumns.length}>No records found.</TableCell>
                  </TableRow>
                }
            </TableBody>
          </Table>
        </div>
      </form>
    </Form>
  );
}
