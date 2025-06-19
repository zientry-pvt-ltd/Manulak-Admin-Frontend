import { useForm } from "react-hook-form";

import { Form, FormDescription } from "@/components/ui/form";
import SearchBar from "@/components/ui/custom/SearchBar";
import CheckBoxFilter from "@/components/ui/custom/CheckBoxFilter";
import stockData from "./api/stockData";
import DynamicTable from "@/components/ui/custom/DynamicTable";

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
          <DynamicTable columns={tableColumns} records={tableRecords} />
        </div>
      </form>
    </Form>
  );
}
